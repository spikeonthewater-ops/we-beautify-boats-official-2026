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
    .then((data) => data.items?.[0]);

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

export async function createCalendarEvent(params: {
  summary: string;
  description: string;
  location?: string;
  startDateTime: string;
  endDateTime: string;
  attendeeEmail?: string;
  googleMeet?: boolean;
}) {
  const calendar = await getCalendarClient();

  const event: any = {
    summary: params.summary,
    description: params.description,
    location: params.location,
    colorId: "7", // Peacock — teal/cyan matches We Beautify Boats brand
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
    calendarId: "primary",
    requestBody: event,
    conferenceDataVersion: params.googleMeet ? 1 : 0,
    sendUpdates: params.attendeeEmail ? "all" : "none",
  });

  return response.data;
}

export async function getUpcomingCourses(hoursAhead = 48) {
  const calendar = await getCalendarClient();

  const now = new Date();
  const cutoff = new Date(now.getTime() + hoursAhead * 60 * 60 * 1000);

  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: now.toISOString(),
    timeMax: cutoff.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = response.data.items ?? [];

  return events
    .filter((e) => e.summary?.includes("📚") || e.summary?.toLowerCase().includes("course"))
    .map((e) => {
      const summary = e.summary ?? "";
      const courseMatch = summary.match(/Course\s+(\d+):\s+([^—\-]+)/i);
      const courseNumber = courseMatch?.[1] ?? null;
      const courseTitle = courseMatch?.[2]?.trim() ?? summary.replace(/^📚\s*/, "").trim();
      const seriesNumber = courseNumber
        ? `${courseNumber[0]}00`
        : null;
      const isOnline = !!(e.conferenceData?.entryPoints?.length);
      const meetLink = e.conferenceData?.entryPoints?.find(
        (ep: any) => ep.entryPointType === "video"
      )?.uri ?? null;

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

export async function checkAvailability(
  startDateTime: string,
  endDateTime: string
): Promise<{ available: boolean; conflicts: number }> {
  const calendar = await getCalendarClient();

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: startDateTime,
      timeMax: endDateTime,
      timeZone: "America/Toronto",
      items: [{ id: "primary" }],
    },
  });

  const busy = response.data.calendars?.["primary"]?.busy ?? [];
  return { available: busy.length === 0, conflicts: busy.length };
}
