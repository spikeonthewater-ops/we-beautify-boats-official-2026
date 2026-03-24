import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Users, Mail, Phone, Anchor } from "lucide-react";

const SERVICES = [
  { id: "deck-exterior", label: "Deck & Exterior" },
  { id: "hull-bottom", label: "Hull & Bottom" },
  { id: "interior", label: "Interior Detailing" },
  { id: "protections", label: "Protections (Wax / Ceramic / UV)" },
  { id: "workshops", label: "Workshops & Training" },
  { id: "assessment", label: "Boat Assessment" },
];

interface Form {
  referrerName: string;
  referrerEmail: string;
  referrerPhone: string;
  friendName: string;
  boatName: string;
  clubMarina: string;
  friendPhone: string;
  services: string[];
  notes: string;
}

const EMPTY: Form = {
  referrerName: "",
  referrerEmail: "",
  referrerPhone: "",
  friendName: "",
  boatName: "",
  clubMarina: "",
  friendPhone: "",
  services: [],
  notes: "",
};

interface Props {
  onClose: () => void;
}

function fe(attempted: boolean, val: string) {
  return attempted && !val.trim()
    ? "border-red-400 bg-red-50 placeholder:text-red-300"
    : "border-border bg-white";
}

export default function ReferralModal({ onClose }: Props) {
  const [form, setForm] = useState<Form>(EMPTY);
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const toggleService = (id: string) =>
    setForm(f => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter(s => s !== id)
        : [...f.services, id],
    }));

  const requiredOk =
    form.referrerName.trim() &&
    form.referrerEmail.trim() &&
    form.referrerPhone.trim() &&
    form.friendName.trim() &&
    form.boatName.trim() &&
    form.clubMarina.trim() &&
    form.friendPhone.trim();

  function buildMessage() {
    const serviceList =
      form.services.length > 0
        ? form.services.map(id => SERVICES.find(s => s.id === id)?.label).join(", ")
        : "Not specified";

    const lines = [
      "🤝 *New Referral — We Beautify Boats*",
      "",
      "👤 *Referred By*",
      `Name: ${form.referrerName}`,
      `Email: ${form.referrerEmail}`,
      `Phone: ${form.referrerPhone}`,
      "",
      "⛵ *Referred Friend*",
      `Name: ${form.friendName}`,
      `Boat: ${form.boatName}`,
      `Club / Marina: ${form.clubMarina}`,
      `Phone: ${form.friendPhone}`,
      "",
      `🔧 *Services of Interest*`,
      serviceList,
    ];

    if (form.notes.trim()) {
      lines.push("", `📝 *Notes*`, form.notes.trim());
    }

    return encodeURIComponent(lines.join("\n"));
  }

  function buildMailto() {
    const serviceList =
      form.services.length > 0
        ? form.services.map(id => SERVICES.find(s => s.id === id)?.label).join(", ")
        : "Not specified";

    const body = [
      `New Referral — We Beautify Boats`,
      ``,
      `Referred By`,
      `Name: ${form.referrerName}`,
      `Email: ${form.referrerEmail}`,
      `Phone: ${form.referrerPhone}`,
      ``,
      `Referred Friend`,
      `Name: ${form.friendName}`,
      `Boat: ${form.boatName}`,
      `Club / Marina: ${form.clubMarina}`,
      `Phone: ${form.friendPhone}`,
      ``,
      `Services of Interest: ${serviceList}`,
      form.notes.trim() ? `\nNotes: ${form.notes.trim()}` : "",
    ].join("\n");

    return `mailto:spikeonthewater@gmail.com?subject=${encodeURIComponent("New Referral: " + form.friendName)}&body=${encodeURIComponent(body)}`;
  }

  function handleSend(via: "whatsapp" | "email") {
    setAttempted(true);
    if (!requiredOk) return;
    setSent(true);
    if (via === "whatsapp") {
      window.open(`https://wa.me/14168905899?text=${buildMessage()}`, "_blank", "noopener,noreferrer");
    } else {
      window.open(buildMailto(), "_blank", "noopener,noreferrer");
    }
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
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-marine-900 rounded-t-3xl p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-1">
                Spread the Word
              </span>
              <h2 className="text-xl font-display font-bold leading-snug">Send a Referral</h2>
              <p className="text-gray-300 text-sm mt-1">Know someone whose boat deserves the best? Tell us about them.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 text-center"
            >
              <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <h3 className="font-display font-bold text-2xl text-marine-900 mb-2">Referral Sent!</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Thanks for spreading the word. Spike will reach out to your friend shortly.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-marine-900 text-white font-bold text-sm hover:bg-marine-800 transition-colors"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" className="p-6 space-y-6">

              {/* Validation banner */}
              {attempted && !requiredOk && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-xs text-red-700 font-medium">Please fill in all required fields before sending.</p>
                </div>
              )}

              {/* YOUR DETAILS */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-cyan-600" />
                  <h3 className="font-display font-bold text-marine-900 text-sm uppercase tracking-wider">Your Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Your Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      value={form.referrerName}
                      onChange={set("referrerName")}
                      className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300 transition-all ${fe(attempted, form.referrerName)}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="jane@email.com"
                      value={form.referrerEmail}
                      onChange={set("referrerEmail")}
                      className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300 transition-all ${fe(attempted, form.referrerEmail)}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Your Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="416-555-0100"
                      value={form.referrerPhone}
                      onChange={set("referrerPhone")}
                      className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300 transition-all ${fe(attempted, form.referrerPhone)}`}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-border" />

              {/* FRIEND'S DETAILS */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Anchor className="w-4 h-4 text-cyan-600" />
                  <h3 className="font-display font-bold text-marine-900 text-sm uppercase tracking-wider">Their Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Friend's Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.friendName}
                      onChange={set("friendName")}
                      className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300 transition-all ${fe(attempted, form.friendName)}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Boat Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sea Breeze"
                      value={form.boatName}
                      onChange={set("boatName")}
                      className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300 transition-all ${fe(attempted, form.boatName)}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Club or Marina <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Oakville Yacht Club"
                      value={form.clubMarina}
                      onChange={set("clubMarina")}
                      className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300 transition-all ${fe(attempted, form.clubMarina)}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Friend's Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="416-555-0199"
                      value={form.friendPhone}
                      onChange={set("friendPhone")}
                      className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300 transition-all ${fe(attempted, form.friendPhone)}`}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-border" />

              {/* SERVICES */}
              <div>
                <h3 className="font-display font-bold text-marine-900 text-sm uppercase tracking-wider mb-3">Services of Interest</h3>
                <div className="grid grid-cols-1 gap-2">
                  {SERVICES.map(s => (
                    <label
                      key={s.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                        form.services.includes(s.id)
                          ? "border-cyan-400 bg-cyan-50"
                          : "border-border bg-gray-50 hover:border-cyan-300"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                        form.services.includes(s.id) ? "bg-cyan-500 border-cyan-500" : "border-gray-300 bg-white"
                      }`}>
                        {form.services.includes(s.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={form.services.includes(s.id)}
                        onChange={() => toggleService(s.id)}
                      />
                      <span className={`text-sm font-semibold ${form.services.includes(s.id) ? "text-cyan-700" : "text-gray-700"}`}>
                        {s.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* NOTES */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Additional Notes <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea
                  rows={3}
                  placeholder="Anything else Spike should know..."
                  value={form.notes}
                  onChange={set("notes")}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300 transition-all resize-none bg-white"
                />
              </div>

              {/* SEND BUTTONS */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={() => handleSend("whatsapp")}
                  className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.99] shadow-lg text-white ${
                    attempted && !requiredOk
                      ? "bg-red-400 hover:bg-red-500"
                      : "bg-cyan-500 hover:bg-cyan-400"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Send via WhatsApp
                </button>
                <button
                  onClick={() => handleSend("email")}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm uppercase tracking-widest border transition-all ${
                    attempted && !requiredOk
                      ? "border-red-300 text-red-400"
                      : "border-marine-900 text-marine-900 hover:bg-marine-900 hover:text-white"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Send via Email
                </button>
                <p className="text-center text-[10px] text-gray-400 leading-relaxed">
                  WhatsApp opens a pre-filled message · Email opens your mail app · spikeonthewater@gmail.com
                </p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
