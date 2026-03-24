import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useQuote } from "@/context/QuoteContext";
import PageMeta from "@/components/PageMeta";
import WorkshopBookingModal, { type WorkshopBookingModalProps } from "@/components/WorkshopBookingModal";
import CourseBookingModal, { type CourseBookingModalProps } from "@/components/CourseBookingModal";
import {
  ArrowLeft,
  GraduationCap,
  Video,
  Anchor,
  Users,
  ChevronDown,
  ChevronUp,
  X,
  Mic,
  CalendarDays,
  FlaskConical,
  Shield,
  Droplets,
  Sparkles,
} from "lucide-react";

// ─── Course data ────────────────────────────────────────────────
const COURSES_100 = [
  { number: "101", title: "Introduction to the Trade", tagline: "Start Your Journey in Marine Detailing", description: "A comprehensive overview of marine detailing, foundational skills, and the standards upheld by We Beautify Boats. Learn essential tools, safety measures, and eco-friendly practices, concluding with a Level 10 Meeting to foster open communication and feedback." },
  { number: "102", title: "Hull Services", tagline: "The Foundation of Every Vessel", description: "Dive into fundamental techniques of hull washing and polishing, focusing on eco-friendly practices. Hands-on training develops proficiency in restoring hulls, followed by a Level 10 Meeting to discuss and refine techniques." },
  { number: "103", title: "Bottom Prep and Antifouling", tagline: "Prepare for Protection", description: "Focuses on preparing bottoms for antifouling, covering sanding, cleaning, and material selection. Includes hands-on application and a Level 10 Meeting to share solutions for challenging pre-service conditions." },
  { number: "104", title: "Shrink Wrap Removal", tagline: "Efficient and Damage-Free", description: "Learn safe and efficient shrink wrap removal techniques, focusing on minimizing waste and avoiding tension-point damage. Concludes with a Level 10 Meeting to evaluate and share best practices." },
  { number: "105", title: "Deck Services", tagline: "Clean Decks, Happy Owners", description: "Explore techniques for maintaining spotless, protected decks. Covers surface cleaning, stain removal, and polishing, followed by a Level 10 Meeting for insights into enhancing quality." },
  { number: "106", title: "Interior Detailing", tagline: "Attention to Every Detail", description: "Focuses on deep cleaning and preserving vessel interiors, including fabrics, fixtures, and sensitive materials. Includes a Level 10 Meeting for collective learning." },
];

const COURSES_200 = [
  { number: "201", title: "Detailing Logistics and Career Development", tagline: "Charting Your Path in Marine Detailing", description: "Expand your understanding of detailing logistics, operational workflows, and navigating seasonal demands. Includes a detailed introduction to the Level 10 Meeting structure to improve communication and task coordination." },
  { number: "202", title: "Advanced Hull Services", tagline: "Perfection for the Toughest Hulls", description: "Advanced techniques for heavily oxidized, scratched, or stained hulls using professional-grade products. Participants will engage in a Level 10 Meeting to refine these advanced techniques." },
  { number: "203", title: "Bottom Prep and Advanced Coatings", tagline: "Professional Surface Preparation", description: "Master preparing vessel bottoms for advanced coatings under challenging conditions. Learn advanced sanding, cleaning, and antifouling application, finishing with a Level 10 Meeting to discuss application challenges." },
  { number: "204", title: "Specialized Deck Care", tagline: "Expertise in Deck Restoration", description: "Comprehensive training on restoring decks with significant wear, including teak deck maintenance and brightwork. Review challenges and progress in a Level 10 Meeting." },
  { number: "205", title: "Advanced Interior Detailing", tagline: "Transform Interiors with Precision", description: "Advanced interior cleaning and restoration for luxury vessels, focusing on delicate materials, tough odors, and challenging conditions, assessed via a Level 10 Meeting." },
  { number: "206", title: "Specialized Exterior Enhancements", tagline: "Polish and Protect Like a Pro", description: "Specialized exterior detailing including SiO2 coatings, wet sanding, and propeller polishing. Review techniques and strategies in a Level 10 Meeting." },
];

