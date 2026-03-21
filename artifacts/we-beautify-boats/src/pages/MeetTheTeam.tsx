import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
      <section className="relative overflow-hidden bg-marine-900">
        {/* Full-bleed team photo */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/team-header.jpeg`}
            alt="We Beautify Boats crew working together on Some Nice III"
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient overlays: subtle top darkening + strong bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-marine-900/60 via-marine-900/30 to-marine-900/80" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16">
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
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight"
          >
            The Team Behind the Shine
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-base md:text-lg text-gray-300 leading-relaxed font-light max-w-2xl"
          >
            A marine service system — delivered by trained technicians working inside strict scopes, safety standards, and quality control.
          </motion.p>
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
