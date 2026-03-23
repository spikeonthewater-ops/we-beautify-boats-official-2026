import { Router, type IRouter } from "express";
import { createCalendarEvent } from "../lib/googleCalendar.js";

const router: IRouter = Router();

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

    const event = await createCalendarEvent({
      summary: `🎓 Workshop Booking — ${workshop} @ ${venue}`,
      description,
      location: venue,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
      attendeeEmail: email || undefined,
    });

    res.json({ success: true, eventId: event.id });
  } catch (err: any) {
    console.error("Workshop booking error:", err);
    res.status(500).json({ error: err?.message ?? "Failed to create calendar event" });
  }
});

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

    const event = await createCalendarEvent({
      summary: `⚓ Assessment — ${firstName} ${lastName} · ${boatName} @ ${address}`,
      description,
      location: address,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
      attendeeEmail: email || undefined,
    });

    res.json({ success: true, eventId: event.id });
  } catch (err: any) {
    console.error("Assessment booking error:", err);
    res.status(500).json({ error: err?.message ?? "Failed to create calendar event" });
  }
});

export default router;
