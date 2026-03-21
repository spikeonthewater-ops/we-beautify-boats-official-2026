import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ChevronRight, CheckCircle2, Droplets, Sparkles, Waves,
  Compass, Zap, Ship, Shield, Hammer, Calendar, Gauge, Anchor
} from "lucide-react";
import { useQuote, QuoteCategory } from "@/context/QuoteContext";

const SIZES = ["Up to 20'", "21–30'", "31–40'", "41–50'", "51–60'", "61–70'", "71–80'"];

const CATEGORIES: { id: QuoteCategory; name: string; icon: React.ReactNode }[] = [
  { id: "deckWashes",      name: "Deck Washes",      icon: <Droplets className="w-3.5 h-3.5" /> },
  { id: "interiorDetails", name: "Interior Details",  icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: "hullWashes",      name: "Hull Washes",       icon: <Waves className="w-3.5 h-3.5" /> },
  { id: "bottomPrep",      name: "Bottom Prep",       icon: <Compass className="w-3.5 h-3.5" /> },
  { id: "deckPolishing",   name: "Deck Polishing",    icon: <Zap className="w-3.5 h-3.5" /> },
  { id: "hullPolishing",   name: "Hull Polishing",    icon: <Ship className="w-3.5 h-3.5" /> },
  { id: "protections",     name: "Protections",       icon: <Shield className="w-3.5 h-3.5" /> },
  { id: "extraServices",   name: "Extra Services",    icon: <Hammer className="w-3.5 h-3.5" /> },
  { id: "seasonalPlans",   name: "Seasonal Plans",    icon: <Calendar className="w-3.5 h-3.5" /> },
];

interface ServiceItem {
  level: string;
  name: string;
  desc: string;
  prices: number[];
  features: string[];
}
interface CategoryData { title: string; description: string; items: ServiceItem[] }

