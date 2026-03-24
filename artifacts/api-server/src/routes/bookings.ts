import { Router, type IRouter } from "express";
import { createCalendarEvent, checkAvailability } from "../lib/googleCalendar.js";
import { sendMail } from "../lib/mailer.js";

const router: IRouter = Router();

// ─── Workshop Booking ───────────────────────────────────────────────────────

router.post("/bookings/workshop", async (req, res) => {
  try {
    const {
      venue,
      event_date,
      event_time,
      contact_person,
      email,
      phone,
      attendance,
      workshop,
    } = req.body as Record<string, string>;

    if (!venue || !event_date || !event_time || !contact_person) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const startDateTime = new Date(`${event_date}T${event_time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 3 * 60 * 60 * 1000);

    const description = [
      `Workshop: ${workshop}`,
      `Venue: ${venue}`,
      `Contact: ${contact_person}`,
      phone ? `Phone: ${phone}` : null,
      email ? `Email: ${email}` : null,
      attendance ? `Expected Attendance: ${attendance}` : null,
      "",
      "⚠️ Recording Disclaimer acknowledged by registrant.",
      "Payment: $250 CAD via Stripe / PayPal",
    ]
      .filter(Boolean)
      .join("\n");

    const [event] = await Promise.allSettled([
      createCalendarEvent({
        summary: `🎓 Workshop Booking — ${workshop} @ ${venue}`,
        description,
        location: venue,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        attendeeEmail: email || undefined,
      }),
      sendMail({
        subject: `🎓 New Workshop Booking — ${workshop}`,
        replyTo: email || undefined,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a2942">
            <div style="background:#1a2942;padding:24px 32px;border-radius:12px 12px 0 0">
              <h1 style="color:#fff;margin:0;font-size:22px">New Workshop Booking</h1>
              <p style="color:#67e8f9;margin:4px 0 0;font-size:13px;text-transform:uppercase;letter-spacing:1px">${workshop}</p>
            </div>
            <div style="background:#f8fafc;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:140px">Contact</td><td style="padding:8px 0;font-weight:600">${contact_person}</td></tr>
                ${email ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px">Email</td><td style="padding:8px 0">${email}</td></tr>` : ""}
                ${phone ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px">Phone</td><td style="padding:8px 0">${phone}</td></tr>` : ""}
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Venue</td><td style="padding:8px 0">${venue}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Date</td><td style="padding:8px 0">${event_date} at ${event_time}</td></tr>
                ${attendance ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px">Attendance</td><td style="padding:8px 0">${attendance}</td></tr>` : ""}
              </table>
              <div style="margin-top:20px;padding:16px;background:#fffbeb;border-radius:8px;border:1px solid #fde68a">
                <p style="margin:0;font-size:13px;color:#92400e">⚠️ Recording disclaimer acknowledged. Payment of $250 CAD due via Stripe or PayPal.</p>
              </div>
            </div>
          </div>
        `,
      }),
    ]);

    const eventId = event.status === "fulfilled" ? event.value.id : null;
    res.json({ success: true, eventId });
  } catch (err: any) {
    console.error("Workshop booking error:", err);
    res.status(500).json({ error: err?.message ?? "Failed to process booking" });
  }
});

// ─── Assessment Booking ─────────────────────────────────────────────────────

router.post("/bookings/assessment", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      boatName,
      boatModel,
      loaFeet,
      address,
      slipId,
      preferredDate,
      cart,
    } = req.body as any;

    if (!firstName || !lastName || !phone || !boatName || !address || !slipId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    let startDateTime: Date;
    if (preferredDate) {
      startDateTime = new Date(`${preferredDate}T10:00:00`);
    } else {
      startDateTime = new Date();
      startDateTime.setDate(startDateTime.getDate() + 7);
      startDateTime.setHours(10, 0, 0, 0);
    }
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

    const serviceLines: string[] = Array.isArray(cart)
      ? cart.map((i: any) => `  • ${i.level} – ${i.name}: $${i.price.toLocaleString()} CAD`)
      : [];

    const totalEstimate = Array.isArray(cart)
      ? cart.reduce((sum: number, i: any) => sum + i.price, 0)
      : 0;

    const description = [
      `Client: ${firstName} ${lastName}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      "",
      `Vessel: ${boatName}${boatModel ? ` (${boatModel})` : ""}`,
      `LOA: ${loaFeet} ft`,
      `Location: ${address}`,
      `Slip / Berth: ${slipId}`,
      serviceLines.length > 0 ? "" : null,
      serviceLines.length > 0 ? "Requested Services:" : null,
      ...serviceLines,
      "",
      "Assessment Fee: $250 CAD (credited to service) — Payment: Stripe / PayPal",
      preferredDate ? "" : "⚠️ No preferred date provided — date to be confirmed.",
    ]
      .filter((l) => l !== null)
      .join("\n");

    const serviceRowsHtml = Array.isArray(cart)
      ? cart.map((i: any) => `
          <tr>
            <td style="padding:6px 0;font-size:13px">${i.level} – ${i.name}</td>
            <td style="padding:6px 0;font-size:13px;text-align:right;color:#0891b2;font-weight:600">$${i.price.toLocaleString()}</td>
          </tr>`).join("")
      : "";

    await Promise.allSettled([
      createCalendarEvent({
        summary: `⚓ Assessment — ${firstName} ${lastName} · ${boatName} @ ${address}`,
        description,
        location: address,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        attendeeEmail: email || undefined,
      }),
      sendMail({
        subject: `⚓ New Assessment Booking — ${firstName} ${lastName} · ${boatName}`,
        replyTo: email || undefined,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a2942">
            <div style="background:#1a2942;padding:24px 32px;border-radius:12px 12px 0 0">
              <h1 style="color:#fff;margin:0;font-size:22px">New Assessment Booking</h1>
              <p style="color:#67e8f9;margin:4px 0 0;font-size:13px;text-transform:uppercase;letter-spacing:1px">${boatName}${boatModel ? ` · ${boatModel}` : ""}</p>
            </div>
            <div style="background:#f8fafc;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0">
              <p style="margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:1px">Client</p>
              <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
                <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:140px">Name</td><td style="padding:6px 0;font-weight:600">${firstName} ${lastName}</td></tr>
                <tr><td style="padding:6px 0;color:#64748b;font-size:13px">Phone</td><td style="padding:6px 0">${phone}</td></tr>
                ${email ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px">Email</td><td style="padding:6px 0">${email}</td></tr>` : ""}
              </table>
              <p style="margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:1px">Vessel</p>
              <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
                <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:140px">Boat</td><td style="padding:6px 0;font-weight:600">${boatName}${boatModel ? ` (${boatModel})` : ""}</td></tr>
                <tr><td style="padding:6px 0;color:#64748b;font-size:13px">LOA</td><td style="padding:6px 0">${loaFeet} ft</td></tr>
                <tr><td style="padding:6px 0;color:#64748b;font-size:13px">Location</td><td style="padding:6px 0">${address}</td></tr>
                <tr><td style="padding:6px 0;color:#64748b;font-size:13px">Slip / Berth</td><td style="padding:6px 0">${slipId}</td></tr>
                ${preferredDate ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px">Preferred Date</td><td style="padding:6px 0;color:#0891b2;font-weight:600">${preferredDate}</td></tr>` : ""}
              </table>
              ${serviceRowsHtml ? `
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:1px">Services Requested</p>
              <table style="width:100%;border-collapse:collapse;margin-bottom:8px">
                ${serviceRowsHtml}
                <tr style="border-top:2px solid #e2e8f0">
                  <td style="padding:10px 0 0;font-weight:700">Total Estimate</td>
                  <td style="padding:10px 0 0;text-align:right;font-weight:700;font-size:15px">$${totalEstimate.toLocaleString()} CAD</td>
                </tr>
              </table>` : ""}
              <div style="margin-top:20px;padding:16px;background:#fffbeb;border-radius:8px;border:1px solid #fde68a">
                <p style="margin:0;font-size:13px;color:#92400e">💰 Assessment Fee: <strong>$250 CAD</strong> — credited to service upon booking. Payment via Stripe or PayPal.</p>
              </div>
            </div>
          </div>
        `,
      }),
    ]);

    res.json({ success: true });
  } catch (err: any) {
    console.error("Assessment booking error:", err);
    res.status(500).json({ error: err?.message ?? "Failed to process booking" });
  }
});

// ─── Referral ───────────────────────────────────────────────────────────────

router.post("/bookings/referral", async (req, res) => {
  try {
    const {
      referrerName, referrerEmail, referrerPhone,
      friendName, friendEmail, boatName, clubMarina, friendPhone,
      services, notes,
    } = req.body as any;

    if (!referrerName || !referrerEmail || !referrerPhone || !friendName || !boatName || !clubMarina || !friendPhone) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const serviceList = Array.isArray(services) && services.length > 0
      ? services.join(", ")
      : "Not specified";

    await sendMail({
      subject: `🤝 New Referral — ${friendName} · ${boatName}`,
      replyTo: referrerEmail,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a2942">
          <div style="background:#1a2942;padding:24px 32px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;margin:0;font-size:22px">New Referral</h1>
            <p style="color:#67e8f9;margin:4px 0 0;font-size:13px;text-transform:uppercase;letter-spacing:1px">Referred by ${referrerName}</p>
          </div>
          <div style="background:#f8fafc;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0">
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:1px">Referred By</p>
            <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
              <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:140px">Name</td><td style="padding:6px 0;font-weight:600">${referrerName}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:13px">Email</td><td style="padding:6px 0">${referrerEmail}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:13px">Phone</td><td style="padding:6px 0">${referrerPhone}</td></tr>
            </table>
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:1px">Their Friend</p>
            <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
              <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:140px">Name</td><td style="padding:6px 0;font-weight:600">${friendName}</td></tr>
              ${friendEmail ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px">Email</td><td style="padding:6px 0">${friendEmail}</td></tr>` : ""}
              <tr><td style="padding:6px 0;color:#64748b;font-size:13px">Phone</td><td style="padding:6px 0">${friendPhone}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:13px">Boat</td><td style="padding:6px 0">${boatName}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;font-size:13px">Club / Marina</td><td style="padding:6px 0">${clubMarina}</td></tr>
            </table>
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:1px">Services of Interest</p>
            <p style="margin:0 0 20px;font-size:14px">${serviceList}</p>
            ${notes ? `<p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:1px">Notes</p><p style="margin:0;font-size:14px;font-style:italic">${notes}</p>` : ""}
          </div>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err: any) {
    console.error("Referral email error:", err);
    res.status(500).json({ error: err?.message ?? "Failed to send referral" });
  }
});

// ─── Course Module Booking ──────────────────────────────────────────────────

router.post("/bookings/course", async (req, res) => {
  try {
    const {
      seriesNumber,
      courseNumber,
      courseTitle,
      sessionType, // "online" | "inperson"
      date,
      time,
      firstName,
      lastName,
      email,
      phone,
      location,
    } = req.body as Record<string, string>;

    if (!seriesNumber || !courseNumber || !date || !time || !firstName || !lastName || !phone) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const isOnline = sessionType === "online";
    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

    const description = [
      `Course: ${seriesNumber} — ${courseNumber}: ${courseTitle}`,
      `Session Type: ${isOnline ? "Online (Google Meet)" : "In-Person"}`,
      `Student: ${firstName} ${lastName}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      !isOnline && location ? `Location: ${location}` : null,
    ].filter(Boolean).join("\n");

    const [calEvent] = await Promise.allSettled([
      createCalendarEvent({
        summary: `📚 Course ${courseNumber}: ${courseTitle} — ${firstName} ${lastName}`,
        description,
        location: isOnline ? undefined : (location || "To be confirmed"),
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        attendeeEmail: email || undefined,
        googleMeet: isOnline,
      }),
      sendMail({
        subject: `📚 New Course Booking — ${courseNumber}: ${courseTitle}`,
        replyTo: email || undefined,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a2942">
            <div style="background:#1a2942;padding:24px 32px;border-radius:12px 12px 0 0">
              <h1 style="color:#fff;margin:0;font-size:22px">New Course Booking</h1>
              <p style="color:#67e8f9;margin:4px 0 0;font-size:13px;text-transform:uppercase;letter-spacing:1px">${courseNumber}: ${courseTitle}</p>
            </div>
            <div style="background:#f8fafc;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:140px">Student</td><td style="padding:8px 0;font-weight:600">${firstName} ${lastName}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Phone</td><td style="padding:8px 0">${phone}</td></tr>
                ${email ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px">Email</td><td style="padding:8px 0">${email}</td></tr>` : ""}
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Series</td><td style="padding:8px 0">${seriesNumber} Series</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Session</td><td style="padding:8px 0">${isOnline ? "🎥 Online — Google Meet link sent via calendar" : "📍 In-Person"}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Date & Time</td><td style="padding:8px 0;color:#0891b2;font-weight:600">${date} at ${time}</td></tr>
                ${!isOnline && location ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px">Location</td><td style="padding:8px 0">${location}</td></tr>` : ""}
              </table>
              <div style="margin-top:20px;padding:16px;background:${isOnline ? "#ecfdf5" : "#fffbeb"};border-radius:8px;border:1px solid ${isOnline ? "#6ee7b7" : "#fde68a"}">
                <p style="margin:0;font-size:13px;color:${isOnline ? "#065f46" : "#92400e"}">${isOnline ? "🎥 Google Meet link has been added to the calendar invite." : "💰 Payment via Stripe or PayPal to confirm the in-person session."}</p>
              </div>
            </div>
          </div>
        `,
      }),
    ]);

    const eventData = calEvent.status === "fulfilled" ? calEvent.value : null;
    const meetLink = eventData?.conferenceData?.entryPoints?.find((ep: any) => ep.entryPointType === "video")?.uri;

    res.json({ success: true, eventId: eventData?.id, meetLink: meetLink ?? null });
  } catch (err: any) {
    console.error("Course booking error:", err);
    res.status(500).json({ error: err?.message ?? "Failed to process booking" });
  }
});

// ─── Availability Check ──────────────────────────────────────────────────────

router.get("/availability", async (req, res) => {
  try {
    const { date, time, duration = "120" } = req.query as Record<string, string>;

    if (!date || !time) {
      res.status(400).json({ error: "date and time are required" });
      return;
    }

    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + parseInt(duration) * 60 * 1000);

    const result = await checkAvailability(
      startDateTime.toISOString(),
      endDateTime.toISOString()
    );

    res.json(result);
  } catch (err: any) {
    console.error("Availability check error:", err);
    res.status(500).json({ error: err?.message ?? "Failed to check availability" });
  }
});

export default router;
