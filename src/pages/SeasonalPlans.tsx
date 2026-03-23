import { motion } from "framer-motion";
import { Check, Repeat, CalendarDays, Package, ClipboardList } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";
import PageMeta from "@/components/PageMeta";

interface Plan {
  title: string;
  badge?: string;
  frequency: string;
  visits: string;
  desc: string;
  features: string[];
  highlight?: boolean;
}

const FULL_SERVICE_PLANS: Plan[] = [
  {
    title: "Always Ready Weekly Plan",
    badge: "Most Popular",
    frequency: "Weekly",
    visits: "24 deck & interior visits · 6 hull washes & wax",
    desc: "The ultimate worry-free package delivering 24 weekly deck and interior details, plus 6 monthly hull washes and wax applications to keep the vessel pristine and ready for guests all season long.",
    features: [
      "24 weekly deck details",
      "24 weekly interior details",
      "6 monthly hull washes",
      "6 monthly wax applications",
      "Priority scheduling all season",
    ],
    highlight: true,
  },
  {
    title: "Effortless Elegance Bi-Weekly Plan",
    frequency: "Bi-Weekly",
    visits: "12 deck & interior visits · 6 hull washes & wax",
    desc: "Consistent expert care featuring 12 bi-weekly Level 2 deck washes and interior details, alongside 6 monthly hull washes and wax applications to maintain luxury without interrupting your time on the water.",
    features: [
      "12 bi-weekly Level 2 deck washes",
      "12 bi-weekly interior details",
      "6 monthly hull washes",
      "6 monthly wax applications",
    ],
  },
  {
    title: "Simple Serenity Monthly Plan",
    frequency: "Monthly",
    visits: "6 full-service visits",
    desc: "Effortless essential maintenance: 6 monthly visits including a deep Level 3 deck wash, Level 1 interior detailing, Level 2 hull wash, and a protective wax application.",
    features: [
      "6 × Level 3 deck washes",
      "6 × Level 1 interior details",
      "6 × Level 2 hull washes",
      "6 × protective wax applications",
    ],
  },
];

const DECK_PLANS: Plan[] = [
  {
    title: "Fresh Start Weekly Plan",
    frequency: "Weekly",
    visits: "24 deck visits",
    desc: "24 weekly visits of gentle scrubbing and freshwater rinsing to remove surface dirt and maintain a consistently safe, beautiful, and streak-free deck.",
    features: [
      "24 weekly deck visits",
      "Gentle scrub & freshwater rinse",
      "Non-skid surface care",
      "Streak-free finish each visit",
    ],
  },
  {
    title: "Lifestyle Lift Bi-Weekly Plan",
    frequency: "Bi-Weekly",
    visits: "12 deck visits",
    desc: "Elevated deck presentation with 12 bi-weekly visits of enhanced Level 2 deck washing, specifically targeting lightly weathered areas, bonded grime, and surface buildup.",
    features: [
      "12 bi-weekly Level 2 deck washes",
      "Bonded grime & buildup removal",
      "Weathered area treatment",
      "Consistent surface presentation",
    ],
  },
  {
    title: "Reset Routine Monthly Plan",
    frequency: "Monthly",
    visits: "6 deck visits",
    desc: "Monthly deep deck cleaning over 6 visits, utilizing eco-friendly detergents and precision Level 3 scrubbing to remove tough grime and stains, restoring a bright and uniform appearance.",
    features: [
      "6 × Level 3 deck scrubs",
      "Eco-friendly detergents",
      "Tough stain & grime removal",
      "Uniform bright appearance restored",
    ],
  },
];

const INTERIOR_PLANS: Plan[] = [
  {
    title: "Cabin Comfort Weekly Plan",
    frequency: "Weekly",
    visits: "24 interior visits",
    desc: "Dedicated interior-only care providing 24 weekly visits of anti-bacterial wipe-downs, thorough vacuuming, window cleaning, and professional deodorizing so the cabin always feels fresh.",
    features: [
      "24 weekly interior visits",
      "Anti-bacterial wipe-downs",
      "Thorough vacuuming",
      "Window cleaning",
      "Professional deodorizing",
    ],
  },
  {
    title: "Cabin Comfort Bi-Weekly Plan",
    frequency: "Bi-Weekly",
    visits: "12 interior visits",
    desc: "Focused interior detailing every two weeks — 12 scheduled visits to vacuum, wipe down, and deodorize the cabin so it remains a welcoming environment for family and guests.",
    features: [
      "12 bi-weekly interior visits",
      "Vacuum & wipe-down each visit",
      "Professional deodorizing",
      "Window & surface care",
    ],
  },
];

