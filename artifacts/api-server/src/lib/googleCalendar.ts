import { google } from "googleapis";

let connectionSettings: any;

async function getAccessToken() {
  if (
    connectionSettings &&
    connectionSettings.settings.expires_at &&
    new Date(connectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken) {
    throw new Error("X-Replit-Token not found for repl/depl");
  }

  // Pinned to the business account connection (webeautifyboats.toronto@gmail.com)
  // Connection ID: conn_google-calendar_01KMH64BN6VSBJQWXDWJMS30E8
  connectionSettings = await fetch(
    "https://" +
      hostname +
      "/api/v2/connection?include_secrets=true&connector_names=google-calendar",
    {
      headers: {
        Accept: "application/json",
        "X-Replit-Token": xReplitToken,
      },
    },
  )
    .then((res) => res.json())
    .then((data) => {
      const items: any[] = data.items ?? [];
      // Prefer the pinned business-account connection
      return (
        items.find((c: any) => c.id === "conn_google-calendar_01KMH64BN6VSBJQWXDWJMS30E8") ??
        items[0]
      );
    });

  const accessToken =
    connectionSettings?.settings?.access_token ||
    connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error("Google Calendar not connected");
  }
  return accessToken;
}

export async function getCalendarClient() {
  const accessToken = await getAccessToken();
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.calendar({ version: "v3", auth: oauth2Client });
}

// ─── Dedicated WBB Calendars ─────────────────────────────────────────────────

export const WBB_CALENDAR_NAMES = {
  assessments:     "WBB — Assessments",
  courses:         "WBB — Courses",
  workshops:       "WBB — Workshops",
  serviceDelivery: "WBB — Service Delivery",
} as const;

export type CalendarKey = keyof typeof WBB_CALENDAR_NAMES;

const calendarIdCache: Partial<Record<CalendarKey, string>> = {};

/**
 * Returns the Google Calendar ID for a WBB calendar,
 * creating it first if it doesn't already exist.
 */
export async function getOrCreateCalendar(key: CalendarKey): Promise<string> {
  if (calendarIdCache[key]) return calendarIdCache[key]!;

  const name = WBB_CALENDAR_NAMES[key];
  const calendar = await getCalendarClient();

  const listRes = await calendar.calendarList.list({ maxResults: 250 });
  const existing = listRes.data.items?.find((c) => c.summary === name);

  if (existing?.id) {
    calendarIdCache[key] = existing.id;
    return existing.id;
  }

  const createRes = await calendar.calendars.insert({
    requestBody: { summary: name, timeZone: "America/Toronto" },
  });

  const newId = createRes.data.id!;
  calendarIdCache[key] = newId;
  return newId;
}

// ─── Create Event ─────────────────────────────────────────────────────────────

export async function createCalendarEvent(params: {
  summary: string;
  description: string;
  location?: string;
  startDateTime: string;
  endDateTime: string;
  attendeeEmail?: string;
  googleMeet?: boolean;
  calendarKey?: CalendarKey;
}) {
  const calendar = await getCalendarClient();

  const calendarId = params.calendarKey
    ? await getOrCreateCalendar(params.calendarKey)
    : "primary";

  const event: any = {
    summary: params.summary,
    description: params.description,
    location: params.location,
    colorId: "7", // Peacock — teal/cyan
    start: { dateTime: params.startDateTime, timeZone: "America/Toronto" },
    end: { dateTime: params.endDateTime, timeZone: "America/Toronto" },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 60 },
      ],
    },
  };

  if (params.googleMeet) {
    event.conferenceData = {
      createRequest: {
        requestId: `wbb-${Date.now()}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    };
  }

  if (params.attendeeEmail) {
    event.attendees = [{ email: params.attendeeEmail }];
  }

  const response = await calendar.events.insert({
    calendarId,
    requestBody: event,
    conferenceDataVersion: params.googleMeet ? 1 : 0,
    sendUpdates: params.attendeeEmail ? "all" : "none",
  });

  return response.data;
}

// ─── Upcoming Courses ─────────────────────────────────────────────────────────

export async function getUpcomingCourses(hoursAhead = 48) {
  const calendar = await getCalendarClient();

  const now = new Date();
  const cutoff = new Date(now.getTime() + hoursAhead * 60 * 60 * 1000);

  const calendarIds: string[] = [];
  for (const key of ["courses", "workshops"] as CalendarKey[]) {
    try {
      calendarIds.push(await getOrCreateCalendar(key));
    } catch {}
  }
  if (calendarIds.length === 0) calendarIds.push("primary");

  const allEvents: any[] = [];
  for (const calId of calendarIds) {
    try {
      const res = await calendar.events.list({
        calendarId: calId,
        timeMin: now.toISOString(),
        timeMax: cutoff.toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      });
      allEvents.push(...(res.data.items ?? []));
    } catch {}
  }

  return allEvents.map((e) => {
    const summary = e.summary ?? "";
    const courseMatch = summary.match(/Course\s+(\d+):\s+([^—\-]+)/i);
    const courseNumber = courseMatch?.[1] ?? null;
    const courseTitle = courseMatch?.[2]?.trim() ?? summary.replace(/^📚\s*/, "").trim();
    const seriesNumber = courseNumber ? `${courseNumber[0]}00` : null;
    const isOnline = !!(e.conferenceData?.entryPoints?.length);
    const meetLink =
      e.conferenceData?.entryPoints?.find((ep: any) => ep.entryPointType === "video")?.uri ?? null;

    return {
      eventId: e.id,
      summary,
      courseNumber,
      courseTitle,
      seriesNumber,
      isOnline,
      meetLink,
      startDateTime: e.start?.dateTime ?? e.start?.date,
      endDateTime: e.end?.dateTime ?? e.end?.date,
      location: e.location ?? null,
    };
  });
}

// ─── Availability Check ───────────────────────────────────────────────────────

export async function checkAvailability(
  startDateTime: string,
  endDateTime: string
): Promise<{ available: boolean; conflicts: number }> {
  const calendar = await getCalendarClient();

  const items: { id: string }[] = [{ id: "primary" }];
  for (const key of Object.keys(WBB_CALENDAR_NAMES) as CalendarKey[]) {
    try {
      const id = await getOrCreateCalendar(key);
      items.push({ id });
    } catch {}
  }

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: startDateTime,
      timeMax: endDateTime,
      timeZone: "America/Toronto",
      items,
    },
  });

  const cals = response.data.calendars ?? {};
  const totalBusy = Object.values(cals).reduce(
    (sum, cal) => sum + (cal.busy?.length ?? 0),
    0
  );

  return { available: totalBusy === 0, conflicts: totalBusy };
}