const COURSES_300 = [
  { number: "301", title: "Crew Leader Training", tagline: "Lead with Confidence and Precision", description: "Essential leadership skills, crew management, effective reporting, resource allocation, and logistical coordination to maintain high service standards." },
  { number: "302", title: "Brightwork Polishing", tagline: "Refining the Shine", description: "Advanced training in restoring and maintaining intricate metal surfaces and high-value brightwork to a mirror finish." },
  { number: "303", title: "Vinyl Recoloring", tagline: "Renew and Revive", description: "Techniques for recoloring and restoring vinyl surfaces to their original condition, addressing severe discoloration and UV wear." },
  { number: "304", title: "Engine Bay Cleaning", tagline: "Precision for the Heart of the Vessel", description: "Proper techniques for safely degreasing and maintaining engine bays, focusing on environmental safety and protecting sensitive components." },
  { number: "305", title: "Decal Removal", tagline: "A Clean Slate", description: "Master techniques for efficiently removing decals and baked-on graphics without damaging the underlying gelcoat." },
  { number: "306", title: "Tender Tube Detailing", tagline: "Attention to Every Vessel", description: "Training on cleaning, restoring, and applying protective coatings to inflatable tender tubes to ensure performance and appearance." },
  { number: "307", title: "Wood Refinishing: Exterior", tagline: "Reviving Natural Elegance", description: "Advanced techniques for restoring, sanding, and sealing exterior wood surfaces, emphasizing weather resistance and aesthetics." },
  { number: "308", title: "Wood Refinishing: Interior", tagline: "Craftsmanship for Luxury Interiors", description: "Learn how to clean, prep, and match stains to restore and enhance interior woodwork for luxury vessel aesthetics." },
  { number: "309", title: "Interior Detailing Level 4: Mold and Pest Control", tagline: "Safety and Cleanliness Above All", description: "Training to safely identify, treat, and prevent mold and pest infestations within vessel interiors, including ozone and specialty treatments." },
  { number: "310", title: "Deck Wash Level 4: Fallout Wash", tagline: "Deep Cleaning for Heavy Fallout", description: "Advanced deck washing techniques for handling severe environmental contaminants and safely cleaning canvas systems." },
];

// ─── Static content ──────────────────────────────────────────────
const CURRICULUM = [
  { icon: FlaskConical, title: "Substrate Integrity Analysis", desc: "Learn to read gelcoat, paint, and composite surfaces before the buffer touches the boat. Understanding what you're working with is the foundation of every great finish." },
  { icon: Sparkles, title: "Compound & Polish Chemistry", desc: "Oxidation dynamics, pad selection, and liquid formulation for Great Lakes freshwater conditions. Know why each product does what it does — not just how to apply it." },
  { icon: Shield, title: "Systematic Quality Control", desc: "Implementing the Predictive Buffer Workflow to achieve mirror finishes consistently — without holograms, burn-through, or avoidable rework." },
  { icon: Droplets, title: "Environmental Impact Reduction", desc: "Professional waste-water recycling and eco-conscious chemical application that protects Ontario's freshwater lakes while keeping your operation marina-compliant." },
  { icon: GraduationCap, title: "Safe Vinyl & Brightwork Recovery", desc: "Specialized modules for tender tube detailing, metal polishing, and vinyl recoloring — the high-visibility work that separates a good crew from a great one." },
];

const FORMATS: Array<WorkshopBookingModalProps["workshop"] & { color: string }> = [
  {
    name: "The Marina Pro-Series",
    tag: "Professional",
    audience: "Staff & Crews",
    description: "Built for efficiency, workflow optimization, and crew leadership. Designed for professional marina teams and detailing crews serving multiple vessels at scale. Your staff will learn to read surfaces before a buffer ever touches a boat, implementing systematic quality control and our Predictive Buffer Workflow to eliminate guesswork.",
    color: "bg-cyan-500",
    stripeLink: "https://buy.stripe.com/aFa4gA0zLd6H24T1xX0kE00",
    paypalLink: "https://paypal.me/spikeonthewater/250",
  },
  {
    name: 'Yacht Club "Owner\'s Day"',
    tag: "Owner",
    audience: "Private Owners",
    description: "Bring 30 years of recreational marine expertise directly to your yacht club members. Owners will learn the critical difference between cosmetic appearance and true asset preservation, how to perform safe eco-conscious maintenance, and exactly when to use routine care versus when to call a professional.",
    color: "bg-purple-500",
    stripeLink: "https://buy.stripe.com/aFa4gA0zLd6H24T1xX0kE00",
    paypalLink: "https://paypal.me/spikeonthewater/250",
  },
  {
    name: "The Restoration Masterclass",
    tag: "Advanced",
    audience: "Advanced Technicians",
    description: "For experienced hands ready to operate at the highest level. This technical masterclass covers Level 5 surface correction — wet sanding to safely level heavily degraded gelcoat, spot repairs, and the application of Spike's PT (PPS Technology®) to fuse long-lasting PTFE protection to marine surfaces. Transforming technicians into true craftsmen.",
    color: "bg-marine-900",
    stripeLink: "https://buy.stripe.com/aFa4gA0zLd6H24T1xX0kE00",
    paypalLink: "https://paypal.me/spikeonthewater/250",
  },
];