const ONE_TIME_PLANS: Plan[] = [
  {
    title: "Launch Ready Plan",
    frequency: "One-Time",
    visits: "Spring commissioning service",
    desc: "A comprehensive spring commissioning service including a Level 3 deck and interior detail, Level 2 hull polish, and professional canvas installation — so the boat hits the water perfectly prepped.",
    features: [
      "Level 3 deck detail",
      "Level 3 interior detail",
      "Level 2 hull polish",
      "Professional canvas installation",
    ],
  },
  {
    title: "Season Wrap-Up Plan",
    frequency: "One-Time",
    visits: "End-of-season storage prep",
    desc: "An intensive end-of-season service featuring a Level 3 deck and interior clean, Level 2 bottom prep, and careful canvas removal to protect the boat from mildew and pests during winter storage.",
    features: [
      "Level 3 deck clean",
      "Level 3 interior clean",
      "Level 2 bottom prep",
      "Canvas removal & storage prep",
    ],
  },
];

interface ServicePackage {
  title: string;
  totalVisits: number;
  area: string;
  resetVisit: string;
  maintenanceVisits: string;
  resetCount: number;
  maintenanceCount: number;
  desc: string;
}

const PACKAGES: ServicePackage[] = [
  {
    title: "5-Visit Deck Wash Package",
    totalVisits: 5,
    area: "Deck",
    resetVisit: "Level 3 Deep Reset",
    maintenanceVisits: "Level 1 Routine Washdown",
    resetCount: 1,
    maintenanceCount: 4,
    desc: "Begins with one intensive Level 3 deck wash to deeply scrub away embedded grime, clear deck lockers, and clean all vinyl and windows. The remaining four visits are Level 1 eco-friendly routine washdowns to keep the deck guest-ready between resets.",
  },
  {
    title: "10-Visit Deck Wash Package",
    totalVisits: 10,
    area: "Deck",
    resetVisit: "Level 3 Deep Reset",
    maintenanceVisits: "Level 1 Routine Washdown",
    resetCount: 1,
    maintenanceCount: 9,
    desc: "Kicks off with a comprehensive Level 3 inch-by-inch deep scrub of the non-skid, trim, and lockers, followed by nine Level 1 visits to continuously float away fresh surface dirt, salt, and pollen before they bond to the deck.",
  },
  {
    title: "5-Visit Interior Clean Package",
    totalVisits: 5,
    area: "Interior",
    resetVisit: "Level 3 Steam Sanitization",
    maintenanceVisits: "Level 1 Routine Maintenance",
    resetCount: 1,
    maintenanceCount: 4,
    desc: "Resets the cabin with an initial Level 3 deep clean and steam sanitization of carpets, upholstery, and hard surfaces to eliminate odors and allergens. The four follow-up visits are Level 1 routine care to keep the cabin fresh and tidy.",
  },
  {
    title: "10-Visit Interior Clean Package",
    totalVisits: 10,
    area: "Interior",
    resetVisit: "Level 3 Steam Sanitization",
    maintenanceVisits: "Level 1 Routine Maintenance",
    resetCount: 1,
    maintenanceCount: 9,
    desc: "Starts with a Level 3 steam-clean and sanitization to restore a healthy, bacteria-free cabin environment, followed by nine Level 1 maintenance visits ensuring the cabin remains consistently tidy and comfortable for the full boating season.",
  },
];

function PackageCard({ pkg, i }: { pkg: ServicePackage; i: number }) {
  const { openQuote } = useQuote();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.07 }}
      className="bg-white border border-border rounded-3xl p-7 shadow-md hover:shadow-lg hover:border-cyan-500/30 transition-all flex flex-col"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-500 mb-2">
            {pkg.area} · {pkg.totalVisits} Visits
          </span>
          <h3 className="text-xl font-display font-bold text-marine-900 leading-snug">
            {pkg.title}
          </h3>
        </div>
        <div className="shrink-0 w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
          <span className="text-2xl font-display font-black text-cyan-500">{pkg.totalVisits}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
        {pkg.desc}
      </p>

      {/* Visit breakdown */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-3 bg-purple-50 border border-purple-200/60 rounded-xl px-4 py-3">
          <span className="w-7 h-7 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
            {pkg.resetCount}
          </span>
          <span className="text-sm font-semibold text-purple-800">{pkg.resetVisit}</span>
        </div>
        <div className="flex items-center gap-3 bg-cyan-50 border border-cyan-200/60 rounded-xl px-4 py-3">
          <span className="w-7 h-7 rounded-full bg-cyan-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
            {pkg.maintenanceCount}
          </span>
          <span className="text-sm font-semibold text-cyan-800">{pkg.maintenanceVisits}</span>
        </div>
      </div>

      <button
        onClick={() => openQuote("seasonalPlans")}
        className="w-full text-center py-3.5 rounded-xl font-bold text-sm bg-gray-100 hover:bg-marine-900 hover:text-white text-marine-900 transition-all duration-300"
      >
        Get a Quote
      </button>
    </motion.div>
  );
}

