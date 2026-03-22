import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuote } from "@/context/QuoteContext";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  FlaskConical,
  Shield,
  Droplets,
  Sparkles,
  Phone,
} from "lucide-react";

const CURRICULUM = [
  {
    icon: FlaskConical,
    title: "Substrate Integrity Analysis",
    desc: "Learn to read gelcoat, paint, and composite surfaces before the buffer touches the boat. Understanding what you're working with is the foundation of every great finish.",
  },
  {
    icon: Sparkles,
    title: "Compound & Polish Chemistry",
    desc: "Oxidation dynamics, pad selection, and liquid formulation for Great Lakes freshwater conditions. Know why each product does what it does — not just how to apply it.",
  },
  {
    icon: Shield,
    title: "Systematic Quality Control",
    desc: "Implementing the Predictive Buffer Workflow to achieve mirror finishes consistently — without holograms, burn-through, or avoidable rework.",
  },
  {
    icon: Droplets,
    title: "Environmental Impact Reduction",
    desc: "Professional waste-water recycling and eco-conscious chemical application that protects Ontario's freshwater lakes while keeping your operation marina-compliant.",
  },
  {
    icon: GraduationCap,
    title: "Safe Vinyl & Brightwork Recovery",
    desc: "Specialized modules for tender tube detailing, metal polishing, and vinyl recoloring — the high-visibility work that separates a good crew from a great one.",
  },
];

const FORMATS = [
  {
    name: "The Marina Pro-Series",
    audience: "Staff & Crews",
    focus: "Efficiency, workflow optimization, and crew leadership. Designed for professional teams serving multiple vessels at scale.",
    tag: "Professional",
    color: "bg-cyan-500",
  },
  {
    name: 'Yacht Club "Owner\'s Day"',
    audience: "Private Owners",
    focus: "Practical DIY skills, tool safety, and seasonal maintenance. Take the knowledge home and extend the life of your own boat.",
    tag: "Owner",
    color: "bg-purple-500",
  },
  {
    name: "The Restoration Masterclass",
    audience: "Advanced Technicians",
    focus: "Wet sanding, spot repairs, and ceramic coating application. For experienced hands ready to operate at the highest level.",
    tag: "Advanced",
    color: "bg-marine-900",
  },
];

export default function Workshops() {
  const { openQuote } = useQuote();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <div className="bg-marine-900 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/service-workshops.png)` }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <Link
            href="/our-services"
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-4 h-4" /> Workshops & Training
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Better Care, Better Boating
          </h1>
          <p className="text-xl text-cyan-100/80 font-light leading-relaxed max-w-2xl mx-auto">
            Bring 30 years of recreational marine expertise directly to your dock. Hands-on workshops for yacht clubs, marina staff, and dedicated owner-operators who want to master the Ontario Standard of marine preservation.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 space-y-24">

        {/* Curriculum */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs block mb-3">
              The Curriculum
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-marine-900">
              From Science to Surface
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our workshops move beyond basic cleaning. We dive into the technical intellectual property required to maintain hull integrity and long-term resale value.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURRICULUM.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="font-display font-bold text-marine-900 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Workshop image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl aspect-[16/7] relative"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/service-workshops.png`}
            alt="Better Care, Better Boating — a community workshop with We Beautify Boats"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marine-900/60 to-transparent flex items-end p-10">
            <blockquote className="text-white max-w-2xl">
              <p className="text-xl md:text-2xl font-display font-bold leading-relaxed">
                "The snow has not slowed us down. Don't wait until May to upskill your crew."
              </p>
              <footer className="mt-3 text-cyan-300 font-semibold">
                We Work · You Play · They Learn.
              </footer>
            </blockquote>
          </div>
        </motion.div>

        {/* Formats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs block mb-3">
              Workshop Formats
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-marine-900">
              Choose Your Format
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FORMATS.map((fmt, i) => (
              <motion.div
                key={fmt.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className={`${fmt.color} px-6 py-4`}>
                  <span className="text-white text-xs font-bold uppercase tracking-widest">{fmt.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-marine-900 text-lg mb-1">{fmt.name}</h3>
                  <p className="text-cyan-600 font-semibold text-sm mb-3">{fmt.audience}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{fmt.focus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why book */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-marine-900 rounded-3xl p-10 md:p-14 text-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs block mb-4">
              Why Book a Spike Workshop?
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              From "Guys with Buffers" to Certified Technicians
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Most detailing is learned through trial and error — usually at the expense of the boat's finish. Our workshops provide a Certificate of Practical Completion that marks the difference between guesswork and mastery.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              We provide the tools, the chemistry, and 30 years of documented IP. You provide the venue. Workshops are seasonal and fill quickly — reserve your date before the season begins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:4168905899"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25"
              >
                <Phone className="w-4 h-4" /> Call 416-890-5899
              </a>
              <a
                href="https://wa.me/14168905899"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold transition-all"
              >
                WhatsApp Spike
              </a>
            </div>
          </div>
        </motion.div>

        {/* Back link */}
        <div className="flex justify-center">
          <Link
            href="/our-services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-500 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Services
          </Link>
        </div>
      </div>
    </div>
  );
}