const SERIES = [
  {
    number: "100", title: "Fundamentals of Marine Detailing", subtitle: "Start Your Journey in Marine Detailing",
    format: "Hybrid — Online Theory & On-the-Water Practical",
    img: "workshop-100-series.png",
    skills: ["Safe chemical handling & product selection", "Surface reading: gelcoat, paint & composites", "Basic compound & polish application", "Seasonal maintenance fundamentals", "Tool safety & buffer orientation"],
    cert: "Certificate of Practical Completion — 100 Series",
    tag: "Entry Level", color: "bg-cyan-500", accentColor: "bg-cyan-600", labelColor: "text-cyan-500",
    courses: COURSES_100,
  },
  {
    number: "200", title: "Advanced Marine Detailing Theory", subtitle: "Comprehensive Online Learning Platform",
    format: "Online Theory Only (200) · On-the-Water Practical (201)",
    img: "workshop-200-series.png",
    skills: ["Compound & Polish Chemistry", "Oxidation Dynamics", "Gelcoat & Paint Substrates", "Buffer & Pad Selections", "Business of Detailing — pricing, contracts & client communication"],
    cert: "Certificate of Theoretical Completion — 200 Series",
    tag: "Theory & Science", color: "bg-purple-600", accentColor: "bg-purple-600", labelColor: "text-purple-500",
    courses: COURSES_200,
  },
  {
    number: "300", title: "Advanced Marine Detailing & Crew Management", subtitle: "Comprehensive Practical Training — Advanced Modules",
    format: "Hands-on Practical Only",
    img: "workshop-300-series.png",
    skills: ["Mirror Brightwork Finish & Degreasing Engine Bays", "Tender Tube Detailing & Heavy Fallout Deck Wash", "Safe Vinyl Recoloring & Safe Decal Removal", "Wet Sanding, Spot Repairs & Advanced Finish Restore", "Level 4 Interior Mold & Pest Remediation"],
    cert: "Certificate of Practical Completion — 300 Series",
    tag: "Advanced Practical", color: "bg-marine-900", accentColor: "bg-marine-900", labelColor: "text-marine-900",
    courses: COURSES_300,
  },
];

const L10_STEPS = [
  { time: "5 mins", title: "Segue / Wins", desc: "Share a recent detailing victory or positive client feedback." },
  { time: "5 mins", title: "Scorecard", desc: "Review standard times for tasks (e.g., timing a Level 1 Deck Wash)." },
  { time: "5 mins", title: "Headlines", desc: "Quick updates on marina regulations, environmental compliance, or crew logistics." },
  { time: "5 mins", title: "To-Do List", desc: "Review any carry-over action items from previous training." },
  { time: "20 mins", title: "IDS — Identify, Discuss, Solve", desc: "The core of the L10. Participants bring up specific pre-service conditions (e.g., failing antifoul, heavy oxidation, surface memory) and the group discusses and solves the approach using the Level 1–5 service matrix." },
  { time: "5 mins", title: "Conclude", desc: "Recap the solved issues and rate the meeting." },
];

