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
    const cal = await getCalendarClient();
    const calList = await cal.calendarList.list({ maxResults: 100 });
    const allCals = calList.data.items?.map(c => ({ id: c.id, name: c.summary })) ?? [];
    const wbbCals = allCals.filter(c => c.name?.startsWith("WBB"));
    const primary = allCals.find(c => !c.id?.includes("group.calendar"));
    res.json({ primaryCalendarId: primary?.id, primaryName: primary?.name, wbbCalendars: wbbCals, totalCalendars: allCals.length });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
