import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, CheckCircle2, Droplets, Sparkles, Waves,
  Compass, Zap, Ship, Shield, Hammer, Calendar, Gauge, Anchor,
  ShoppingCart, Plus, Trash2, ChevronLeft, ClipboardList, ChevronRight,
  Phone, MessageCircle, ArrowRight, User, MapPin, Ruler, Layers, CalendarCheck,
  GraduationCap, Loader2, CreditCard,
  LucideIcon
} from "lucide-react";
import { useQuote, QuoteCategory, CartItem } from "@/context/QuoteContext";

const SIZES = ["Up to 20'", "21–30'", "31–40'", "41–50'", "51–60'", "61–70'", "71–80'"];

const CATEGORIES: { id: QuoteCategory; name: string; subtitle: string; Icon: LucideIcon; color: string }[] = [
  { id: "deckWashes",      name: "Deck Washes",      subtitle: "Non-skid, vinyl & lockers",       Icon: Droplets, color: "text-sky-500 bg-sky-50 border-sky-200" },
  { id: "interiorDetails", name: "Interior Details",  subtitle: "Cabin, upholstery & odour",        Icon: Sparkles, color: "text-violet-500 bg-violet-50 border-violet-200" },
  { id: "hullWashes",      name: "Hull Washes",       subtitle: "Waterline, hull sides & boot",     Icon: Waves,    color: "text-cyan-500 bg-cyan-50 border-cyan-200" },
  { id: "bottomPrep",      name: "Bottom Prep",       subtitle: "Antifoul, barrier & osmosis",      Icon: Compass,  color: "text-teal-500 bg-teal-50 border-teal-200" },
  { id: "deckPolishing",   name: "Deck Polishing",    subtitle: "Gelcoat restoration & shine",      Icon: Zap,      color: "text-amber-500 bg-amber-50 border-amber-200" },
  { id: "hullPolishing",   name: "Hull Polishing",    subtitle: "Mirror gloss & oxidation removal", Icon: Ship,     color: "text-blue-500 bg-blue-50 border-blue-200" },
  { id: "protections",     name: "Protections",       subtitle: "Wax, ceramic & UV coatings",       Icon: Shield,   color: "text-green-500 bg-green-50 border-green-200" },
  { id: "extraServices",   name: "Extra Services",    subtitle: "Canvas, teak, vinyl & more",       Icon: Hammer,   color: "text-orange-500 bg-orange-50 border-orange-200" },
  { id: "seasonalPlans",   name: "Seasonal Plans",    subtitle: "Managed care — 15% off",           Icon: Calendar, color: "text-rose-500 bg-rose-50 border-rose-200" },
  { id: "visitBundles",    name: "Visit Bundles",     subtitle: "Multi-visit packs — up to 15% off", Icon: Layers,  color: "text-purple-500 bg-purple-50 border-purple-200" },
  { id: "workshops",       name: "Workshops",         subtitle: "Training & certification series",   Icon: GraduationCap, color: "text-amber-600 bg-amber-50 border-amber-200" },
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
      { level: "DP04", name: "Level 4: Heavy Correction",      desc: "Aggressive multi-compound correction for severe oxidation and deep swirl damage. Compound cut, medium refinement, fine polish, then protection.", prices: [3000,3750,5250,6750,8250,9750,11250], features: ["Heavy compound cut","Multi-stage refinement","Deep swirl removal"] },
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
      { level: "HP04", name: "Level 4: Heavy Correction",   desc: "Heavy compound cut and multi-stage refinement for severe hull oxidation, chalking, and deep scratch patterns. Rotary and dual-action stages.", prices: [2800,3500,4900,6300,7700,9100,10500], features: ["Heavy compound rotary","DA refinement pass","Severe oxidation rescue"] },
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
  workshops: {
    title: "Workshops & Training",
    description: "Hands-on certification series taught by Spike. $250 CAD per course. Tools, chemistry, and 30 years of documented IP provided.",
    items: [
      { level: "WF-PRO", name: "The Marina Pro-Series",          desc: "For marina staff and professional crews. Covers efficiency, workflow optimization, crew leadership, and scaling service across multiple vessels.", prices: [250,250,250,250,250,250,250], features: ["Staff & crew format","Workflow & leadership focus","Certificate of Practical Completion"] },
      { level: "WF-OWN", name: "Yacht Club Owner's Day",         desc: "For private boat owners. Practical DIY skills, tool safety, seasonal maintenance routines — take the knowledge back to your own vessel.", prices: [250,250,250,250,250,250,250], features: ["Private owner format","DIY skills & tool safety","Certificate of Practical Completion"] },
      { level: "WF-ADV", name: "The Restoration Masterclass",    desc: "For advanced technicians. Wet sanding, spot repairs, Spike's PT surface protection application, brightwork, and vinyl restoration at the highest level.", prices: [250,250,250,250,250,250,250], features: ["Advanced technician format","Wet sand, restore & protect","Certificate of Practical Completion"] },
      { level: "W100",   name: "100 Series: Fundamentals",       desc: "Entry-level hybrid course — online theory plus on-the-water practical. Surface reading, compound basics, tool safety. Certificate of Practical Completion.", prices: [250,250,250,250,250,250,250], features: ["Hybrid format","Entry-level curriculum","Certificate of Practical Completion"] },
      { level: "W200",   name: "200 Series: Advanced Theory",    desc: "Comprehensive online theory platform (200) with optional on-the-water practical (201). Compound chemistry, oxidation dynamics, gelcoat substrates, business of detailing.", prices: [250,250,250,250,250,250,250], features: ["Online theory platform","Optional practical add-on","Certificate of Theoretical Completion"] },
      { level: "W300",   name: "300 Series: Advanced Practical", desc: "Hands-on only. Buffing mastery, restoration, vinyl recoloring, brightwork, heavy fallout wash, Level 4 interior mold remediation. Spike's PT protection included.", prices: [250,250,250,250,250,250,250], features: ["Hands-on practical only","Advanced & crew management modules","Certificate of Practical Completion (300)"] },
    ],
  },
  visitBundles: {
    title: "Visit Bundles",
    description: "Pre-packaged multi-visit tiers for individual services — locked-in scheduling and 10–15% built-in savings.",
    items: [
      { level: "VB-DW3",  name: "3-Visit Deck Wash Pack",      desc: "Three Deck Wash Level 1 visits at 10% off. Lock in routine maintenance for the season.", prices: [405,505,710,910,1110,1315,1520], features: ["3 × DW01 Level 1","10% bundle discount","Consistent deck health"] },
      { level: "VB-DW6",  name: "6-Visit Deck Wash Pack",      desc: "Six Deck Wash Level 1 visits at 15% off. Ideal for active boaters using their vessel every two weeks.", prices: [765,955,1335,1720,2100,2485,2865], features: ["6 × DW01 Level 1","15% bundle discount","Priority scheduling"] },
      { level: "VB-HW3",  name: "3-Visit Hull Wash Pack",      desc: "Three Hull Wash Level 1 visits at 10% off. Keeps salt, scum, and foul lines in check.", prices: [675,845,1180,1520,1855,2190,2530], features: ["3 × HW01 Level 1","10% bundle discount","Waterline maintenance"] },
      { level: "VB-HW6",  name: "6-Visit Hull Wash Pack",      desc: "Six Hull Wash Level 1 visits at 15% off. The full-season hull protection plan.", prices: [1275,1590,2230,2865,3505,4140,4780], features: ["6 × HW01 Level 1","15% bundle discount","Barnacle prevention"] },
      { level: "VB-ID3",  name: "3-Visit Interior Pack",       desc: "Three Interior Level 1 detail visits at 10% off. Keeps the cabin fresh between full cleans.", prices: [610,760,1065,1365,1670,1975,2275], features: ["3 × ID01 Level 1","10% bundle discount","Cabin comfort maintained"] },
      { level: "VB-ID5",  name: "5-Visit Interior Pack",       desc: "Five Interior Level 1 visits at 12% off. Full-season cabin maintenance program.", prices: [990,1235,1730,2225,2720,3215,3710], features: ["5 × ID01 Level 1","12% bundle discount","Monthly interior care"] },
      { level: "VB-DP3",  name: "3-Visit Deck Polish Pack",    desc: "Three Deck Polish Level 1 refreshes at 10% off. Sustains gelcoat gloss through the entire season.", prices: [810,1015,1420,1825,2225,2635,3040], features: ["3 × DP01 Level 1","10% bundle discount","Sustained shine"] },
      { level: "VB-LW",   name: "Launch + Wrap Bundle",        desc: "Spring Launch Ready + Fall Season Wrap-Up combined at 5% off. Start and end the season right — one reservation covers both.", prices: [5570,6745,7935,10070,11685,13300,14865], features: ["LRP01 + SWP01 combined","5% bundle discount","Full season coverage","Priority spring booking"] },
    ],
  },
};

