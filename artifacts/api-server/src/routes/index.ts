import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bookingsRouter from "./bookings";
import analyticsRouter from "./analytics";
import { getCalendarClient } from "../lib/googleCalendar.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bookingsRouter);
router.use(analyticsRouter);

router.get("/debug-calendar-account", async (_req, res) => {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY
      ? "repl " + process.env.REPL_IDENTITY
      : process.env.WEB_REPL_RENEWAL
        ? "depl " + process.env.WEB_REPL_RENEWAL
        : null;
    const rawConn = await fetch(
      "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=google-calendar",
      { headers: { Accept: "application/json", "X-Replit-Token": xReplitToken! } }
    ).then(r => r.json());

    const items = rawConn.items ?? [];
    const connIds = items.map((c: any) => c.id);

    const cal = await getCalendarClient();
    const calList = await cal.calendarList.list({ maxResults: 100 });
    const allCals = calList.data.items?.map(c => ({ id: c.id, name: c.summary })) ?? [];
    const primary = allCals.find(c => !c.id?.includes("group.calendar"));
    const wbbCals = allCals.filter(c => c.name?.startsWith("WBB"));
    res.json({ availableConnectionIds: connIds, primaryAccount: primary?.id, primaryName: primary?.name, wbbCalendars: wbbCals });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
