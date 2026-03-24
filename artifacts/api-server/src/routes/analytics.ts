import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const DATA_FILE = path.join(__dirname, "../../analytics.json");

interface AnalyticsData {
  allTime: number;
}

function load(): AnalyticsData {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return { allTime: 0 };
  }
}

function save(data: AnalyticsData) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data), "utf-8");
}

// In-memory live visitor tracking: sessionId -> last heartbeat timestamp
const liveSessions = new Map<string, number>();

function getLiveCount(): number {
  const cutoff = Date.now() - 60_000; // active within last 60 seconds
  let count = 0;
  for (const ts of liveSessions.values()) {
    if (ts > cutoff) count++;
  }
  return Math.max(count, 1); // always at least 1 if someone is hitting the API
}

function pruneOldSessions() {
  const cutoff = Date.now() - 120_000;
  for (const [id, ts] of liveSessions.entries()) {
    if (ts < cutoff) liveSessions.delete(id);
  }
}

// POST /api/analytics/heartbeat — called by client on load and every 30s
router.post("/analytics/heartbeat", (req, res) => {
  const sessionId = (req.body?.sessionId as string) || "anon";
  const isNew = req.body?.isNew === true;

  pruneOldSessions();
  liveSessions.set(sessionId, Date.now());

  if (isNew) {
    const data = load();
    data.allTime++;
    save(data);
  }

  res.json({ ok: true });
});

// GET /api/analytics — returns current counts
router.get("/analytics", (_req, res) => {
  pruneOldSessions();
  const data = load();
  res.json({ allTime: data.allTime, live: getLiveCount() });
});

export default router;
