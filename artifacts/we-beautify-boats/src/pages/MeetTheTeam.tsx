import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Clock, Anchor } from "lucide-react";

const ROLES = [
  {
    title: "Crew Lead",
    subtitle: "Field Execution + Quality Control",
    desc: "Responsible for execution excellence on-site. Ensures services are delivered to We Beautify Boats standards. Trains and mentors technicians (Kaizen in action)."
  },
  {
    title: "Deck & Exterior Technician",
    subtitle: "Non-Skid / Teak / Trim",
    desc: "Executes all exterior services with excellence — from washdowns to multi-stage hull restorations. Master of gelcoat correction and protection."
  },
  {
    title: "Interior Technician",
    subtitle: "Interior + Precision Systems",
    desc: "Specializes in the meticulous cleaning and restoration of cabin interiors, leathers, fabrics, and climate control vents."
  },
  {
    title: "Logistics & Site Safety Lead",
    subtitle: "Mobile Deployment + Site Control",
    desc: "Manages equipment, site safety protocols, and Clean Marine practices ensuring no uncontrolled runoff at the marina."
  }
];

export default function MeetTheTeam() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-marine-900">
        {/* Full-bleed team photo */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/team-header.jpeg`}
            alt="We Beautify Boats crew working together on Some Nice III"
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient overlays: subtle top darkening + strong bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-marine-900/50 via-transparent to-marine-900/90" />
          <div className="absolute inset-0 bg-marine-900/20" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-36">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-bold uppercase tracking-widest text-xs block mb-4"
          >
            The Crew
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight"
          >
            The Team Behind<br className="hidden md:block" /> the Shine
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-lg md:text-xl text-gray-200 leading-relaxed font-light max-w-2xl"
          >
            "We don't run a 'boat cleaning crew.' We run a marine service system — delivered by trained technicians working inside strict scopes, safety standards, and quality control."
          </motion.p>
        </div>
      </section>

      {/* Spike Bio */}
      <section className="py-24 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={`${import.meta.env.BASE_URL}images/team-header.jpeg`}
                  alt="Spike — Founder of We Beautify Boats"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Stats badge */}
              <div className="absolute -bottom-6 -right-6 bg-marine-900 text-white rounded-2xl px-6 py-5 shadow-2xl">
                <p className="text-4xl font-display font-bold text-cyan-400">25+</p>
                <p className="text-xs text-gray-300 uppercase tracking-widest mt-1">Years on the water</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-cyan-600 font-bold uppercase tracking-widest text-xs block mb-4">Founder & Lead Technician</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-marine-900 mb-2 leading-tight">Spike</h2>
              <p className="text-muted-foreground text-sm mb-8 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-500" /> Ontario, Canada &nbsp;·&nbsp;
                <Anchor className="w-4 h-4 text-cyan-500" /> Mobile Marine Detailing &nbsp;·&nbsp;
                <Clock className="w-4 h-4 text-cyan-500" /> Since 2012
              </p>

              <div className="space-y-5 text-[17px] leading-relaxed text-foreground/80">
                <p>
                  I started We Beautify Boats because I saw a gap: boat owners who genuinely cared about their vessels but couldn't find a service that matched that care. Most detailing operations were either too generic, too expensive to justify, or showed up and washed without thinking. I knew there was a better way.
                </p>
                <p>
                  With over 25 years spent around boats — on the water, under them, inside them, and restoring them — I built a service system around how I'd want my own boat treated. That means documented service levels, measured outcomes, no guesswork, and no cutting corners because no one's watching.
                </p>
                <p>
                  We work across Lake Ontario's marinas from Toronto to Hamilton. Every service I perform or oversee is structured, intentional, and honest. When we're done, the boat looks right — and I can explain exactly why.
                </p>
                <p className="text-marine-900 font-semibold">
                  "I don't just clean boats. I read them. Every surface tells a story about how it was cared for — and what it needs next."
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  { num: "500+", label: "Boats serviced" },
                  { num: "12+", label: "Marinas served" },
                  { num: "4", label: "Service areas" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-display font-bold text-marine-900">{stat.num}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-marine-900 mb-4">Our High-Performance Roles</h2>
            <p className="text-muted-foreground">Aligned with Beauty, Flow, Kaizen, Stretch Goals, and Respectful Rapport.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ROLES.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl shadow-black/5 border border-border flex flex-col h-full"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-bold text-marine-900 mb-1">{role.title}</h3>
                  <p className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">{role.subtitle}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed flex-1 mb-8">
                  {role.desc}
                </p>
                <a
                  href="https://chatgpt.com/g/g-KrkSWI0Jg-we-beautify-boats-crew-application"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full px-6 py-4 bg-marine-50 hover:bg-marine-900 hover:text-white text-marine-900 rounded-xl font-bold transition-colors group"
                >
                  Apply Now
                  <ArrowUpRight className="w-5 h-5 text-cyan-500 group-hover:text-cyan-400" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
