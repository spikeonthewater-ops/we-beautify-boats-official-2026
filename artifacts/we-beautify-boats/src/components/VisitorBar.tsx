import { useEffect, useRef, useState } from "react";

interface Stats {
  allTime: number;
  live: number;
}

function generateSessionId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getSessionId() {
  const key = "wbb_sid";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = generateSessionId();
    sessionStorage.setItem(key, id);
  }
  return id;
}

function isNewVisit() {
  const key = "wbb_visited";
  if (localStorage.getItem(key)) return false;
  localStorage.setItem(key, "1");
  return true;
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toString();
}

export default function VisitorBar() {
  const [stats, setStats] = useState<Stats | null>(null);
  const sessionId = useRef(getSessionId());
  const isNew = useRef(isNewVisit());

  async function heartbeat(newVisit: boolean) {
    try {
      await fetch("/api/analytics/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId.current, isNew: newVisit }),
      });
    } catch {
      // silently ignore — API unavailable on static host
    }
  }

  async function fetchStats() {
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // silently ignore
    }
  }

  useEffect(() => {
    heartbeat(isNew.current);
    fetchStats();

    const interval = setInterval(() => {
      heartbeat(false);
      fetchStats();
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  return (
    <div className="w-full bg-marine-900 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-6 flex-wrap">
        {/* Live visitors */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-xs font-bold text-white/90 tracking-wide">
            <span className="text-green-400">{stats.live}</span>
            {" "}
            <span className="text-white/60">{stats.live === 1 ? "person" : "people"} on the water right now</span>
          </span>
        </div>

        <span className="text-white/20 text-xs hidden sm:block">·</span>

        {/* All-time */}
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span className="text-xs font-bold text-white/90 tracking-wide">
            <span className="text-cyan-400">{fmt(stats.allTime)}</span>
            {" "}
            <span className="text-white/60">total visits</span>
          </span>
        </div>
      </div>
    </div>
  );
}
