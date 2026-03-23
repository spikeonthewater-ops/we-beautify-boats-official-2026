import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useQuote } from "@/context/QuoteContext";
import PageMeta from "@/components/PageMeta";
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
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

const COURSES_100 = [
  {
    number: "101",
    title: "Introduction to the Trade",
    tagline: "Start Your Journey in Marine Detailing",
    description:
      "A comprehensive overview of marine detailing, foundational skills, and the standards upheld by We Beautify Boats. Learn essential tools, safety measures, and eco-friendly practices, concluding with a Level 10 Meeting to foster open communication and feedback.",
  },
  {
    number: "102",
    title: "Hull Services",
    tagline: "The Foundation of Every Vessel",
    description:
      "Dive into fundamental techniques of hull washing and polishing, focusing on eco-friendly practices. Hands-on training develops proficiency in restoring hulls, followed by a Level 10 Meeting to discuss and refine techniques.",
  },
  {
    number: "103",
    title: "Bottom Prep and Antifouling",
    tagline: "Prepare for Protection",
    description:
      "Focuses on preparing bottoms for antifouling, covering sanding, cleaning, and material selection. Includes hands-on application and a Level 10 Meeting to share solutions for challenging pre-service conditions.",
  },
  {
    number: "104",
    title: "Shrink Wrap Removal",
    tagline: "Efficient and Damage-Free",
    description:
      "Learn safe and efficient shrink wrap removal techniques, focusing on minimizing waste and avoiding tension-point damage. Concludes with a Level 10 Meeting to evaluate and share best practices.",
  },
  {
    number: "105",
    title: "Deck Services",
    tagline: "Clean Decks, Happy Owners",
    description:
      "Explore techniques for maintaining spotless, protected decks. Covers surface cleaning, stain removal, and polishing, followed by a Level 10 Meeting for insights into enhancing quality.",
  },
  {
    number: "106",
    title: "Interior Detailing",
    tagline: "Attention to Every Detail",
    description:
      "Focuses on deep cleaning and preserving vessel interiors, including fabrics, fixtures, and sensitive materials. Includes a Level 10 Meeting for collective learning.",
  },
];

const COURSES_200 = [
  {
    number: "201",
    title: "Detailing Logistics and Career Development",
    tagline: "Charting Your Path in Marine Detailing",
    description:
      "Expand your understanding of detailing logistics, operational workflows, and navigating seasonal demands. Includes a detailed introduction to the Level 10 Meeting structure to improve communication and task coordination.",
  },
  {
    number: "202",
    title: "Advanced Hull Services",
    tagline: "Perfection for the Toughest Hulls",
    description:
      "Advanced techniques for heavily oxidized, scratched, or stained hulls using professional-grade products. Participants will engage in a Level 10 Meeting to refine these advanced techniques.",
  },
  {
    number: "203",
    title: "Bottom Prep and Advanced Coatings",
    tagline: "Professional Surface Preparation",
    description:
      "Master preparing vessel bottoms for advanced coatings under challenging conditions. Learn advanced sanding, cleaning, and antifouling application, finishing with a Level 10 Meeting to discuss application challenges.",
  },
  {
    number: "204",
    title: "Specialized Deck Care",
    tagline: "Expertise in Deck Restoration",
    description:
      "Comprehensive training on restoring decks with significant wear, including teak deck maintenance and brightwork. Review challenges and progress in a Level 10 Meeting.",
  },
  {
    number: "205",
    title: "Advanced Interior Detailing",
    tagline: "Transform Interiors with Precision",
    description:
      "Advanced interior cleaning and restoration for luxury vessels, focusing on delicate materials, tough odors, and challenging conditions, assessed via a Level 10 Meeting.",
  },
  {
    number: "206",
    title: "Specialized Exterior Enhancements",
    tagline: "Polish and Protect Like a Pro",
    description:
      "Specialized exterior detailing including SiO2 coatings, wet sanding, and propeller polishing. Review techniques and strategies in a Level 10 Meeting.",
  },
];