// ─── Sub-components ──────────────────────────────────────────────
function CourseCard({
  course,
  accentColor,
  seriesNumber,
  seriesColor,
  onBook,
}: {
  course: typeof COURSES_100[0];
  accentColor: string;
  seriesNumber: string;
  seriesColor: string;
  onBook: (course: typeof COURSES_100[0], sessionType: "online" | "inperson") => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`${accentColor} px-5 py-3 flex items-center justify-between`}>
        <span className="text-white font-black text-lg font-display">{course.number}</span>
        <span className="text-white/75 text-xs font-semibold uppercase tracking-widest">Module</span>
      </div>
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-display font-bold text-marine-900 text-sm leading-snug">{course.title}</h3>
          <p className="text-cyan-600 text-xs font-semibold mt-0.5">{course.tagline}</p>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-muted-foreground leading-relaxed"
            >
              {course.description}
            </motion.p>
          )}
        </AnimatePresence>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-500 transition-colors"
        >
          {expanded ? <><ChevronUp className="w-3.5 h-3.5" /> Less</> : <><ChevronDown className="w-3.5 h-3.5" /> Read More</>}
        </button>
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={() => onBook(course, "online")}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-cyan-200 bg-cyan-50 text-cyan-700 text-xs font-bold hover:bg-cyan-100 hover:border-cyan-300 transition-all"
          >
            <Video className="w-3 h-3" /> Book Online · Google Meet
          </button>
          <button
            onClick={() => onBook(course, "inperson")}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-marine-200 bg-marine-50 text-marine-900 text-xs font-bold hover:bg-marine-100 transition-all"
          >
            <Anchor className="w-3 h-3" /> Book In-Person · $250
          </button>
        </div>
      </div>
    </div>
  );
}