const SERVICE_DATA: Record<QuoteCategory, CategoryData> = {
  deckWashes: {
    title: "Deck Washes",
    description: "Physics before chemistry. Defined technical scopes for non-skid, vinyl, and lockers.",
    items: [
      { level: "DW01", name: "Level 1: Routine Maintenance", desc: "For well-maintained boats. Removes dust and salt. No conditioning or restoration.", prices: [150,187,262,337,412,487,562], features: ["Freshwater rinse","Eco-detergent scrub","Microfiber/chamois dry"] },
      { level: "DW02", name: "Level 2: Enhanced Cleaning",   desc: "Targets bonded grime and body oils. Includes vinyl seating and clear enclosure scrubbing.", prices: [300,375,525,675,825,975,1125], features: ["Vinyl-safe scrubbing","Enclosure clarity refresh","Grime agitation"] },
      { level: "DW03", name: "Level 3: Intensive Reset",     desc: "Inch-by-inch scrubbing of all surfaces, including interiors of all deck lockers.", prices: [800,1000,1400,1800,2200,2600,3000], features: ["Universal Stone use","Internal locker detail","Complete topsides refresh"] },
      { level: "DW04", name: "Level 4: Disaster Recovery",  desc: "Maximum recovery from neglect. Strips moss, mold, tree sap, and heavy carbon fallout.", prices: [1200,1500,2100,2700,3300,3900,4500], features: ["Environmental rescue","High-strength detergents","Multi-stage deep scrub"] },
    ],
  },
  interiorDetails: {
    title: "Interior Details",
    description: "Managing the onboard environment. From routine dusting to full environmental abatement.",
    items: [
      { level: "ID01", name: "Level 1: Basic Cabin Care",        desc: "Surface-level maintenance to keep the cabin tidy and fresh.", prices: [225,281,393,506,618,731,843], features: ["Visible surface dusting","Floor vacuuming","Mild cleaner wipe-down"] },
      { level: "ID02", name: "Level 2: Comprehensive Refresh",   desc: "Deeper cleaning including windows, storage bays, and interiors of all drawers.", prices: [675,843,1181,1518,1856,2193,2531], features: ["Drawer/cupboard reset","Window treatment","Hidden area sanitization"] },
      { level: "ID03", name: "Level 3: Sanitization Reset",      desc: "Deep cleaning with industrial steam technology to eliminate bacteria and odors.", prices: [1500,1875,2625,3375,4125,4875,5625], features: ["Steam-cleaned upholstery","Deep carpet extraction","Antimicrobial treatment"] },
      { level: "ID04", name: "Level 4: Abatement Service",       desc: "Maximum intervention for mold, pests, flood damage, or severe odor.", prices: [4500,5625,7875,10125,12375,14625,16875], features: ["Ozone treatments","Full cabin abatement","Environment restoration"] },
    ],
  },
  hullWashes: {
    title: "Hull Washes",
    description: "Removing salt, scum lines, and tannin stains from deck line to waterline without aggressive abrasion.",
    items: [
      { level: "HW01", name: "Level 1: Routine Hull Wash",     desc: "Basic brush and rinse to remove surface dust and light marine growth.", prices: [250,312,437,562,687,812,937], features: ["Soft-bristle wash","Waterline rinse"] },
      { level: "HW02", name: "Level 2: Targeted Foul Line",    desc: "Deeper cleaning targeting visible grime building along the foul line.", prices: [350,437,612,787,962,1137,1312], features: ["Medium-bristle scrub","Waterline focus"] },
      { level: "HW03", name: "Level 3: Decontamination",       desc: "Intensive wash to address heavy staining, yellow tannin, and surface oxidation.", prices: [500,625,875,1125,1375,1625,1875], features: ["Tannin stain removal","Oxidation prep wash"] },
    ],
  },
  bottomPrep: {
    title: "Bottom Prep",
    description: "Underwater hull preservation — from light fouling maintenance to full substrate reset.",
    items: [
      { level: "BP01", name: "Level 1: Light Fouling",    desc: "Maintenance cleaning of algae and slime using soft scrapers. No sanding.", prices: [300,375,450,525,600,675,750], features: ["Non-acid cleaning","Substrate preservation"] },
      { level: "BP02", name: "Level 2: Scuff & Sand",     desc: "Moderate fouling removal and preparation for seasonal paint adhesion.", prices: [900,1125,1350,1575,1800,2025,2250], features: ["Adhesion prep","Medium-grit sanding"] },
      { level: "BP03", name: "Level 3: Heavy Sanding",    desc: "Aggressive removal of flaking paint layers, barnacles, and cratered buildup.", prices: [1500,1875,2250,2625,3000,3375,3750], features: ["Cratered paint removal","Substrate smoothing"] },
      { level: "BP04", name: "Level 4: Full Strip & Reset", desc: "Complete removal to bare gelcoat. The ultimate substrate reset for long-term bottom health.", prices: [5000,6250,8750,11250,13750,16250,18750], features: ["Full paint removal","Zero contamination goal","Clean substrate for fresh coat"] },
    ],
  },
  deckPolishing: {
    title: "Deck Polishing",
    description: "Moving through stages of abrasion to restore shine — from light refreshes to full mirror restoration.",
    items: [
      { level: "DP01", name: "Level 1: Light Refresh",         desc: "Single-stage polish to refresh appearance and remove minor scuffs.", prices: [300,375,525,675,825,975,1125], features: ["Foam pad application","Maintenance-grade shine"] },
      { level: "DP02", name: "Level 2: Correction Lite",       desc: "Removes light oxidation and minor scratches using fast-cut compound.", prices: [1100,1375,1650,1925,2200,2475,2750], features: ["Fast-cut compounding","Light oxidation lift"] },
      { level: "DP03", name: "Level 3: Standard Correction",   desc: "Intensive multi-step process for chalky gelcoat and significant dullness.", prices: [1600,2000,2800,3600,4400,5200,6000], features: ["Multi-step buffing","Depth restoration"] },
      { level: "DP05", name: "Level 5: Wet Sand Reset",        desc: "Progressive wet sanding to physically level gelcoat for a flawless finish.", prices: [5000,6250,8750,11250,13750,16250,18750], features: ["Staged wet sanding","Museum-clarity finish"] },
    ],
  },
  hullPolishing: {
    title: "Hull Polishing",
    description: "Eliminating hull surface failure — from minor scuffs to severe multi-year oxidation.",
    items: [
      { level: "HP01", name: "Level 1: Light Polish",        desc: "Restores gloss and removes surface scuffs on hulls in good condition.", prices: [350,437,612,787,962,1137,1312], features: ["Minor scuff removal","Gloss restoration"] },
      { level: "HP02", name: "Level 2: Correction Lite",     desc: "Fast-cut compound for light oxidation and minor surface defects.", prices: [900,1125,1575,2025,2475,2925,3375], features: ["Surface smoothing","Natural shine build"] },
      { level: "HP03", name: "Level 3: Standard Correction", desc: "Multi-step correction for moderate oxidation and visible scratches.", prices: [1900,2375,3325,4275,5225,6175,7125], features: ["Aggressive compounding","Refinement pass"] },
      { level: "HP05", name: "Level 5: Mirror Restore",      desc: "Staged wet sanding combined with multi-stage high-speed polishing.", prices: [4000,5000,7000,9000,11000,13000,15000], features: ["Full wet-sand stages","Reflection perfection"] },
    ],
  },
  protections: {
    title: "Protections",
    description: "Locking in your detailing investment — from classic waxes to PPS technology.",
    items: [
      { level: "WX01",  name: "Premium Wax",          desc: "Classic seasonal protection against UV rays and salt.", prices: [200,250,350,450,550,650,750], features: ["High-gloss buffing","Classic shine"] },
      { level: "SC01",  name: "SiO2 Coating",         desc: "Nano-engineered Silicium (14Si) formula for hydrophobic defense.", prices: [100,125,175,225,275,325,375], features: ["Advanced resistance","Nano-fill shine"] },
      { level: "SP01",  name: "SpikePT Protection",   desc: "PPS Technology fuses PTFE (Teflon) to surface. Lasts 150+ washes.", prices: [300,375,525,675,825,975,1125], features: ["Negative-charge fusion","No waxing required"] },
      { level: "PR01",  name: "Epoxy Barrier Coat",   desc: "Hermetically seals hulls stripped to bare gelcoat. Prevents boat pox.", prices: [650,750,850,950,1050,1150,1250], features: ["3-coat minimum","Blister prevention"] },
      { level: "ANTF",  name: "Antifouling Paint",    desc: "Application of high-quality bottom paint with precision waterlines.", prices: [700,875,1225,1575,1925,2275,2625], features: ["Barnacle defense","Clean tape lines"] },
      { level: "TT01",  name: "Tender Tube Detail",   desc: "Deep scouring, mold treatment, and protection for inflatables.", prices: [350,350,350,350,350,350,350], features: ["TugScrub scour","UV protectant"] },
    ],
  },
  extraServices: {
    title: "Extra Services",
    description: "Focused detailing tasks and restorations beyond standard Level 1–5 files.",
    items: [
      { level: "WS01",   name: "Wet Sanding Spots",       desc: "Precision correction for localized scratches or gelcoat blemishes.", prices: [150,150,150,150,150,150,150], features: ["Isolated defect correction","Per-spot rate"] },
      { level: "WR01",   name: "Exterior Wood Refinish",   desc: "Sanding and multi-coat protection for exterior teak and trim.", prices: [1500,1500,1800,2100,2400,2700,3000], features: ["Combined min $1,500","Physical grain reset"] },
      { level: "SLC01",  name: "Storm Line Check",         desc: "Proactive inspection and securing of lines before severe weather.", prices: [50,50,50,50,50,50,50], features: ["Flat rate per check","Storm prep security"] },
      { level: "EC01",   name: "Erect Canvas Service",     desc: "Installation, tensioning, or removal of canvas and winter covers.", prices: [250,250,250,250,250,250,250], features: ["Flat rate per rig","Storage folding included"] },
      { level: "SR01",   name: "Shrink Wrap Removal",      desc: "Safe removal and eco-conscious separation of storage wrap.", prices: [150,150,150,150,150,150,150], features: ["Damage-free handling","Eco separation"] },
      { level: "DR01",   name: "Decal & Name Removal",     desc: "Thermal and chemical process to lift old vinyl without scarring.", prices: [150,200,300,350,450,550,600], features: ["Adhesive dissolution","Ghosting reduction"] },
      { level: "VR01",   name: "Vinyl Recoloring",         desc: "Precision application of marine dyes to restore faded upholstery.", prices: [700,875,1225,1575,1925,2275,2625], features: ["3-coat minimum","UV stable dyes"] },
      { level: "PP01",   name: "Propeller Polishing",      desc: "Cleaning and polishing to reduce drag and improve fuel efficiency.", prices: [250,250,250,250,250,250,250], features: ["Flat rate","Oxidation removal"] },
      { level: "BR01",   name: "Brightwork Care",          desc: "Metal polishing to chrome shine and varnished wood conditioning.", prices: [400,600,800,1000,1200,1400,1600], features: ["Metal tarnish removal","Wood conditioning"] },
      { level: "TDM01",  name: "Teak Deck Maintenance",    desc: "Cleaning, brightening, and oiling to restore natural teak warmth.", prices: [700,875,1225,1575,1925,2275,2625], features: ["UV moisture shield","Tone restoration"] },
    ],
  },
  seasonalPlans: {
    title: "Seasonal Plans",
    description: "Managed seasonal care with a built-in 15% discount. We Work. You Play.",
    items: [
      { level: "ARP01", name: "Always Ready Weekly",      desc: "24 weekly deck & interior washes + monthly hull & wax care.", prices: [9900,12400,17400,22350,27300,32300,37200], features: ["Assigned WBB admin","Proactive scheduling"] },
      { level: "EEP01", name: "Effortless Elegance",      desc: "12 bi-weekly Deck L2/Interior L2 + monthly hull & wax care.", prices: [7500,9375,11250,13125,15000,16875,18750], features: ["Bi-weekly detail","Elite maintenance"] },
      { level: "SSP01", name: "Simple Serenity",          desc: "6 monthly Deck L3/Interior L1 + monthly hull & wax care.", prices: [5812,6937,8062,9187,10312,11437,12562], features: ["Monthly maintenance","Deep deck reset"] },
      { level: "CCP01", name: "Cabin Comfort Bi-Weekly",  desc: "12 bi-weekly interior detailing (Level 1) sessions.", prices: [2700,3375,4050,4725,5400,6075,6750], features: ["Interior focused","Consistent freshness"] },
      { level: "FSP01", name: "Fresh Start Weekly",       desc: "24 weekly deck washes (Level 1).", prices: [6000,7200,8400,9600,10800,12000,13200], features: ["Spotless deck weekly","Ready for any outing"] },
      { level: "LRP01", name: "Launch Ready Plan",        desc: "Spring reset: Deck L3, Interior L3, Hull Polish L2, Canvas.", prices: [2900,3500,4100,4650,5200,5750,6300], features: ["Season commissioning","Canvas install"] },
      { level: "SWP01", name: "Season Wrap-Up",           desc: "Haul-out prep: Deck L3, Interior L3, Bottom L2, Canvas.", prices: [2950,3600,4250,5950,7100,8250,9450], features: ["Haul-out preparation","Dry hull guarantee"] },
    ],
  },
};