const COURSES_300 = [
  {
    number: "301",
    title: "Crew Leader Training",
    tagline: "Lead with Confidence and Precision",
    description:
      "Essential leadership skills, crew management, effective reporting, resource allocation, and logistical coordination to maintain high service standards.",
  },
  {
    number: "302",
    title: "Brightwork Polishing",
    tagline: "Refining the Shine",
    description:
      "Advanced training in restoring and maintaining intricate metal surfaces and high-value brightwork to a mirror finish.",
  },
  {
    number: "303",
    title: "Vinyl Recoloring",
    tagline: "Renew and Revive",
    description:
      "Techniques for recoloring and restoring vinyl surfaces to their original condition, addressing severe discoloration and UV wear.",
  },
  {
    number: "304",
    title: "Engine Bay Cleaning",
    tagline: "Precision for the Heart of the Vessel",
    description:
      "Proper techniques for safely degreasing and maintaining engine bays, focusing on environmental safety and protecting sensitive components.",
  },
  {
    number: "305",
    title: "Decal Removal",
    tagline: "A Clean Slate",
    description:
      "Master techniques for efficiently removing decals and baked-on graphics without damaging the underlying gelcoat.",
  },
  {
    number: "306",
    title: "Tender Tube Detailing",
    tagline: "Attention to Every Vessel",
    description:
      "Training on cleaning, restoring, and applying protective coatings to inflatable tender tubes to ensure performance and appearance.",
  },
  {
    number: "307",
    title: "Wood Refinishing: Exterior",
    tagline: "Reviving Natural Elegance",
    description:
      "Advanced techniques for restoring, sanding, and sealing exterior wood surfaces, emphasizing weather resistance and aesthetics.",
  },
  {
    number: "308",
    title: "Wood Refinishing: Interior",
    tagline: "Craftsmanship for Luxury Interiors",
    description:
      "Learn how to clean, prep, and match stains to restore and enhance interior woodwork for luxury vessel aesthetics.",
  },
  {
    number: "309",
    title: "Interior Detailing Level 4: Mold and Pest Control",
    tagline: "Safety and Cleanliness Above All",
    description:
      "Training to safely identify, treat, and prevent mold and pest infestations within vessel interiors, including ozone and specialty treatments.",
  },
  {
    number: "310",
    title: "Deck Wash Level 4: Fallout Wash",
    tagline: "Deep Cleaning for Heavy Fallout",
    description:
      "Advanced deck washing techniques for handling severe environmental contaminants and safely cleaning canvas systems.",
  },
];

const L10_STEPS = [
  {
    time: "5 mins",
    title: "Segue / Wins",
    desc: "Share a recent detailing victory or positive client feedback.",
  },
  {
    time: "5 mins",
    title: "Scorecard",
    desc: "Review standard times for tasks (e.g., timing a Level 1 Deck Wash).",
  },
  {
    time: "5 mins",
    title: "Headlines",
    desc: "Quick updates on marina regulations, environmental compliance, or crew logistics.",
  },
  {
    time: "5 mins",
    title: "To-Do List",
    desc: "Review any carry-over action items from previous training.",
  },
  {
    time: "20 mins",
    title: "IDS — Identify, Discuss, Solve",
    desc: "The core of the L10. Participants bring up specific pre-service conditions (e.g., failing antifoul, heavy oxidation, surface memory) and the group discusses and solves the approach using the Level 1–5 service matrix.",
  },
  {
    time: "5 mins",
    title: "Conclude",
    desc: "Recap the solved issues and rate the meeting.",
  },
];

