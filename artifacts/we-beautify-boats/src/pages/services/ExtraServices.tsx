import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuote } from "@/context/QuoteContext";
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  Settings2,
  TreePine,
  Wind,
  Umbrella,
  Scissors,
  Eraser,
  Palette,
  Zap,
  Sparkles,
  Anchor,
  Droplets,
} from "lucide-react";

const EXTRAS = [
  {
    icon: Layers,
    title: "Wet Sanding Spots",
    desc: "Precision surface-correction targeting isolated deep scratches, severe oxidation, and gelcoat blemishes to restore smoothness without requiring full-surface refinishing.",
    blog: "/blog/wet-sanding-spots-precision-gelcoat-correction",
  },
  {
    icon: Settings2,
    title: "Engine Bay Cleaning",
    desc: "Eco-friendly, non-mechanical degreasing and delicate steam cleaning to safely remove oil, fuel residue, and pollutants — protecting waterways and ensuring marina compliance.",
    blog: "/blog/engine-bay-cleaning",
  },
  {
    icon: TreePine,
    title: "Exterior Wood Refinishing",
    desc: "Professional multi-step restoration of exterior teak, handrails, and trim — deep cleaning, coating removal, sanding, and fresh marine protection applied to spec.",
    blog: "/blog/exterior-wood-refinishing",
  },
  {
    icon: Anchor,
    title: "Tender Tubes Cleaning & Protection",
    desc: "Deep scouring and conditioning for inflatable tenders to remove embedded grime, salt, and scuffs — followed by specialized mold treatment and protective UV coatings.",
    blog: "/blog/tender-tubes-cleaning-protection",
  },
  {
    icon: Wind,
    title: "Storm Line Check",
    desc: "Proactive inspection, adjustment, and securement of mooring lines and chafe points to protect your vessel from unwanted movement and damage during high winds and severe weather.",
    blog: "/blog/storm-line-check-severe-weather-preparation",
  },
  {
    icon: Umbrella,
    title: "Erect Canvas Service",
    desc: "Careful installation or removal of standard canvas rigs and custom winter covers — proper tensioning, fit, and folding to extend material lifespan and prevent weather damage.",
    blog: "/blog/erect-canvas-installation-removal",
  },
  {
    icon: Scissors,
    title: "Shrink Wrap Removal",
    desc: "Fast, damage-free removal of off-season shrink wrap with environmentally responsible handling, careful cutting, and material separation for local recycling efforts.",
    blog: null,
  },
  {
    icon: Eraser,
    title: "Decal, Boat Name & Stripe Removal",
    desc: "Safe, controlled chemical and thermal removal of old vinyl graphics, painted names, and stripes — eliminating adhesive residue without scarring the underlying hull.",
    blog: "/blog/decal-stripe-removal",
  },
  {
    icon: Palette,
    title: "Vinyl Recoloring",
    desc: "Cost-effective restoration using precision masking, deep cleaning, and multiple coats of marine-grade dyes to revive faded upholstery color and UV resistance — without full replacement.",
    blog: "/blog/vinyl-recoloring-upholstery-restoration",
  },
  {
    icon: Zap,
    title: "Propeller Polishing",
    desc: "Performance-focused cleaning and polishing using marine-safe abrasives to remove marine growth, oxidation, and surface corrosion — reducing drag and improving fuel efficiency.",
    blog: "/blog/propeller-polishing-performance-efficiency",
  },
  {
    icon: Sparkles,
    title: "Brightwork Polishing & Conditioning",
    desc: "Non-abrasive maintenance care for exposed metals and varnished wood to remove light tarnish, rust staining, mineral deposits, and water spots — preserving finishes without deep refinishing.",
    blog: "/blog/brightwork-polishing-conditioning",
  },
  {
    icon: Droplets,
    title: "Teak Deck Maintenance",
    desc: "Routine cleaning, brightening, and marine-grade oiling to restore your teak deck's warm, natural color while providing vital protection against UV degradation and moisture intrusion.",
    blog: "/blog/teak-deck-maintenance",
  },
];

export default function ExtraServices() {
  const { openQuote } = useQuote();
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          href="/our-services"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-600 transition-colors mb-12 font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Services
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <span className="text-cyan-500 font-bold uppercase tracking-widest text-sm block mb-3">
            Specialized Work
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-marine-900 mb-5">
            Extra Services
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Targeted, expert solutions that go beyond standard detailing — addressing specific vessel components, specialized restorations, and environmental compliance. Available as add-ons or standalone appointments.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {EXTRAS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:border-cyan-500/30 transition-all duration-300 group flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5 group-hover:bg-cyan-500 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-cyan-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-display font-bold text-marine-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.desc}
                </p>
                {item.blog && (
                  <Link
                    href={item.blog}
                    className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-cyan-600 hover:text-cyan-500 transition-colors"
                  >
                    Read the full story <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-marine-900 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              Need something specific?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Extra services are quoted individually based on vessel size, condition, and scope. Call Spike directly — most can be added to any existing appointment or scheduled as a standalone visit.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:4168905899"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Call 416-890-5899
            </a>
            <button
              onClick={() => openQuote("extraServices")}
              className="flex items-center justify-center px-6 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold transition-all hover:-translate-y-0.5"
            >
              Reserve Assessment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