function PlanCard({ plan, i }: { plan: Plan; i: number }) {
  const { openQuote } = useQuote();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.07 }}
      className={`relative flex flex-col p-7 rounded-3xl border h-full ${
        plan.highlight
          ? "bg-marine-900 text-white border-marine-800 shadow-2xl shadow-marine-900/30"
          : "bg-white text-marine-900 border-border shadow-md shadow-black/5"
      }`}
    >
      {plan.badge && (
        <div className="absolute top-0 right-7 -translate-y-1/2">
          <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-1">
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-3 ${
          plan.highlight ? "text-cyan-400" : "text-cyan-500"
        }`}>
          <Repeat className="w-3 h-3" /> {plan.frequency}
        </span>
        <h3 className={`text-xl font-display font-bold leading-snug mb-1 ${plan.highlight ? "text-white" : "text-marine-900"}`}>
          {plan.title}
        </h3>
        <p className={`text-xs font-medium mb-4 ${plan.highlight ? "text-cyan-300/70" : "text-muted-foreground"}`}>
          {plan.visits}
        </p>
        <p className={`text-sm leading-relaxed ${plan.highlight ? "text-gray-300" : "text-muted-foreground"}`}>
          {plan.desc}
        </p>
      </div>

      <ul className="space-y-2.5 my-6 flex-1">
        {plan.features.map((feat, j) => (
          <li key={j} className="flex items-start gap-2.5">
            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? "text-cyan-400" : "text-cyan-500"}`} />
            <span className={`text-sm ${plan.highlight ? "text-gray-200" : "text-marine-800"}`}>{feat}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => openQuote("seasonalPlans")}
        className={`w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
          plan.highlight
            ? "bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25"
            : "bg-gray-100 hover:bg-marine-900 hover:text-white text-marine-900"
        }`}
      >
        Get a Quote
      </button>
    </motion.div>
  );
}

function SectionHeader({ icon, label, title, subtitle }: { icon: React.ReactNode; label: string; title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-cyan-500">{icon}</span>
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">{label}</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-display font-bold text-marine-900 mb-2">{title}</h2>
      <p className="text-muted-foreground text-sm max-w-xl">{subtitle}</p>
    </div>
  );
}

export default function SeasonalPlans() {
  const { openQuote } = useQuote();
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <PageMeta
        title="Seasonal Detailing Plans | Spike On The Water (Ontario)"
        description="Flexible seasonal boat detailing packages for Ontario boaters — weekly, bi-weekly, and full-season plans. Consistent care from opening day to winter storage. Call Spike: 416-890-5899."
        path="/seasonal-plans"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-marine-900 mb-5"
          >
            Seasonal Service Plans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Proactive care matched to Ontario's marine calendar — from spring launch through winter storage.
            All recurring plans include a built-in{" "}
            <span className="font-bold text-cyan-600">15% seasonal discount</span>.
          </motion.p>
        </div>

        {/* Full-Service Plans */}
        <section className="mb-16">
          <SectionHeader
            icon={<Repeat className="w-4 h-4" />}
            label="Full-Service Plans"
            title="Deck · Interior · Hull"
            subtitle="Complete vessel care covering all exterior and interior surfaces on a recurring schedule."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FULL_SERVICE_PLANS.map((plan, i) => (
              <PlanCard key={plan.title} plan={plan} i={i} />
            ))}
          </div>
        </section>

        {/* Deck-Only Plans */}
        <section className="mb-16">
          <SectionHeader
            icon={<Repeat className="w-4 h-4" />}
            label="Deck-Focused Plans"
            title="Deck Only"
            subtitle="Dedicated deck maintenance for owners who handle their own interior or hull care."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DECK_PLANS.map((plan, i) => (
              <PlanCard key={plan.title} plan={plan} i={i} />
            ))}
          </div>
        </section>

        {/* Interior-Only Plans */}
        <section className="mb-16">
          <SectionHeader
            icon={<Repeat className="w-4 h-4" />}
            label="Interior-Focused Plans"
            title="Cabin & Interior Only"
            subtitle="Interior-exclusive care keeping the cabin fresh, sanitary, and guest-ready all season."
          />
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {INTERIOR_PLANS.map((plan, i) => (
              <PlanCard key={plan.title} plan={plan} i={i} />
            ))}
          </div>
        </section>

        {/* One-Time Plans */}
        <section className="mb-16">
          <SectionHeader
            icon={<CalendarDays className="w-4 h-4" />}
            label="One-Time Services"
            title="Launch & Wrap-Up"
            subtitle="Single-visit commissioning and de-commissioning services timed to the Ontario boating season."
          />
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {ONE_TIME_PLANS.map((plan, i) => (
              <PlanCard key={plan.title} plan={plan} i={i} />
            ))}
          </div>
        </section>

        {/* Visit Packages */}
        <section className="mb-16">
          <SectionHeader
            icon={<Package className="w-4 h-4" />}
            label="Visit Packages"
            title="Tiered-Visit Bundles"
            subtitle="One deep reset to clear the baseline, then smart routine maintenance to keep it there. Available for decks and interiors in 5- or 10-visit blocks."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.title} pkg={pkg} i={i} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="bg-marine-900 rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Not sure which plan fits your boat?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Every vessel is different. Call Spike directly and he'll recommend the right plan based on your boat, your marina, and how you use the water.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:4168905899"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Call 416-890-5899
            </a>
            <button
              onClick={() => openQuote("seasonalPlans")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold transition-all hover:-translate-y-0.5"
            >
              <ClipboardList className="w-4 h-4" /> Reserve Assessment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