function CourseCard({ course, accentColor }: { course: typeof COURSES_100[0]; accentColor: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`${accentColor} px-5 py-3 flex items-center justify-between`}>
        <span className="text-white font-black text-lg font-display">{course.number}</span>
        <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">
          Boat Detailing {course.number}
        </span>
      </div>
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-display font-bold text-marine-900 text-base leading-snug">{course.title}</h3>
          <p className="text-cyan-600 text-sm font-semibold mt-0.5">{course.tagline}</p>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {course.description}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-500 transition-colors"
        >
          {expanded ? (
            <>Less <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>Read More <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <a
            href={`/booking?course=${course.number}&type=online`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-cyan-500 text-cyan-600 hover:bg-cyan-50 text-xs font-bold transition-colors"
          >
            <Video className="w-3.5 h-3.5" /> Book Online Theory
          </a>
          <a
            href={`/booking?course=${course.number}&type=inperson`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-marine-900 hover:bg-marine-800 text-white text-xs font-bold transition-colors"
          >
            <Anchor className="w-3.5 h-3.5" /> Book In-Person
          </a>
        </div>
      </div>
    </div>
  );
}

function L10Modal({ onClose }: { onClose: () => void }) {
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
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-marine-900 rounded-t-3xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-1">
                Built Into Every Session
              </span>
              <h2 className="text-2xl font-display font-bold">L10 Meeting Structure</h2>
              <p className="text-gray-300 text-sm mt-1">The Kaizen framework used at the close of each workshop — 45 minutes total.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors ml-4 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {L10_STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 font-black text-sm">
                {i + 1}
              </div>
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

export default function Workshops() {
  const { openQuote } = useQuote();
  const [showL10, setShowL10] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageMeta
        title="Workshops & Training | Spike On The Water (Ontario)"
        description="Marine detailing education for boat owners and professionals — 100, 200, and 300 series courses. Marina Pro-Series, Owner's Day, and Restoration Masterclass. $250 CAD. Call 416-890-5899."
        path="/workshops"
      />

      <AnimatePresence>
        {showL10 && <L10Modal onClose={() => setShowL10(false)} />}
      </AnimatePresence>

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            From Science to Surface
          </h1>
          <p className="text-xl text-cyan-100/80 font-light leading-relaxed max-w-2xl mx-auto mb-6">
            Our workshops move beyond basic cleaning. Bring 30 years of recreational marine expertise directly to your dock — the Ontario Standard of marine preservation.
          </p>
          <button
            onClick={() => setShowL10(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 text-sm font-semibold transition-colors"
          >
            <CalendarDays className="w-4 h-4" /> View L10 Meeting Structure
          </button>
        </motion.div>
      </div>

      {/* Hybrid Learning Banner */}
      <div className="bg-cyan-600 text-white py-5 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-100">Online Theory</p>
              <p className="font-display font-bold text-lg">45 Minutes · Google Meet</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/30" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-100">In-Person Practical</p>
              <p className="font-display font-bold text-lg">3 Hours · On-the-Water</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/30" />
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
            Hybrid Learning Format
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs block mb-3">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-marine-900">Simple, Transparent Rates</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-border rounded-2xl p-8 text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-display font-bold text-marine-900 text-xl mb-1">Online Attendance</h3>
              <p className="text-4xl font-black text-cyan-500 my-4">FREE</p>
              <p className="text-sm text-muted-foreground">45-minute Google Meet theory session open to anyone.</p>
            </div>
            <div className="bg-marine-900 border-2 border-marine-900 rounded-2xl p-8 text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-cyan-400" />
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Anchor className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-1">In-Person Practical</h3>
              <p className="text-4xl font-black text-cyan-400 my-4">$250 <span className="text-lg font-semibold text-gray-400">CAD</span></p>
              <p className="text-sm text-gray-300">3-hour hands-on practical at the dock. Fills quickly — seasonal availability.</p>
            </div>
            <div className="bg-white border-2 border-border rounded-2xl p-8 text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-display font-bold text-marine-900 text-xl mb-1">WBB Full-Time Crew</h3>
              <p className="text-4xl font-black text-purple-500 my-4">FREE</p>
              <p className="text-sm text-muted-foreground">Online & In-Person — both formats at no cost for full-time We Beautify Boats crew members.</p>
            </div>
          </div>
        </motion.div>

        {/* 100 Series */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-end gap-4 mb-8 border-b border-border pb-4">
            <span className="text-8xl font-black font-display text-cyan-500/15 leading-none select-none">100</span>
            <div className="-mb-1">
              <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs block mb-1">100 Series</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-marine-900">Fundamentals of Marine Detailing</h2>
              <p className="text-muted-foreground text-sm">Start Your Journey in Marine Detailing</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSES_100.map((course) => (
              <CourseCard key={course.number} course={course} accentColor="bg-cyan-600" />
            ))}
          </div>
        </motion.div>

        {/* 200 Series */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-end gap-4 mb-8 border-b border-border pb-4">
            <span className="text-8xl font-black font-display text-purple-500/15 leading-none select-none">200</span>
            <div className="-mb-1">
              <span className="text-purple-500 font-bold uppercase tracking-widest text-xs block mb-1">200 Series</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-marine-900">Advanced Marine Detailing Theory</h2>
              <p className="text-muted-foreground text-sm">Theory & Science</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSES_200.map((course) => (
              <CourseCard key={course.number} course={course} accentColor="bg-purple-600" />
            ))}
          </div>
        </motion.div>

        {/* 300 Series */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-end gap-4 mb-8 border-b border-border pb-4">
            <span className="text-8xl font-black font-display text-marine-900/10 leading-none select-none">300</span>
            <div className="-mb-1">
              <span className="text-marine-900 font-bold uppercase tracking-widest text-xs block mb-1">300 Series</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-marine-900">Advanced Marine Detailing & Crew Management</h2>
              <p className="text-muted-foreground text-sm">Leadership & Advanced Practical</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSES_300.map((course) => (
              <CourseCard key={course.number} course={course} accentColor="bg-marine-900" />
            ))}
          </div>
        </motion.div>

        {/* Recording Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 flex gap-4 items-start"
        >
          <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center shrink-0 mt-0.5">
            <Mic className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <h3 className="font-display font-bold text-amber-900 mb-1">Mandatory Recording Disclaimer</h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              By registering for this workshop, you acknowledge and consent that all sessions (both 45-minute online Google Meets and 3-hour in-person practicals) will be recorded. These recordings will be published to the Spike On The Water YouTube channel to promote shared knowledge and community learning.
            </p>
          </div>
        </motion.div>

        {/* L10 CTA */}
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
              From "Boat Owners with Buffers" to Certified Technicians
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              Most detailing is learned through trial and error — usually at the expense of the boat's finish. Our workshops provide a Certificate of Practical Completion that marks the difference between guesswork and mastery.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Every session closes with the <button onClick={() => setShowL10(true)} className="text-cyan-400 font-semibold hover:text-cyan-300 underline underline-offset-2 transition-colors">L10 Meeting Structure</button> — a 45-minute Kaizen framework that turns observations into evidence-based action. We provide the tools, the chemistry, and 30 years of documented IP. You provide the venue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openQuote("workshops")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25"
              >
                <GraduationCap className="w-4 h-4" /> Book a Workshop
              </button>
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
