import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Video, MapPin, CalendarDays, Clock, User, Phone, Mail,
  CheckCircle2, AlertCircle, Loader2, CreditCard, ChevronLeft,
  ExternalLink, Instagram, Anchor,
} from "lucide-react";

export interface CourseBookingModalProps {
  course: { number: string; title: string; tagline: string };
  seriesNumber: string;
  seriesColor: string;
  initialSessionType?: "online" | "inperson";
  onClose: () => void;
}

const TIMES = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00",
];

const STRIPE_LINK = "https://buy.stripe.com/aFa4gA0zLd6H24T1xX0kE00";
const PAYPAL_LINK = "https://paypal.me/spikeonthewater/250";

function getTodayStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function getMaxDateStr() {
  const d = new Date();
  d.setMonth(d.getMonth() + 4);
  return d.toISOString().split("T")[0];
}

type SessionType = "online" | "inperson" | null;
type Step = 1 | 2 | 3 | 4;
type AvailStatus = "idle" | "checking" | "available" | "conflict";

export default function CourseBookingModal({
  course,
  seriesNumber,
  seriesColor,
  initialSessionType,
  onClose,
}: CourseBookingModalProps) {
  const [step, setStep] = useState<Step>(initialSessionType ? 2 : 1);
  const [sessionType, setSessionType] = useState<SessionType>(initialSessionType ?? null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availStatus, setAvailStatus] = useState<AvailStatus>("idle");
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    address: "", instagram: "", attendeeType: [] as string[],
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ meetLink?: string } | null>(null);
  const [error, setError] = useState("");

  const ATTENDEE_ROLES = [
    { id: "wbb-crew",      label: "We Beautify Boats Crew", Icon: Anchor },
    { id: "boat-owner",    label: "Boat Owner",              Icon: Anchor },
    { id: "marina-staff",  label: "Marina Staff",            Icon: MapPin },
    { id: "marine-pro",    label: "Marine Professional",     Icon: User   },
    { id: "other",         label: "Other",                   Icon: User   },
  ];

  const toggleRole = (id: string) =>
    setForm((f) => ({
      ...f,
      attendeeType: f.attendeeType.includes(id)
        ? f.attendeeType.filter((r) => r !== id)
        : [...f.attendeeType, id],
    }));

  const checkAvailability = useCallback(async (d: string, t: string) => {
    if (!d || !t) return;
    setAvailStatus("checking");
    try {
      const res = await fetch(`/api/availability?date=${d}&time=${t}&duration=120`);
      const data = await res.json();
      setAvailStatus(data.available ? "available" : "conflict");
    } catch {
      setAvailStatus("idle");
    }
  }, []);

  useEffect(() => {
    if (date && time) checkAvailability(date, time);
  }, [date, time, checkAvailability]);

  const handleField = (k: keyof Omit<typeof form, "attendeeType">) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const canProceedStep2 = sessionType !== null;
  const canProceedStep3 = date && time && (availStatus === "available");
  const canProceedStep4 =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.phone.trim() &&
    form.email.trim() &&
    form.address.trim();

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seriesNumber,
          courseNumber: course.number,
          courseTitle: course.title,
          sessionType,
          date,
          time,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          location: form.address,
          instagram: form.instagram,
          attendeeType: form.attendeeType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setResult(data);
      setStep(4);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const headerBg = seriesColor.includes("cyan")
    ? "bg-cyan-600"
    : seriesColor.includes("purple")
    ? "bg-purple-700"
    : "bg-marine-900";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`${headerBg} rounded-t-3xl p-6 text-white`}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest block mb-1">
                {seriesNumber} Series · Module {course.number}
              </span>
              <h2 className="text-xl font-display font-bold leading-snug">{course.title}</h2>
              <p className="text-white/70 text-sm mt-0.5">{course.tagline}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors ml-3 shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-5">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > s ? "bg-white text-marine-900" : step === s ? "bg-white/30 text-white ring-2 ring-white" : "bg-white/10 text-white/50"
                }`}>
                  {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
                {s < 3 && <div className={`h-0.5 w-8 rounded-full ${step > s ? "bg-white" : "bg-white/20"}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* ── Step 1: Session Type ── */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display font-bold text-marine-900 mb-1">Choose Session Format</h3>
                <p className="text-sm text-muted-foreground mb-4">How would you like to attend this module?</p>
                <div className="space-y-3">
                  <button
                    onClick={() => setSessionType("online")}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                      sessionType === "online"
                        ? "border-cyan-500 bg-cyan-50"
                        : "border-border hover:border-cyan-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sessionType === "online" ? "bg-cyan-500" : "bg-gray-100"}`}>
                        <Video className={`w-5 h-5 ${sessionType === "online" ? "text-white" : "text-gray-500"}`} />
                      </div>
                      <div>
                        <p className="font-bold text-marine-900 text-sm">Online — Google Meet</p>
                        <p className="text-xs text-muted-foreground">Live theory session via Google Meet · Link in calendar invite</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSessionType("inperson")}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                      sessionType === "inperson"
                        ? "border-marine-900 bg-marine-50"
                        : "border-border hover:border-marine-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sessionType === "inperson" ? "bg-marine-900" : "bg-gray-100"}`}>
                        <MapPin className={`w-5 h-5 ${sessionType === "inperson" ? "text-white" : "text-gray-500"}`} />
                      </div>
                      <div>
                        <p className="font-bold text-marine-900 text-sm">In-Person Practical</p>
                        <p className="text-xs text-muted-foreground">Hands-on at your marina or vessel · Stripe / PayPal payment</p>
                      </div>
                    </div>
                  </button>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep2}
                  className="mt-6 w-full py-3 rounded-2xl font-bold text-sm transition-all bg-marine-900 text-white hover:bg-marine-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue — Choose Date & Time →
                </button>
              </motion.div>
            )}

            {/* ── Step 2: Date & Time ── */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-marine-900 transition-colors mb-4">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <h3 className="font-display font-bold text-marine-900 mb-1">Pick a Date & Time</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {sessionType === "online" ? "Online via Google Meet" : "In-Person Practical"} · 2-hour session
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-marine-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-cyan-500" /> Date
                    </label>
                    <input
                      type="date"
                      min={getTodayStr()}
                      max={getMaxDateStr()}
                      value={date}
                      onChange={(e) => { setDate(e.target.value); setAvailStatus("idle"); }}
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-marine-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-500" /> Time (ET)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {TIMES.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all ${
                            time === t
                              ? "bg-marine-900 text-white"
                              : "bg-gray-50 border border-border text-marine-900 hover:border-cyan-400"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability indicator */}
                  <AnimatePresence>
                    {availStatus !== "idle" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold ${
                          availStatus === "checking"
                            ? "bg-gray-50 text-gray-500"
                            : availStatus === "available"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {availStatus === "checking" && <Loader2 className="w-4 h-4 animate-spin" />}
                        {availStatus === "available" && <CheckCircle2 className="w-4 h-4" />}
                        {availStatus === "conflict" && <AlertCircle className="w-4 h-4" />}
                        {availStatus === "checking" && "Checking calendar…"}
                        {availStatus === "available" && "This slot is available — let's go!"}
                        {availStatus === "conflict" && "That time is already booked. Please pick another."}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep3}
                  className="mt-6 w-full py-3 rounded-2xl font-bold text-sm transition-all bg-marine-900 text-white hover:bg-marine-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue — Your Details →
                </button>
              </motion.div>
            )}

            {/* ── Step 3: Contact + Submit ── */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-marine-900 transition-colors mb-4">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <h3 className="font-display font-bold text-marine-900 mb-1">Your Details</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {sessionType === "online"
                    ? "A Google Meet link will be sent to your email."
                    : "Payment via Stripe or PayPal confirms your in-person spot."}
                </p>

                <div className="space-y-3">
                  {/* Name */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-marine-900 mb-1 block">First Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={handleField("firstName")}
                          placeholder="Jane"
                          className="w-full pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-marine-900 mb-1 block">Last Name *</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={handleField("lastName")}
                        placeholder="Doe"
                        className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-bold text-marine-900 mb-1 block">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={handleField("phone")}
                        placeholder="416-555-0100"
                        className="w-full pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Email — required */}
                  <div>
                    <label className="text-xs font-bold text-marine-900 mb-1 block">Email * <span className="text-gray-400 font-normal">(for calendar invite &amp; Meet link)</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={handleField("email")}
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Address — always required */}
                  <div>
                    <label className="text-xs font-bold text-marine-900 mb-1 block">
                      {sessionType === "inperson" ? "Marina / Location *" : "City / Address *"}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={form.address}
                        onChange={handleField("address")}
                        placeholder={sessionType === "inperson" ? "e.g. Oakville Yacht Club" : "e.g. Toronto, ON"}
                        className="w-full pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Instagram — optional */}
                  <div>
                    <label className="text-xs font-bold text-marine-900 mb-1 block">Instagram <span className="text-gray-400 font-normal">(optional)</span></label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={form.instagram}
                        onChange={handleField("instagram")}
                        placeholder="@yourhandle"
                        className="w-full pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Who are you? — multi-select */}
                  <div>
                    <label className="text-xs font-bold text-marine-900 mb-2 block">Who are you? <span className="text-gray-400 font-normal">(select all that apply)</span></label>
                    <div className="grid grid-cols-2 gap-2">
                      {ATTENDEE_ROLES.map(({ id, label }) => {
                        const selected = form.attendeeType.includes(id);
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => toggleRole(id)}
                            className={`text-left px-3 py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                              selected
                                ? "border-cyan-500 bg-cyan-50 text-cyan-800"
                                : "border-border text-marine-900 hover:border-cyan-300 hover:bg-gray-50"
                            }`}
                          >
                            <span className={`inline-block w-3.5 h-3.5 rounded border mr-2 align-middle transition-all ${selected ? "bg-cyan-500 border-cyan-500" : "border-gray-300"}`} />
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                  </div>
                )}

                <button
                  onClick={submit}
                  disabled={!canProceedStep4 || submitting}
                  className="mt-6 w-full py-3 rounded-2xl font-bold text-sm transition-all bg-marine-900 text-white hover:bg-marine-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking…</> : "Confirm Booking →"}
                </button>
              </motion.div>
            )}

            {/* ── Step 4: Confirmation ── */}
            {step === 4 && result !== null && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                  </div>
                  <h3 className="font-display font-bold text-marine-900 text-xl mb-1">You're Booked!</h3>
                  <p className="text-sm text-muted-foreground">
                    {course.number}: {course.title} — {date} at {time}
                  </p>
                </div>

                {sessionType === "online" && (
                  <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4 mb-4 text-center">
                    <Video className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-cyan-800 mb-1">Google Meet Session</p>
                    {result.meetLink ? (
                      <a
                        href={result.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-cyan-700 text-xs font-semibold hover:underline"
                      >
                        Join Meeting <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <p className="text-xs text-cyan-600">Link included in your calendar invite</p>
                    )}
                  </div>
                )}

                {sessionType === "inperson" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
                    <p className="text-sm font-bold text-amber-800 mb-3 text-center flex items-center justify-center gap-1.5">
                      <CreditCard className="w-4 h-4" /> Complete Payment to Confirm
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={STRIPE_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-marine-900 text-white text-xs font-bold hover:bg-marine-800 transition-colors"
                      >
                        <CreditCard className="w-3.5 h-3.5" /> Pay via Stripe
                      </a>
                      <a
                        href={PAYPAL_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#0070ba] text-white text-xs font-bold hover:bg-[#005ea6] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Pay via PayPal
                      </a>
                    </div>
                  </div>
                )}

                <p className="text-xs text-center text-muted-foreground mb-4">
                  Spike has been notified at webeautifyboats.toronto@gmail.com
                  {form.email ? " · A calendar invite is on its way to you." : "."}
                </p>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl font-bold text-sm border-2 border-marine-900 text-marine-900 hover:bg-marine-900 hover:text-white transition-all"
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
