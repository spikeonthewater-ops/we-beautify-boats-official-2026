import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Plus } from "lucide-react";

const SERVICES_LIST = [
  {
    id: "01",
    title: "Deck & Exterior",
    subtitle: "Transforming and Maintaining Excellence on Your Deck",
    desc: "Professional deck washing, deck polishing, and marine surface protection services for freshwater boats operating in Ontario. We remove tannin staining, oxidation, embedded contaminants, and UV damage.",
    features: [
      "Defined service levels with documented scope",
      "Non-skid safe cleaning methods",
      "Gelcoat oxidation measurement before polishing",
      "Controlled product application"
    ],
    links: [
      { name: "Deck Washes", href: "/deck-washes" },
      { name: "Deck & Hull Polishing", href: "/deck-polishing" }
    ],
    img: "service-deck.png"
  },
  {
    id: "02",
    title: "Hull & Bottom",
    subtitle: "Elevating Hull Care to Artistry",
    desc: "Freshwater hull washing, topsides polishing, and bottom preparation. We eliminate organic staining, algae buildup, and surface oxidation — and restore gelcoat brilliance from a light maintenance polish all the way to a wet-sanded mirror finish.",
    features: [
      "Hull Wash Levels 1–3",
      "Topsides Polishing Levels 1–5",
      "Bottom Prep Levels 1–4",
      "Freshwater-specific staining & oxidation protocols"
    ],
    links: [
      { name: "Hull Washes", href: "/hull-washes" },
      { name: "Hull & Topsides Polishing", href: "/deck-polishing" },
      { name: "Bottom Prep", href: "/bottom-prep" }
    ],
    img: "service-hull.png"
  },
  {
    id: "03",
    title: "Interior",
    subtitle: "Revitalizing Your Yacht's Interior with Meticulous Care",
    desc: "Our interior detailing tackles general filth, mold, and daily wear. It's a meticulous process where our expertise shines, restoring brilliance to even the most neglected cabins.",
    features: [
      "Precision vacuuming and extraction",
      "Surface sanitization",
      "Mold and mildew prevention",
      "Odor elimination systems"
    ],
    links: [
      { name: "Interior Details", href: "/interior-details" }
    ],
    img: "service-interior.png"
  },
  {
    id: "04",
    title: "Protections",
    subtitle: "Long-term Value Preservation",
    desc: "Advanced marine surface protection systems matched to your usage patterns. We apply industry-leading sealants and coatings to defend against the elements.",
    features: [
      "Ceramic coating applications",
      "Marine-grade polymer sealants",
      "Teak oiling and sealing",
      "UV resistance treatments"
    ],
    links: [
      { name: "View Protections", href: "/protections" }
    ],
    img: "hero-bg.png"
  }
];

const EXTRAS_PREVIEW = [
  "Wet Sanding Spots",
  "Engine Bay Cleaning",
  "Exterior Wood Refinishing",
  "Tender Tubes Cleaning & Protection",
  "Storm Line Check",
  "Erect Canvas Service",
  "Shrink Wrap Removal",
  "Decal & Stripe Removal",
  "Vinyl Recoloring",
  "Propeller Polishing",
  "Brightwork Polishing & Conditioning",
  "Teak Deck Maintenance",
];

export default function Services() {
  return (
    <div className="pt-24 min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-marine-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">Our 4 Areas of Attention</h1>
          <p className="text-xl text-cyan-100/80 font-light leading-relaxed">
            More than just cleaning... it's the art of preserving and enhancing every element of your vessel, ensuring it looks and performs its best on the water.
          </p>
        </motion.div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="space-y-32">
          {SERVICES_LIST.map((service, index) => (
            <div key={service.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image side */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full lg:w-1/2"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/${service.img}`} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border border-white/20 rounded-3xl z-10"></div>
                </div>
              </motion.div>

              {/* Content side */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full lg:w-1/2 space-y-6"
              >
                <div className="text-cyan-500 font-display font-bold text-6xl opacity-20">{service.id}</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-marine-900">{service.title}</h2>
                <h3 className="text-xl text-cyan-600 font-medium">{service.subtitle}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{service.desc}</p>
                
                <ul className="space-y-3 py-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-cyan-500 shrink-0" />
                      <span className="text-marine-800 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4 pt-4">
                  {service.links.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-marine-900 text-white font-semibold hover:bg-cyan-500 transition-colors shadow-lg"
                    >
                      {link.name}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Extra Services Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28 bg-marine-900 rounded-3xl overflow-hidden"
        >
          <div className="p-10 md:p-14">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="flex-1">
                <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs block mb-3">
                  Beyond Standard Detailing
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Extra Services
                </h2>
                <p className="text-gray-300 leading-relaxed max-w-xl mb-8">
                  Targeted, expert solutions addressing specific vessel components, specialized restorations, and environmental compliance. Available as standalone appointments or add-ons to any booking.
                </p>
                <Link
                  href="/extra-services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25"
                >
                  View All Extra Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="w-full lg:w-auto lg:min-w-[340px]">
                <div className="grid grid-cols-2 gap-2">
                  {EXTRAS_PREVIEW.map((name) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-3 py-2.5"
                    >
                      <Plus className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-sm text-gray-200 font-medium leading-tight">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
