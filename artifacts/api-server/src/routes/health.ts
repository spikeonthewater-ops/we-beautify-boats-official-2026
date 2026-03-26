import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { getCalendarClient } from "../lib/googleCalendar.js";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

router.get("/calendar-id", async (_req, res) => {
  try {
    const cal = await getCalendarClient();
    const list = await cal.calendarList.list();
    const primary = list.data.items?.find(c => c.primary);
    res.json({ calendarId: primary?.id, summary: primary?.summary });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