type Step = "browse" | "cart" | "form" | "confirm" | "submitting" | "payment";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  boatName: string;
  boatModel: string;
  address: string;
  slipId: string;
  preferredDate: string;
}

const EMPTY_FORM: FormData = {
  firstName: "", lastName: "", phone: "", email: "",
  boatName: "", boatModel: "", address: "", slipId: "", preferredDate: "",
};

export function QuoteDrawer() {
  const { isOpen, activeCategory, closeQuote, setCategory, cart, addToCart, removeFromCart, isInCart } = useQuote();
  const [loaIndex, setLoaIndex] = useState(1);
  const [loaFeet, setLoaFeet] = useState("35");
  const [step, setStep] = useState<Step>("browse");
  const [browseMode, setBrowseMode] = useState<"grid" | "services">("grid");
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [bookingError, setBookingError] = useState("");
  const [formAttempted, setFormAttempted] = useState(false);
  const [cartSent, setCartSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function handleAssessmentSubmit() {
    setBookingError("");
    setStep("submitting");
    try {
      const res = await fetch("/api/bookings/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          loaFeet,
          cart: cart.map(i => ({ level: i.level, name: i.name, price: i.price })),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setBookingError("");
      } else {
        setBookingError("Note: calendar sync unavailable — Spike will confirm your slot by phone.");
      }
    } catch {
      setBookingError("Note: calendar sync unavailable — Spike will confirm your slot by phone.");
    }
    setStep("payment");
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory, step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleClose = () => {
    closeQuote();
    setTimeout(() => { setStep("browse"); setBrowseMode("grid"); setForm(EMPTY_FORM); setFormAttempted(false); setCartSent(false); }, 400);
  };

  const catData = SERVICE_DATA[activeCategory];
  const catMeta = CATEGORIES.find(c => c.id === activeCategory);
  const cartTotal = cart.reduce((sum, i) => sum + i.price, 0);
  const loaLabel = SIZES[loaIndex];
  const cartCountFor = (catId: QuoteCategory) => cart.filter(i => i.category === catId).length;
  const reviewedCount = CATEGORIES.filter(c => cartCountFor(c.id) > 0).length;

  const handleAddToCart = (service: ServiceItem) => {
    const catName = CATEGORIES.find(c => c.id === activeCategory)?.name ?? activeCategory;
    addToCart({
      level: service.level,
      name: service.name,
      category: activeCategory,
      categoryName: catName,
      price: service.prices[loaIndex],
      loaIndex,
      loaLabel,
    });
  };

  const buildWhatsAppText = () => {
    const lines = [
      "🚤 *ASSESSMENT RESERVATION — We Beautify Boats*",
      "",
      "👤 *Contact*",
      `Name: ${form.firstName} ${form.lastName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      "",
      "⛵ *Vessel*",
      `Boat: ${form.boatName}${form.boatModel ? ` (${form.boatModel})` : ""}`,
      `LOA: ${loaFeet} ft`,
      `Location: ${form.address}`,
      `Slip / Berth ID: ${form.slipId}`,
      "",
      "📋 *Selected Services*",
      ...cart.map(i => `• ${i.level} – ${i.name}: $${i.price.toLocaleString()} CAD`),
      "",
      `📐 Vessel Size (Estimator): ${loaLabel} · Exact: ${loaFeet} ft`,
      `💰 Total Estimate: ~$${cartTotal.toLocaleString()} CAD`,
      "",
      "✅ *Assessment Commitment: $250 CAD*",
      "(Credited in full toward selected service.)",
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  const formComplete = !!(form.firstName && form.lastName && form.phone && form.boatName && form.address && form.slipId && loaFeet);
  const fe = (val: string) => formAttempted && !val.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-marine-900/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            key="drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-2xl flex flex-col bg-gray-50 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* ── HEADER ─────────────────────────────────────── */}
            <div className="bg-marine-900 text-white shrink-0">
              <div className="bg-amber-500/20 border-b border-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-widest text-center py-1.5">
                Estimate Only — No Transactions Here · Assessment $250 CAD
              </div>

              <div className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {step !== "browse" && (
                    <button
                      onClick={() => setStep(step === "confirm" ? "form" : step === "form" ? "cart" : "browse")}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}
                  <div className="bg-white/10 p-2 rounded-xl">
                    {step === "browse" && <Anchor className="w-5 h-5 text-white" />}
                    {step === "cart"   && <ShoppingCart className="w-5 h-5 text-cyan-400" />}
                    {step === "form"   && <ClipboardList className="w-5 h-5 text-cyan-400" />}
                    {step === "confirm"&& <CheckCircle2 className="w-5 h-5 text-green-400" />}
                  </div>
                  <div>
                    <div className="font-display font-bold text-base leading-tight">
                      {step === "browse"  && "Price Estimator"}
                      {step === "cart"    && "Your Service Cart"}
                      {step === "form"    && "Reserve Assessment"}
                      {step === "confirm" && "You're All Set"}
                    </div>
                    <div className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest">We Work · You Play</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Cart bubble */}
                  {step === "browse" && cart.length > 0 && (
                    <button
                      onClick={() => setStep("cart")}
                      className="relative flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 rounded-full text-[11px] font-black transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Review Cart
                      <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-marine-900 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                        {cart.length}
                      </span>
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* LOA selector — only on browse step */}
              {step === "browse" && (
                <div className="px-5 pb-4 border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Vessel Length (LOA) — for pricing</span>
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
                  {browseMode === "services" && catMeta && (
                    <button
                      onClick={() => setBrowseMode("grid")}
                      className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-white/60 hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      All Categories
                      <span className="ml-1 text-white/40">·</span>
                      <span className="text-white font-black">{catMeta.name}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ── BODY ───────────────────────────────────────── */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">

              {/* ── STEP: BROWSE — GRID ── */}
              {step === "browse" && browseMode === "grid" && (
                <div className="px-4 pt-5 pb-8">
                  {/* Header + progress */}
                  <div className="flex items-end justify-between mb-4 px-1">
                    <div>
                      <h2 className="font-display font-bold text-marine-900 text-lg leading-tight">Select Your Services</h2>
                      <p className="text-xs text-gray-400 mt-0.5">Browse each category and add what you need</p>
                    </div>
                    {reviewedCount > 0 && (
                      <div className="text-right shrink-0 ml-3">
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Explored</div>
                        <div className="text-sm font-black text-purple-600">{reviewedCount}<span className="text-gray-300 font-normal"> / {CATEGORIES.length}</span></div>
                      </div>
                    )}
                  </div>

                  {/* Category grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {CATEGORIES.map(cat => {
                      const count = cartCountFor(cat.id);
                      const hasItems = count > 0;
                      return (
                        <motion.button
                          key={cat.id}
                          onClick={() => { setCategory(cat.id); setBrowseMode("services"); }}
                          whileTap={{ scale: 0.97 }}
                          className={`relative text-left rounded-2xl border-2 p-4 transition-all shadow-sm ${
                            hasItems
                              ? "bg-white border-purple-400 ring-2 ring-purple-100"
                              : "bg-white border-gray-100 hover:border-gray-300"
                          }`}
                        >
                          {/* Cart badge */}
                          {hasItems && (
                            <div className="absolute top-3 right-3 flex items-center gap-1 bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              {count}
                            </div>
                          )}

                          {/* Icon */}
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${cat.color}`}>
                            <cat.Icon className="w-5 h-5" />
                          </div>

                          {/* Name */}
                          <div className={`font-display font-bold text-sm leading-tight mb-1 ${hasItems ? "text-purple-900" : "text-marine-900"}`}>
                            {cat.name}
                          </div>

                          {/* Subtitle */}
                          <div className="text-[10px] text-gray-400 leading-snug">{cat.subtitle}</div>

                          {/* Arrow */}
                          <div className={`mt-2 flex items-center gap-1 text-[10px] font-bold ${hasItems ? "text-purple-500" : "text-gray-300"}`}>
                            {hasItems ? "View / edit" : "Explore"}
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Bottom CTA */}
                  {cart.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 bg-marine-900 rounded-2xl p-5 text-white"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-display font-bold text-base">Ready to reserve?</div>
                          <div className="text-gray-400 text-xs mt-0.5">{cart.length} service{cart.length !== 1 ? "s" : ""} selected · ~${cartTotal.toLocaleString()} CAD est.</div>
                        </div>
                        <ShoppingCart className="w-8 h-8 text-cyan-400 shrink-0" />
                      </div>
                      <button
                        onClick={() => setStep("cart")}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all"
                      >
                        Review Cart <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {cart.length === 0 && (
                    <div className="mt-5 border border-dashed border-gray-200 rounded-2xl p-5 text-center">
                      <p className="text-xs text-gray-400 leading-relaxed">Not sure what you need? Browse each category above — Spike will scope the work during your on-site assessment.</p>
                      <button
                        onClick={() => setStep("form")}
                        className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 bg-marine-900 text-white font-bold text-xs rounded-xl hover:bg-marine-800 transition-all"
                      >
                        Skip to Reserve Assessment <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP: BROWSE — SERVICES ── */}
              {step === "browse" && browseMode === "services" && (
                <div>
                  <div className="px-5 pt-5 pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      {catMeta && <catMeta.Icon className={`w-5 h-5 ${catMeta.color.split(" ")[0]}`} />}
                      <h2 className="text-xl font-display font-bold text-marine-900">{catData.title}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{catData.description}</p>
                  </div>

                  <div className="mx-5 mb-5 px-4 py-2.5 bg-marine-900 rounded-xl flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Showing prices for</span>
                    <span className="text-sm font-black text-white">{SIZES[loaIndex]}</span>
                  </div>

                  <div className="px-5 pb-4 space-y-4">
                    {catData.items.map((service, idx) => {
                      const inCart = isInCart(service.level);
                      return (
                        <motion.div
                          key={service.level}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`bg-white border rounded-2xl p-5 shadow-sm transition-all ${inCart ? "border-cyan-400 ring-2 ring-cyan-100" : "border-gray-100"}`}
                        >
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="inline-block bg-marine-900 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tight">
                                  {service.level}
                                </span>
                                {inCart && (
                                  <span className="inline-flex items-center gap-1 bg-cyan-50 text-cyan-600 text-[9px] font-black px-2 py-0.5 rounded border border-cyan-200 uppercase tracking-tight">
                                    <CheckCircle2 className="w-2.5 h-2.5" /> In Cart
                                  </span>
                                )}
                              </div>
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

                          <button
                            onClick={() => inCart ? removeFromCart(service.level) : handleAddToCart(service)}
                            className={`flex items-center justify-center gap-2 w-full py-3 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] ${
                              inCart
                                ? "bg-cyan-50 border-2 border-cyan-400 text-cyan-600 hover:bg-red-50 hover:border-red-300 hover:text-red-500"
                                : "bg-marine-900 hover:bg-cyan-500 text-white"
                            }`}
                          >
                            {inCart ? (
                              <><Trash2 className="w-3.5 h-3.5" /> Remove from Cart</>
                            ) : (
                              <><Plus className="w-3.5 h-3.5" /> Add to Cart</>
                            )}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Assessment CTA bottom */}
                  <div className="mx-5 mb-6 bg-marine-900 rounded-2xl p-6 text-white">
                    <h4 className="font-display font-bold text-lg mb-1">Not sure which level?</h4>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      Every project starts with a 2-hour on-site assessment ($250 CAD, credited to your service). Spike scopes the work — no guessing, no surprises.
                    </p>
                    <button
                      onClick={() => setStep(cart.length > 0 ? "cart" : "form")}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-sm rounded-xl transition-all"
                    >
                      Reserve Assessment <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP: CART ── */}
              {step === "cart" && (
                <div className="px-5 pt-6 pb-8">
                  {cart.length === 0 ? (
                    <div className="text-center py-16">
                      <ShoppingCart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                      <p className="text-gray-400 font-semibold mb-4">Your cart is empty</p>
                      <button
                        onClick={() => setStep("browse")}
                        className="text-sm font-bold text-cyan-600 hover:text-cyan-500"
                      >
                        ← Browse Services
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground mb-6">
                        Review your selected services below. These will be scoped and confirmed during Spike's on-site assessment.
                      </p>

                      <div className="space-y-3 mb-6">
                        {cart.map(item => (
                          <motion.div
                            key={item.level}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16 }}
                            className="bg-white border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-3 shadow-sm"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[9px] font-black bg-marine-900 text-white px-1.5 py-0.5 rounded uppercase">
                                  {item.level}
                                </span>
                                <span className="text-[10px] text-gray-400 font-semibold">{item.categoryName}</span>
                              </div>
                              <p className="text-sm font-bold text-marine-900 leading-tight">{item.name}</p>
                              <p className="text-[11px] text-gray-400 mt-0.5">LOA: {item.loaLabel}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <div className="text-base font-black text-marine-900">${item.price.toLocaleString()}</div>
                                <div className="text-[9px] font-bold text-cyan-600 uppercase">CAD</div>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.level)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="bg-marine-900 rounded-xl px-5 py-4 flex justify-between items-center mb-6">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Estimated Total</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">Confirmed at assessment · Pricing may vary</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-white">${cartTotal.toLocaleString()}</div>
                          <div className="text-[9px] font-bold text-cyan-400 uppercase">CAD est.</div>
                        </div>
                      </div>

                      {/* Assessment fee notice */}
                      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
                        <div className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1">Assessment Commitment</div>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          Reserving an assessment commits to a <strong>$250 CAD</strong> on-site scoping visit (approx. 2 hrs). This fee is <strong>credited in full</strong> toward your selected services when booked.
                        </p>
                      </div>

                      <button
                        onClick={() => setStep("form")}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all active:scale-[0.99] shadow-lg"
                      >
                        <ClipboardList className="w-4 h-4" />
                        Reserve Assessment — $250 CAD
                      </button>

                      <button
                        onClick={() => setStep("browse")}
                        className="mt-3 w-full text-center text-xs font-semibold text-gray-400 hover:text-gray-600 py-2 transition-colors"
                      >
                        + Add more services
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* ── STEP: FORM ── */}
              {step === "form" && (
                <div className="px-5 pt-6 pb-8">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Spike will reach out within 24 hours to confirm your assessment time. The $250 CAD fee is collected at the time of booking confirmation.
                  </p>

                  {/* Validation banner */}
                  {formAttempted && !formComplete && (
                    <div className="mb-5 bg-red-50 border border-red-300 rounded-xl px-4 py-3 flex items-start gap-2">
                      <span className="text-red-500 font-black text-sm shrink-0">!</span>
                      <p className="text-xs text-red-700 leading-relaxed font-semibold">
                        Please complete all required fields marked with <span className="text-red-500">*</span> before continuing.
                      </p>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-cyan-500" />
                      <span className="text-xs font-black uppercase tracking-widest text-marine-900">Your Contact</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">First Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                          placeholder="James"
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm font-medium text-marine-900 focus:outline-none focus:ring-2 placeholder:text-gray-300 ${fe(form.firstName) ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 bg-white focus:ring-cyan-400"}`}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Last Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={form.lastName}
                          onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                          placeholder="Robertson"
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm font-medium text-marine-900 focus:outline-none focus:ring-2 placeholder:text-gray-300 ${fe(form.lastName) ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 bg-white focus:ring-cyan-400"}`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Phone <span className="text-red-500">*</span></label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="416-555-0100"
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm font-medium text-marine-900 focus:outline-none focus:ring-2 placeholder:text-gray-300 ${fe(form.phone) ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 bg-white focus:ring-cyan-400"}`}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="james@email.com"
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium text-marine-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vessel */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Anchor className="w-4 h-4 text-cyan-500" />
                      <span className="text-xs font-black uppercase tracking-widest text-marine-900">Your Vessel</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Boat Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={form.boatName}
                          onChange={e => setForm(f => ({ ...f, boatName: e.target.value }))}
                          placeholder="Some Nice III"
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm font-medium text-marine-900 focus:outline-none focus:ring-2 placeholder:text-gray-300 ${fe(form.boatName) ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 bg-white focus:ring-cyan-400"}`}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Make / Model</label>
                        <input
                          type="text"
                          value={form.boatModel}
                          onChange={e => setForm(f => ({ ...f, boatModel: e.target.value }))}
                          placeholder="Chaparral 302"
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium text-marine-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-300"
                        />
                      </div>
                    </div>

                    {/* LOA — specific feet entry */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Ruler className="w-3.5 h-3.5 text-gray-400" />
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Vessel LOA (exact feet) *</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="12"
                          max="120"
                          value={loaFeet}
                          onChange={e => setLoaFeet(e.target.value)}
                          placeholder="35"
                          className={`w-28 border rounded-lg px-3 py-2.5 text-sm font-bold text-marine-900 focus:outline-none focus:ring-2 placeholder:text-gray-300 ${formAttempted && !loaFeet ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 bg-white focus:ring-cyan-400"}`}
                        />
                        <span className="text-sm font-semibold text-gray-500">ft overall length</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Boat Location Address *</label>
                      </div>
                      <input
                        type="text"
                        value={form.address}
                        onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                        placeholder="Bronte Outer Harbour Marina, Oakville, ON"
                        className={`w-full border rounded-lg px-3 py-2.5 text-sm font-medium text-marine-900 focus:outline-none focus:ring-2 placeholder:text-gray-300 ${fe(form.address) ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 bg-white focus:ring-cyan-400"}`}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Ruler className="w-3.5 h-3.5 text-gray-400" />
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Slip / Berth ID *</label>
                      </div>
                      <input
                        type="text"
                        value={form.slipId}
                        onChange={e => setForm(f => ({ ...f, slipId: e.target.value }))}
                        placeholder="B-42"
                        className={`w-full border rounded-lg px-3 py-2.5 text-sm font-medium text-marine-900 focus:outline-none focus:ring-2 placeholder:text-gray-300 ${fe(form.slipId) ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 bg-white focus:ring-cyan-400"}`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Preferred Assessment Date</label>
                      </div>
                      <input
                        type="date"
                        value={form.preferredDate}
                        onChange={e => setForm(f => ({ ...f, preferredDate: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium text-marine-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                      <p className="text-[10px] text-gray-400 mt-1">Optional — Spike will confirm availability</p>
                    </div>
                  </div>

                  {/* Services summary */}
                  {cart.length > 0 && (
                    <div className="bg-gray-100 rounded-xl p-4 mb-6">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Services in Request</div>
                      <div className="space-y-1">
                        {cart.map(i => (
                          <div key={i.level} className="flex justify-between text-xs font-semibold text-marine-900">
                            <span>{i.level} – {i.name}</span>
                            <span className="text-cyan-600">${i.price.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-sm font-black text-marine-900">
                          <span>Total Estimate</span>
                          <span>${cartTotal.toLocaleString()} CAD</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
                    <p className="text-xs text-amber-800 leading-relaxed">
                      <strong>$250 CAD assessment fee</strong> — Collected at booking confirmation. Credited in full toward your service when you proceed.
                    </p>
                  </div>

                  <button
                    onClick={() => { if (formComplete) { setFormAttempted(false); setStep("confirm"); } else { setFormAttempted(true); scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }); } }}
                    className={`flex items-center justify-center gap-2 w-full py-4 font-black text-sm uppercase tracking-widest rounded-xl transition-all active:scale-[0.99] shadow-lg ${
                      formComplete
                        ? "bg-cyan-500 hover:bg-cyan-400 text-white"
                        : formAttempted ? "bg-red-500 hover:bg-red-400 text-white" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                    Continue to Confirm
                  </button>
                  <p className="text-center text-[10px] text-gray-400 mt-2">* Required fields</p>
                </div>
              )}

              {/* ── STEP: CONFIRM ── */}
              {step === "confirm" && (
                <div className="px-5 pt-6 pb-8">
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6 text-center">
                    <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                    <h3 className="font-display font-bold text-lg text-marine-900 mb-1">Almost There</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Send your reservation via WhatsApp or call Spike directly — we'll confirm your slot and assessment fee within 24 hours.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Reservation Summary</div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Client</span>
                        <span className="font-bold text-marine-900">{form.firstName} {form.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Phone</span>
                        <span className="font-bold text-marine-900">{form.phone}</span>
                      </div>
                      {form.email && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Email</span>
                          <span className="font-bold text-marine-900">{form.email}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-100 my-2" />
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Vessel</span>
                        <span className="font-bold text-marine-900">{form.boatName}{form.boatModel ? ` (${form.boatModel})` : ""}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">LOA</span>
                        <span className="font-bold text-marine-900">{loaFeet} ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Location</span>
                        <span className="font-bold text-marine-900 text-right max-w-[55%]">{form.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Slip / Berth</span>
                        <span className="font-bold text-marine-900">{form.slipId}</span>
                      </div>
                      {cart.length > 0 && (
                        <>
                          <div className="border-t border-gray-100 my-2" />
                          {cart.map(i => (
                            <div key={i.level} className="flex justify-between">
                              <span className="text-gray-500 font-medium text-xs">{i.level} – {i.name}</span>
                              <span className="font-bold text-cyan-600">${i.price.toLocaleString()}</span>
                            </div>
                          ))}
                          <div className="flex justify-between font-black text-marine-900 border-t border-gray-100 pt-2 mt-1">
                            <span>Total Estimate</span>
                            <span>${cartTotal.toLocaleString()} CAD</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between font-black text-amber-700 border-t border-amber-100 pt-2 mt-1">
                        <span>Assessment Fee</span>
                        <span>$250 CAD</span>
                      </div>
                    </div>
                  </div>

                  {/* STEP 1 — WhatsApp cart summary */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${cartSent ? "bg-green-500 text-white" : "bg-marine-900 text-white"}`}>
                        {cartSent ? "✓" : "1"}
                      </span>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                        {cartSent ? "Cart sent to Spike" : "Send your cart to Spike first"}
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/14168905899?text=${buildWhatsAppText()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setCartSent(true)}
                      className={`flex items-center justify-center gap-3 w-full py-3.5 font-black text-sm uppercase tracking-widest rounded-xl transition-all active:scale-[0.99] ${cartSent ? "bg-green-100 text-green-700 border border-green-300" : "bg-[#25D366] hover:bg-[#1fba59] text-white shadow-lg"}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {cartSent ? "Resend Cart via WhatsApp" : "Send Cart via WhatsApp"}
                    </a>
                  </div>

                  {/* STEP 2 — Confirm & Pay (locked until cart sent) */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${cartSent ? "bg-marine-900 text-white" : "bg-gray-200 text-gray-400"}`}>2</span>
                      <p className={`text-[11px] font-bold uppercase tracking-widest ${cartSent ? "text-gray-500" : "text-gray-300"}`}>
                        {cartSent ? "Confirm & pay your assessment fee" : "Complete step 1 first"}
                      </p>
                    </div>
                    <button
                      onClick={cartSent ? handleAssessmentSubmit : undefined}
                      disabled={!cartSent}
                      className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg ${cartSent ? "bg-cyan-500 hover:bg-cyan-400 text-white active:scale-[0.99] cursor-pointer" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
                    >
                      <CalendarCheck className="w-5 h-5" />
                      Confirm Reservation &amp; Pay Fee
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-2 leading-relaxed">
                      Your booking is saved to our calendar · $250 CAD fee credited to your service
                    </p>
                  </div>

                  {/* Error message */}
                  {bookingError && (
                    <div className="mb-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      <p className="text-xs text-red-700 leading-relaxed">{bookingError}</p>
                    </div>
                  )}

                  {/* STEP 3 — Call to confirm */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 bg-marine-900 text-white">3</span>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                        Call Spike to confirm date &amp; payment received
                      </p>
                    </div>
                    <a
                      href="tel:4168905899"
                      className="flex items-center justify-center gap-3 w-full py-3.5 bg-white border-2 border-marine-900 hover:bg-marine-900 hover:text-white text-marine-900 font-black text-sm uppercase tracking-widest rounded-xl transition-all active:scale-[0.99]"
                    >
                      <Phone className="w-4 h-4" />
                      Call Spike — 416-890-5899
                    </a>
                    <p className="text-center text-[10px] text-gray-400 mt-2 leading-relaxed">
                      No WhatsApp? Call Spike directly to send your details and lock in your date.
                    </p>
                  </div>
                </div>
              )}

              {/* ── STEP: SUBMITTING ── */}
              {step === "submitting" && (
                <div className="px-5 pt-20 pb-8 flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
                  <h3 className="font-display font-bold text-lg text-marine-900 mb-2">Saving Your Reservation</h3>
                  <p className="text-sm text-gray-500">Adding to Spike's calendar — just a moment…</p>
                </div>
              )}

              {/* ── STEP: PAYMENT ── */}
              {step === "payment" && (
                <div className="px-5 pt-6 pb-8">
                  {bookingError ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-center">
                      <CheckCircle2 className="w-10 h-10 text-amber-500 mx-auto mb-2" />
                      <h3 className="font-display font-bold text-lg text-marine-900 mb-1">Almost There</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Send your reservation via WhatsApp or call Spike directly — we'll confirm your slot and assessment fee within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6 text-center">
                      <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                      <h3 className="font-display font-bold text-lg text-marine-900 mb-1">Reservation Confirmed!</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Your assessment is in Spike's calendar. Pay the $250 CAD fee below — it's fully credited when you proceed with a service.
                      </p>
                    </div>
                  )}

                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-center mb-4">Pay Assessment Fee — $250 CAD</div>

                  <div className="space-y-3 mb-6">
                    <a
                      href="https://buy.stripe.com/5kQ8wQ0zL9UvcJx5Od0kE01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest bg-[#635BFF] hover:bg-[#4f49cc] text-white transition-all active:scale-[0.99] shadow-lg"
                    >
                      <CreditCard className="w-5 h-5" />
                      Pay with Stripe
                    </a>
                    <a
                      href="https://paypal.me/spikeonthewater/250"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest bg-[#003087] hover:bg-[#002270] text-white transition-all active:scale-[0.99] shadow-lg"
                    >
                      <span className="font-black text-[#009cde]">Pay</span><span className="font-black text-white">Pal</span>
                      &nbsp;— PayPal.me
                    </a>
                  </div>

                  <a
                    href={`https://wa.me/14168905899?text=${buildWhatsAppText()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#25D366] hover:bg-[#1fba59] text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Also Send Cart via WhatsApp
                  </a>
                </div>
              )}
            </div>

            {/* ── STICKY FOOTER ───────────────────────────────── */}
            <div className="shrink-0 border-t border-gray-200 bg-white px-5 py-3 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Call Spike Direct</div>
                <a href="tel:4168905899" className="text-sm font-bold text-cyan-600 hover:text-cyan-500">416-890-5899</a>
              </div>
              {step === "browse" && (
                <button
                  onClick={() => setStep(cart.length > 0 ? "cart" : "form")}
                  className={`flex items-center gap-2 px-4 py-2.5 font-black text-xs uppercase tracking-widest rounded-xl transition-all ${
                    cart.length > 0
                      ? "bg-cyan-500 hover:bg-cyan-400 text-white"
                      : "bg-marine-900 hover:bg-marine-800 text-white"
                  }`}
                >
                  {cart.length > 0 ? (
                    <><ShoppingCart className="w-4 h-4" /> Review Cart ({cart.length})</>
                  ) : (
                    <><ClipboardList className="w-4 h-4" /> Reserve Assessment</>
                  )}
                </button>
              )}
              {step === "cart" && (
                <button
                  onClick={() => setStep("form")}
                  className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  <ClipboardList className="w-4 h-4" /> Reserve Assessment
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