function L10Modal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="bg-marine-900 rounded-t-3xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-1">Built Into Every Session</span>
              <h2 className="text-2xl font-display font-bold">L10 Meeting Structure</h2>
              <p className="text-gray-300 text-sm mt-1">The Kaizen framework at the close of each workshop — 45 minutes total.</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors ml-4 shrink-0"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {L10_STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 font-black text-sm">{i + 1}</div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display font-bold text-marine-900 text-sm">{step.title}</h3>
                  <span className="text-xs font-semibold text-white bg-cyan-500 px-2 py-0.5 rounded-full">{step.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────
export default function Workshops() {
  const { openQuote } = useQuote();
  const [showL10, setShowL10] = useState(false);
  const [expandedSeries, setExpandedSeries] = useState<string | null>(null);
  const [activeBooking, setActiveBooking] = useState<WorkshopBookingModalProps["workshop"] | null>(null);
  const [activeCourse, setActiveCourse] = useState<CourseBookingModalProps | null>(null);

  const toggleSeries = (number: string) =>
    setExpandedSeries((prev) => (prev === number ? null : number));

  function openCourseBooking(
    series: typeof SERIES[0],
    course: typeof COURSES_100[0],
    sessionType: "online" | "inperson"
  ) {
    setActiveCourse({
      course,
      seriesNumber: series.number,
      seriesColor: series.color,
      initialSessionType: sessionType,
      onClose: () => setActiveCourse(null),
    });
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageMeta
        title="Workshops & Training | Spike On The Water (Ontario)"
        description="Marine detailing education for boat owners and professionals — 100, 200, and 300 series courses. Marina Pro-Series, Owner's Day, and Restoration Masterclass. $250 CAD. Call 416-890-5899."
        path="/workshops"
      />

      <AnimatePresence>
        {showL10 && <L10Modal onClose={() => setShowL10(false)} />}
        {activeBooking && <WorkshopBookingModal workshop={activeBooking} onClose={() => setActiveBooking(null)} />}
        {activeCourse && <CourseBookingModal {...activeCourse} />}
      </AnimatePresence>

      {/* Hero */}
      <div className="bg-marine-900 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/service-workshops.png)` }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto relative z-10">
          <Link href="/our-services" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-4 h-4" /> Workshops & Training
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Better Care, Better Boating
          </h1>
          <p className="text-xl text-cyan-100/80 font-light leading-relaxed max-w-2xl mx-auto mb-6">
            Bring 30 years of recreational marine expertise directly to your dock. Hands-on workshops for yacht clubs, marina staff, and dedicated owner-operators who want to master the Ontario Standard of marine preservation.
          </p>
          <button onClick={() => setShowL10(true)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 text-sm font-semibold transition-colors">
            <CalendarDays className="w-4 h-4" /> View L10 Meeting Structure
          </button>
        </motion.div>
      </div>

      {/* Hybrid Learning Banner */}
      <div className="bg-cyan-600 text-white py-5 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Video className="w-5 h-5" /></div>
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-100">Online Theory</p>
              <p className="font-display font-bold text-lg">45 Minutes · Google Meet</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/30" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Anchor className="w-5 h-5" /></div>
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-100">In-Person Practical</p>
              <p className="font-display font-bold text-lg">3 Hours · On-the-Water</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/30" />
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-bold">Hybrid Learning Format</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 space-y-24">

        {/* Pricing */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs block mb-3">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-marine-900">Simple, Transparent Rates</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-border rounded-2xl p-8 text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center mx-auto mb-4"><Video className="w-6 h-6 text-cyan-600" /></div>
              <h3 className="font-display font-bold text-marine-900 text-xl mb-1">Online Attendance</h3>
              <p className="text-4xl font-black text-cyan-500 my-4">FREE</p>
              <p className="text-sm text-muted-foreground">45-minute Google Meet theory session open to anyone.</p>
            </div>
            <div className="bg-marine-900 border-2 border-marine-900 rounded-2xl p-8 text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-cyan-400" />
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4"><Anchor className="w-6 h-6 text-cyan-400" /></div>
              <h3 className="font-display font-bold text-white text-xl mb-1">In-Person Practical</h3>
              <p className="text-4xl font-black text-cyan-400 my-4">$250 <span className="text-lg font-semibold text-gray-400">CAD</span></p>
              <p className="text-sm text-gray-300">3-hour hands-on practical at the dock. Seasonal availability.</p>
            </div>
            <div className="bg-white border-2 border-border rounded-2xl p-8 text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4"><Users className="w-6 h-6 text-purple-600" /></div>
              <h3 className="font-display font-bold text-marine-900 text-xl mb-1">WBB Full-Time Crew</h3>
              <p className="text-4xl font-black text-purple-500 my-4">FREE</p>
              <p className="text-sm text-muted-foreground">Online & In-Person — both formats at no cost for full-time crew.</p>
            </div>
          </div>
        </motion.div>

        {/* Curriculum */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
            <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs block mb-3">The Curriculum</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-marine-900">From Science to Surface</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Our workshops move beyond basic cleaning. We dive into the technical intellectual property required to maintain hull integrity and long-term resale value.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURRICULUM.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center mb-4"><item.icon className="w-5 h-5 text-cyan-600" /></div>
                <h3 className="font-display font-bold text-marine-900 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Workshop image */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-2xl aspect-[16/7] relative">
          <img src={`${import.meta.env.BASE_URL}images/service-workshops.png`} alt="Better Care, Better Boating — a community workshop with We Beautify Boats" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-marine-900/60 to-transparent flex items-end p-10">
            <blockquote className="text-white max-w-2xl">
              <p className="text-xl md:text-2xl font-display font-bold leading-relaxed">"The snow has not slowed us down. Don't wait until May to upskill your crew."</p>
              <footer className="mt-3 text-cyan-300 font-semibold">We Work · You Play · They Learn.</footer>
            </blockquote>
          </div>
        </motion.div>

        {/* Boat Owner Workshop Formats */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
            <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs block mb-3">Boat Owner Workshops</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-marine-900">Choose Your Format</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FORMATS.map((fmt, i) => (
              <motion.div key={fmt.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                <div className={`${fmt.color} px-6 py-4`}><span className="text-white text-xs font-bold uppercase tracking-widest">{fmt.tag}</span></div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-marine-900 text-lg mb-1">{fmt.name}</h3>
                  <p className="text-cyan-600 font-semibold text-sm mb-3">{fmt.audience}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{fmt.description}</p>
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-bold text-marine-900">$250 CAD + HST</span>
                    <button
                      onClick={() => setActiveBooking(fmt)}
                      className={`px-5 py-2 rounded-full ${fmt.color} text-white text-xs font-bold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-md`}
                    >
                      Book Now →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Course Series — with expandable module drawers */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
            <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs block mb-3">Structured Learning Path</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-marine-900">The Course Series</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">From your first day on the dock to running a crew — three progressively advanced series, each earning a certificate.</p>
          </div>
          <div className="space-y-16">
            {SERIES.map((series, index) => (
              <motion.div key={series.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                {/* Series content — original alternating layout */}
                <div className={`flex flex-col lg:flex-row gap-10 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                  <div className="w-full lg:w-2/5 shrink-0">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square">
                      <img src={`${import.meta.env.BASE_URL}images/${series.img}`} alt={`${series.number} Series: ${series.title}`} className="w-full h-full object-cover" />
                      <div className={`absolute top-4 left-4 ${series.color} text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full`}>{series.tag}</div>
                    </div>
                  </div>
                  <div className="w-full lg:w-3/5 space-y-5">
                    <div className="text-7xl font-display font-bold opacity-10 text-marine-900 leading-none">{series.number}</div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-marine-900 -mt-4">{series.number} Series: {series.title}</h3>
                    <p className="text-cyan-600 font-semibold">{series.subtitle}</p>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{series.format}</p>
                    <ul className="space-y-2.5">
                      {series.skills.map((skill) => (
                        <li key={skill} className="flex items-start gap-3">
                          <span className={`mt-1.5 w-2 h-2 rounded-full ${series.color} shrink-0`} />
                          <span className="text-marine-800">{skill}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-4 py-2 rounded-full">
                      <GraduationCap className="w-3.5 h-3.5" /> {series.cert}
                    </div>

                    {/* Expand modules button */}
                    <div className="pt-2">
                      <button
                        onClick={() => toggleSeries(series.number)}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-semibold text-sm transition-all ${
                          expandedSeries === series.number
                            ? `${series.color} text-white border-transparent`
                            : `border-current ${series.labelColor} hover:bg-gray-50`
                        }`}
                      >
                        {expandedSeries === series.number ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        {expandedSeries === series.number ? "Hide Modules" : `View All ${series.courses.length} Modules`}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expandable course cards drawer */}
                <AnimatePresence>
                  {expandedSeries === series.number && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-8 pt-8 border-t border-border">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
                          {series.number} Series — All Modules
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {series.courses.map((course) => (
                            <CourseCard
                              key={course.number}
                              course={course}
                              accentColor={series.accentColor}
                              seriesNumber={series.number}
                              seriesColor={series.color}
                              onBook={(c, st) => openCourseBooking(series, c, st)}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Schedule — Google Calendar Embed */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-8">
            <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs block mb-3">Live Schedule</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-marine-900">Session Calendar</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              See all confirmed sessions, availability, and booked time slots in real time. When you book a module the event appears here within minutes.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden border-2 border-border shadow-lg bg-white">
            <div className="bg-marine-900 px-6 py-4 flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-display font-bold">Spike On The Water — Workshop & Course Schedule</span>
              <span className="ml-auto text-cyan-300 text-xs font-semibold">America/Toronto</span>
            </div>
            <div className="relative" style={{ paddingBottom: "56.25%", minHeight: 480 }}>
              <iframe
                src="https://calendar.google.com/calendar/embed?src=spikeonthewater%40gmail.com&ctz=America%2FToronto&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&mode=WEEK"
                className="absolute inset-0 w-full h-full border-0"
                title="Spike On The Water Workshop & Course Schedule"
                loading="lazy"
              />
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
              Live — updates within minutes of each booking
            </div>
          </div>
        </motion.div>

        {/* Recording Disclaimer */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center shrink-0 mt-0.5"><Mic className="w-5 h-5 text-amber-800" /></div>
          <div>
            <h3 className="font-display font-bold text-amber-900 mb-1">Mandatory Recording Disclaimer</h3>
            <p className="text-sm text-amber-800 leading-relaxed">By registering for this workshop, you acknowledge and consent that all sessions (both 45-minute online Google Meets and 3-hour in-person practicals) will be recorded. These recordings will be published to the{" "}<a href="https://www.youtube.com/@SpikeOnTheWater" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 hover:text-amber-900">Spike On The Water YouTube channel</a>{" "}to promote shared knowledge and community learning.</p>
          </div>
        </motion.div>

        {/* Why book CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-marine-900 rounded-3xl p-10 md:p-14 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs block mb-4">Why Book a Spike Workshop?</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">From "Boat Owners with Buffers" to Certified Technicians</h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">Most detailing is learned through trial and error — usually at the expense of the boat's finish. Our workshops provide a Certificate of Practical Completion that marks the difference between guesswork and mastery.</p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Every session closes with the{" "}
              <button onClick={() => setShowL10(true)} className="text-cyan-400 font-semibold hover:text-cyan-300 underline underline-offset-2 transition-colors">L10 Meeting Structure</button>
              {" "}— a Kaizen framework that turns observations into evidence-based action. We provide the tools, the chemistry, and 30 years of documented IP. All in-person courses are <strong>$250 CAD</strong> — workshops are seasonal and fill quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => openQuote("workshops")} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25">
                <GraduationCap className="w-4 h-4" /> Book a Workshop
              </button>
              <a href="https://wa.me/14168905899" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold transition-all">
                WhatsApp Spike
              </a>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <Link href="/our-services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-500 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to All Services
          </Link>
        </div>
      </div>
    </div>
  );
}