export function QuoteDrawer() {
  const { isOpen, activeCategory, closeQuote, setCategory } = useQuote();
  const [loaIndex, setLoaIndex] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Reset scroll when category changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeQuote(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeQuote]);

  const cat = SERVICE_DATA[activeCategory];
  const catMeta = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-marine-900/70 backdrop-blur-sm"
            onClick={closeQuote}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            ref={panelRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-2xl flex flex-col bg-gray-50 shadow-2xl"
          >
            {/* ── Header ───────────────────────────────────── */}
            <div className="bg-marine-900 text-white shrink-0">
              {/* Disclaimer bar */}
              <div className="bg-amber-500/20 border-b border-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-widest text-center py-1.5">
                Estimator Only — No Transactions Performed
              </div>

              <div className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-xl">
                    <Anchor className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-base leading-tight">Price Estimator</div>
                    <div className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest">We Work · You Play</div>
                  </div>
                </div>
                <button
                  onClick={closeQuote}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* LOA Size Selector */}
              <div className="px-5 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Vessel Length (LOA)</span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                  {SIZES.map((size, idx) => (
                    <button
                      key={size}
                      onClick={() => setLoaIndex(idx)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        loaIndex === idx
                          ? "bg-cyan-500 border-cyan-400 text-white shadow-md"
                          : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category tabs */}
              <div className="flex overflow-x-auto scrollbar-hide border-t border-white/10">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`shrink-0 flex items-center gap-1.5 px-4 py-3 text-[11px] font-bold whitespace-nowrap border-b-2 transition-all ${
                      activeCategory === cat.id
                        ? "border-cyan-400 text-white bg-white/5"
                        : "border-transparent text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cat.icon}
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Scrollable Body ───────────────────────────── */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              {/* Category intro */}
              <div className="px-5 pt-6 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-cyan-600">{catMeta?.icon}</span>
                  <h2 className="text-xl font-display font-bold text-marine-900">{cat.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
              </div>

              {/* Current size indicator */}
              <div className="mx-5 mb-5 px-4 py-2.5 bg-marine-900 rounded-xl flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Showing prices for</span>
                <span className="text-sm font-black text-white">{SIZES[loaIndex]}</span>
              </div>

              {/* Service cards */}
              <div className="px-5 pb-4 space-y-4">
                {cat.items.map((service, idx) => (
                  <motion.div
                    key={service.level}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <span className="inline-block bg-marine-900 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tight mb-1.5">
                          {service.level}
                        </span>
                        <h3 className="font-display font-bold text-marine-900 text-base leading-tight">
                          {service.name}
                        </h3>
                      </div>
                      <div className="shrink-0 text-right bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 min-w-[90px]">
                        <div className="text-[8px] font-black text-gray-400 uppercase leading-none mb-0.5">Est. Rate</div>
                        <div className="text-xl font-black text-marine-900 leading-none">
                          ${service.prices[loaIndex].toLocaleString()}
                        </div>
                        <div className="text-[8px] font-bold text-cyan-600 mt-0.5 uppercase">CAD</div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 italic border-l-2 border-cyan-200 pl-3 mb-3 leading-relaxed">
                      {service.desc}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {service.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>

                    <a
                      href="https://www.webeautifyboats.com/book-spike"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-marine-900 hover:bg-cyan-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      Book This Level <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Assessment CTA */}
              <div className="mx-5 mb-6 bg-marine-900 rounded-2xl p-6 text-white">
                <h4 className="font-display font-bold text-lg mb-1">Not sure which level?</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Every project starts with a 2-hour in-person assessment ($250 CAD) — fully credited toward your service. Spike scopes the job, no guessing.
                </p>
                <a
                  href="https://www.webeautifyboats.com/book-spike"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98]"
                >
                  Book Assessment <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* ── Sticky Footer ─────────────────────────────── */}
            <div className="shrink-0 border-t border-gray-200 bg-white px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ready to go?</div>
                <div className="text-sm font-bold text-marine-900">Call Spike: <a href="tel:4168905899" className="text-cyan-600 hover:text-cyan-500">416-890-5899</a></div>
              </div>
              <a
                href="https://www.webeautifyboats.com/book-spike"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-sm rounded-full transition-all shadow-md active:scale-[0.98]"
              >
                Book Spike <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

