import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, CheckCircle2, AlertCircle, Loader2, User, Mail, Phone, MapPin, Calendar, Users, Clock } from "lucide-react";

const BOOKING_API = "/api/bookings/workshop";

export interface WorkshopBookingModalProps {
  workshop: {
    name: string;
    tag: string;
    audience: string;
    description: string;
    stripeLink: string;   // e.g. https://buy.stripe.com/XXXXXX
    paypalLink: string;   // e.g. https://paypal.me/spikeonthewater/250CAD
  };
  onClose: () => void;
}

type Step = "form" | "submitting" | "payment" | "error";

type AvailStatus = "idle" | "checking" | "available" | "conflict";

export default function WorkshopBookingModal({ workshop, onClose }: WorkshopBookingModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [availStatus, setAvailStatus] = useState<AvailStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!eventDate || !eventTime) { setAvailStatus("idle"); return; }
    let cancelled = false;
    setAvailStatus("checking");
    (async () => {
      try {
        const [h, m] = eventTime.split(":");
        const timeVal = `${h.padStart(2, "0")}:${(m ?? "00").padStart(2, "0")}`;
        const res = await fetch(`/api/availability?date=${eventDate}&time=${timeVal}&duration=120`);
        if (cancelled) return;
        if (!res.ok) { setAvailStatus("idle"); return; }
        const json = await res.json();
        if (cancelled) return;
        setAvailStatus(typeof json.available === "boolean" ? (json.available ? "available" : "conflict") : "idle");
      } catch {
        if (!cancelled) setAvailStatus("idle");
      }
    })();
    return () => { cancelled = true; };
  }, [eventDate, eventTime]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    setStep("submitting");

    const raw = new FormData(e.currentTarget);
    const body = {
      workshop: workshop.name,
      venue: raw.get("venue"),
      event_date: raw.get("event_date"),
      event_time: raw.get("event_time"),
      contact_person: raw.get("contact_person"),
      email: raw.get("email"),
      phone: raw.get("phone"),
      attendance: raw.get("attendance"),
    };

    try {
      const res = await fetch(BOOKING_API, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setErrorMsg("");
      } else {
        setErrorMsg("Note: calendar sync unavailable — Spike will confirm your slot by phone.");
      }
    } catch {
      setErrorMsg("Note: calendar sync unavailable — Spike will confirm your slot by phone.");
    }
    setStep("payment");
  }

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
        transition={{ duration: 0.22 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-marine-900 rounded-t-3xl p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-1">
                {workshop.tag}
              </span>
              <h2 className="text-xl font-display font-bold leading-snug">{workshop.name}</h2>
              <p className="text-gray-300 text-sm mt-1">For: {workshop.audience}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Price badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-1.5">
            <CreditCard className="w-3.5 h-3.5 text-cyan-300" />
            <span className="text-cyan-200 text-sm font-bold">$250.00 CAD + HST</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">

            {/* ── Step: Form ── */}
            {step === "form" && (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {workshop.description}
                </p>

                {/* Marina / Yacht Club Name */}
                <div>
                  <label className="block text-xs font-semibold text-marine-900 mb-1">
                    Marina / Yacht Club Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="venue"
                      required
                      placeholder="e.g. Royal Canadian Yacht Club"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Event Date & Time */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-marine-900 mb-1">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="date"
                        name="event_date"
                        required
                        value={eventDate}
                        onChange={e => { setEventDate(e.target.value); setEventTime(""); }}
                        min={new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0]}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-marine-900 mb-1">
                      Event Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="time"
                        name="event_time"
                        required
                        value={eventTime}
                        onChange={e => setEventTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Availability indicator */}
                <AnimatePresence>
                  {availStatus !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm ${
                        availStatus === "checking"
                          ? "bg-gray-50 text-gray-500"
                          : availStatus === "available"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {availStatus === "checking" && <Loader2 className="w-4 h-4 animate-spin shrink-0 mt-0.5" />}
                      {availStatus === "available" && <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
                      {availStatus === "conflict" && <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                      <span className="font-medium">
                        {availStatus === "checking" && "Checking Spike's calendar…"}
                        {availStatus === "available" && "Spike appears free on this date and time — great choice!"}
                        {availStatus === "conflict" && "Spike has an existing commitment around that time. You can still submit your request — he'll coordinate with you to find a solution or alternate time."}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Contact Person */}
                <div>
                  <label className="block text-xs font-semibold text-marine-900 mb-1">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="contact_person"
                      required
                      placeholder="On-site contact name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-marine-900 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        inputMode="email"
                        autoComplete="email"
                        name="email"
                        required
                        placeholder="contact@marina.ca"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-marine-900 mb-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        inputMode="tel"
                        autoComplete="tel"
                        name="phone"
                        placeholder="416-555-0100"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Expected Attendance */}
                <div>
                  <label className="block text-xs font-semibold text-marine-900 mb-1">
                    Expected Attendance <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      name="expected_attendance"
                      required
                      min="1"
                      max="100"
                      placeholder="e.g. 12 participants"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-marine-900 mb-1">Additional Notes</label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Dock access, special requirements, questions for Spike..."
                    className="w-full px-3 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Recording disclaimer */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-cyan-500 shrink-0"
                      required
                    />
                    <span className="text-xs text-amber-800 leading-relaxed">
                      <strong>Recording Disclaimer:</strong> By registering, I acknowledge and consent that these sessions may be recorded and published to the{" "}<a href="https://www.youtube.com/@SpikeOnTheWater" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-900">Spike On The Water YouTube channel</a>{" "}to promote shared knowledge and community learning.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!agreed}
                  className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-500/20"
                >
                  Submit & Proceed to Payment
                </button>
              </motion.form>
            )}

            {/* ── Step: Submitting ── */}
            {step === "submitting" && (
              <motion.div
                key="submitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 flex flex-col items-center gap-4 text-center"
              >
                <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
                <p className="text-marine-900 font-semibold">Sending your request…</p>
              </motion.div>
            )}

            {/* ── Step: Payment ── */}
            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={`w-6 h-6 shrink-0 mt-0.5 ${errorMsg ? "text-amber-500" : "text-green-500"}`} />
                  <div>
                    <p className="font-display font-bold text-marine-900">{errorMsg ? "Almost There" : "Request received!"}</p>
                    <p className="text-sm text-muted-foreground">
                      {errorMsg
                        ? "Spike will confirm your slot by phone within 24 hours. Complete your payment below to hold your spot."
                        : "Spike has been notified at webeautifyboats.toronto@gmail.com. Complete your payment below to confirm your spot."}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Complete Payment — $250.00 CAD + HST</p>

                  <a
                    href={workshop.stripeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#635BFF] hover:bg-[#4f46e5] text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
                    Pay with Stripe
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground font-medium">or</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <a
                    href={workshop.paypalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#003087] hover:bg-[#001f5c] text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg"
                  >
                    <svg className="w-14 h-4" viewBox="0 0 101 32" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M 12.237 2.8 L 4.437 2.8 C 3.937 2.8 3.437 3.2 3.337 3.7 L 0.237 23.7 C 0.137 24.1 0.437 24.4 0.837 24.4 L 4.537 24.4 C 5.037 24.4 5.537 24 5.637 23.5 L 6.437 18.1 C 6.537 17.6 6.937 17.2 7.537 17.2 L 9.937 17.2 C 14.837 17.2 17.637 14.9 18.337 10.4 C 18.637 8.4 18.337 6.8 17.437 5.6 C 16.437 4.4 14.637 2.8 12.237 2.8 Z M 13.037 10.6 C 12.637 13.1 10.737 13.1 8.937 13.1 L 7.937 13.1 L 8.637 8.7 C 8.637 8.4 8.937 8.2 9.237 8.2 L 9.637 8.2 C 10.937 8.2 12.137 8.2 12.737 8.9 C 13.137 9.4 13.237 9.9 13.037 10.6 Z"/><path d="M 35.437 10.4 L 31.737 10.4 C 31.437 10.4 31.137 10.6 31.137 10.9 L 30.937 12 L 30.637 11.6 C 29.737 10.3 27.837 9.8 25.937 9.8 C 21.637 9.8 17.937 13.1 17.237 17.7 C 16.837 20 17.437 22.2 18.837 23.7 C 20.037 25.1 21.837 25.7 23.837 25.7 C 27.337 25.7 29.337 23.5 29.337 23.5 L 29.137 24.6 C 29.037 25 29.337 25.4 29.737 25.4 L 33.137 25.4 C 33.637 25.4 34.137 25 34.237 24.5 L 36.237 11.2 C 36.337 10.8 36.037 10.4 35.437 10.4 Z M 30.437 17.8 C 30.037 20 28.237 21.6 25.937 21.6 C 24.837 21.6 23.937 21.3 23.337 20.6 C 22.737 19.9 22.537 19 22.737 17.9 C 23.037 15.8 24.937 14.1 27.137 14.1 C 28.237 14.1 29.137 14.5 29.737 15.1 C 30.337 15.8 30.537 16.8 30.437 17.8 Z"/><path d="M 55.337 10.4 L 51.537 10.4 C 51.237 10.4 50.937 10.6 50.737 10.8 L 45.537 18.5 L 43.337 11.1 C 43.237 10.7 42.837 10.4 42.437 10.4 L 38.737 10.4 C 38.337 10.4 37.937 10.8 38.137 11.2 L 42.337 23.7 L 38.337 29.2 C 38.037 29.6 38.337 30.2 38.837 30.2 L 42.637 30.2 C 42.937 30.2 43.237 30 43.437 29.8 L 55.837 11.4 C 56.137 11 55.837 10.4 55.337 10.4 Z"/><path d="M 67.737 2.8 L 59.937 2.8 C 59.437 2.8 58.937 3.2 58.837 3.7 L 55.737 23.6 C 55.637 24 55.937 24.4 56.337 24.4 L 60.337 24.4 C 60.737 24.4 61.037 24.1 61.037 23.8 L 61.937 18.1 C 62.037 17.6 62.437 17.2 63.037 17.2 L 65.437 17.2 C 70.337 17.2 73.137 14.9 73.837 10.4 C 74.137 8.4 73.837 6.8 72.937 5.6 C 71.937 4.4 70.037 2.8 67.737 2.8 Z M 68.537 10.6 C 68.137 13.1 66.237 13.1 64.437 13.1 L 63.437 13.1 L 64.137 8.7 C 64.137 8.4 64.437 8.2 64.737 8.2 L 65.137 8.2 C 66.437 8.2 67.637 8.2 68.237 8.9 C 68.637 9.4 68.737 9.9 68.537 10.6 Z"/><path d="M 90.937 10.4 L 87.237 10.4 C 86.937 10.4 86.637 10.6 86.637 10.9 L 86.437 12 L 86.137 11.6 C 85.237 10.3 83.337 9.8 81.437 9.8 C 77.137 9.8 73.437 13.1 72.737 17.7 C 72.337 20 72.937 22.2 74.337 23.7 C 75.537 25.1 77.337 25.7 79.337 25.7 C 82.837 25.7 84.837 23.5 84.837 23.5 L 84.637 24.6 C 84.537 25 84.837 25.4 85.237 25.4 L 88.637 25.4 C 89.137 25.4 89.637 25 89.737 24.5 L 91.737 11.2 C 91.837 10.8 91.437 10.4 90.937 10.4 Z M 85.937 17.8 C 85.537 20 83.737 21.6 81.437 21.6 C 80.337 21.6 79.437 21.3 78.837 20.6 C 78.237 19.9 78.037 19 78.237 17.9 C 78.537 15.8 80.437 14.1 82.637 14.1 C 83.737 14.1 84.637 14.5 85.237 15.1 C 85.837 15.8 86.137 16.8 85.937 17.8 Z"/><path d="M 95.337 3.3 L 92.137 23.6 C 92.037 24 92.337 24.4 92.737 24.4 L 95.937 24.4 C 96.437 24.4 96.937 24 97.037 23.5 L 100.237 3.5 C 100.337 3.1 100.037 2.8 99.637 2.8 L 96.037 2.8 C 95.637 2.8 95.437 3 95.337 3.3 Z"/></svg>
                  </a>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Questions? WhatsApp Spike at{" "}
                  <a href="https://wa.me/14168905899" target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-semibold hover:underline">
                    416-890-5899
                  </a>
                </p>
              </motion.div>
            )}

            {/* ── Step: Error ── */}
            {step === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 flex flex-col items-center gap-4 text-center"
              >
                <AlertCircle className="w-10 h-10 text-red-500" />
                <div>
                  <p className="font-display font-bold text-marine-900 mb-1">Submission failed</p>
                  <p className="text-sm text-muted-foreground">{errorMsg}</p>
                </div>
                <button
                  onClick={() => setStep("form")}
                  className="px-6 py-2.5 rounded-full bg-marine-900 text-white text-sm font-bold hover:bg-marine-800 transition-colors"
                >
                  Try again
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
