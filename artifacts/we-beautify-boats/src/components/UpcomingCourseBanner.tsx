import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, MapPin, Clock, X, Zap, ArrowRight } from "lucide-react";
import { apiBase } from "@/lib/api";

export interface UpcomingCourse {
  eventId: string;
  courseNumber: string | null;
  courseTitle: string;
  seriesNumber: string | null;
  isOnline: boolean;
  meetLink: string | null;
  startDateTime: string;
  location: string | null;
}

interface Props {
  onJoin: (course: UpcomingCourse, sessionType: "online" | "inperson") => void;
}

function formatCountdown(startDateTime: string): string {
  const diff = new Date(startDateTime).getTime() - Date.now();
  if (diff <= 0) return "starting now";
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function formatTime(startDateTime: string): string {
  return new Date(startDateTime).toLocaleTimeString("en-CA", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Toronto",
  });
}

function formatDay(startDateTime: string): string {
  const d = new Date(startDateTime);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return d.toLocaleDateString("en-CA", { weekday: "long", month: "short", day: "numeric" });
}

export default function UpcomingCourseBanner({ onJoin }: Props) {
  const [courses, setCourses] = useState<UpcomingCourse[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${apiBase()}/api/upcoming-courses`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && Array.isArray(data)) setCourses(data);
      } catch {
        // silently ignore — static site graceful degradation
      }
    }
    load();
    const interval = setInterval(load, 5 * 60 * 1000); // refresh every 5 min
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  // Update countdown every minute
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 60_000);
    return () => clearInterval(t);
  }, []);

  const visible = courses.filter((c) => !dismissed.has(c.eventId));
  if (visible.length === 0) return null;

  return (
    <div className="space-y-3 mb-8">
      <AnimatePresence>
        {visible.map((course) => (
          <motion.div
            key={course.eventId}
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl border-2 border-cyan-400 bg-gradient-to-r from-cyan-950 to-marine-900 shadow-lg shadow-cyan-900/30"
          >
            {/* Pulsing accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-400 animate-pulse" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 pr-12">
              {/* Icon + badge */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-marine-900 animate-pulse" />
                </div>
                <div>
                  <span className="text-cyan-400 text-xs font-black uppercase tracking-widest block leading-none mb-0.5">
                    Open Session
                  </span>
                  <div className="flex items-center gap-1.5 text-white/60 text-xs">
                    <Clock className="w-3 h-3" />
                    {formatDay(course.startDateTime)} · {formatTime(course.startDateTime)}
                    <span className="text-cyan-300 font-bold">({formatCountdown(course.startDateTime)})</span>
                  </div>
                </div>
              </div>

              {/* Course info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-display font-bold text-sm leading-snug truncate">
                  {course.courseNumber ? `Course ${course.courseNumber}: ` : ""}{course.courseTitle}
                </p>
                {course.location && (
                  <p className="text-white/50 text-xs mt-0.5 flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 shrink-0" /> {course.location}
                  </p>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  onClick={() => onJoin(course, "online")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold transition-all hover:-translate-y-0.5 shadow-md shadow-cyan-500/25"
                >
                  <Video className="w-3.5 h-3.5" /> Join Online
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onJoin(course, "inperson")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-bold transition-all"
                >
                  <MapPin className="w-3.5 h-3.5" /> In-Person · $250
                </button>
              </div>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => setDismissed((prev) => new Set(prev).add(course.eventId))}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
