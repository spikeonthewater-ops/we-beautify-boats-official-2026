import { motion } from "framer-motion";
import { Link } from "wouter";
import { Anchor, Sparkles, Droplets, ShieldCheck, ArrowRight, Star, ClipboardList } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";
import PageMeta from "@/components/PageMeta";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const SERVICES = [
  {
    title: "Deck & Exterior",
    desc: "Deck washing, polishing, and marine surface protection. Removes oxidation and UV damage.",
    icon: Sparkles,
    href: "/deck-washes",
    image: "service-deck.png"
  },
  {
    title: "Hull & Bottom",
    desc: "Hull washing, bottom preparation, and hull polishing for Ontario's freshwater lakes.",
    icon: Anchor,
    href: "/hull-washes",
    image: "service-hull.png"
  },
  {
    title: "Interior Detailing",
    desc: "Precision vacuuming, surface cleaning, mold prevention, and odor elimination.",
    icon: Droplets,
    href: "/interior-details",
    image: "service-interior.png"
  },
  {
    title: "Protections",
    desc: "Antifouling coatings, Spike's PT protection, and wax systems matched to your usage.",
    icon: ShieldCheck,
    href: "/protections",
    image: "hero-bg.png" // reusing as abstract background
  }
];

export default function Home() {
  const { openQuote } = useQuote();
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Spike On The Water | Mobile Boat & Yacht Detailing in Ontario"
        description="Mobile yacht & boat detailing across Ontario — deck washes, hull polishing, interior detailing & protection. Workshops & Training Series 100–300. Call Spike: 416-890-5899."
        path="/"
      />
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Luxury yacht on a lake"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-marine-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-marine-900 via-marine-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            {/* Prominent logo */}
            <motion.div variants={fadeIn} className="flex justify-center mb-6">
              <img
                src={`${import.meta.env.BASE_URL}images/logo-wbb.png`}
                alt="We Beautify Boats by Spike"
                className="h-48 md:h-64 lg:h-72 w-auto object-contain mix-blend-screen drop-shadow-2xl"
              />
            </motion.div>

            <motion.div variants={fadeIn} className="flex justify-center mb-6">
              <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold tracking-wide backdrop-blur-md">
                Ontario's Premier Mobile Marine Service
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Professional Yacht & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Boat Detailing</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Defined service levels. Documented processes. 25 years of freshwater expertise protecting your hull, deck and interior for long-term value.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openQuote()}
                className="px-8 py-4 w-full sm:w-auto rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-lg shadow-[0_0_30px_rgba(120,60,200,0.4)] hover:shadow-[0_0_40px_rgba(120,60,200,0.6)] transition-all hover:-translate-y-1"
              >
                Quote Your Boat
              </button>
              <Link
                href="/our-services"
                className="px-8 py-4 w-full sm:w-auto rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-lg backdrop-blur-md transition-all hover:-translate-y-1"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Area Banner */}
      <section className="bg-marine-800 border-y border-white/5 py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white font-display font-semibold text-lg">100% Satisfaction Rate</h3>
                <p className="text-cyan-400/80 text-sm">On Delivery Day</p>
              </div>
            </div>
            <div className="h-px w-full md:h-12 md:w-px bg-white/10"></div>
            <p className="text-gray-300 text-center md:text-left text-sm lg:text-base font-medium leading-relaxed max-w-2xl">
              Serving <span className="text-white font-bold">Toronto, Etobicoke, Mississauga, Oakville, Burlington, Hamilton</span>, and marinas across Lake Ontario and Ontario's freshwater lakes.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-marine-900 mb-4">Our Core Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We run a marine service system delivered by trained technicians working inside strict scopes and safety standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-3xl overflow-hidden bg-white shadow-xl shadow-black/5 border border-border hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className="absolute inset-0 h-48 overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}images/${service.image}`}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                </div>
                <div className="relative pt-36 p-8 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-marine-900 flex items-center justify-center mb-6 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-marine-900 mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">{service.desc}</p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-cyan-600 font-bold hover:text-cyan-500 transition-colors w-fit group/link"
                  >
                    Explore Service 
                    <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-marine relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          {/* Abstract circle decor */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-cyan-500/30"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border border-cyan-500/30"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Protect Your Investment?
          </h2>
          <p className="text-xl text-cyan-100/80 mb-10 font-light">
            Book Spike directly or chat with our AI assistant for a prompt response.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => openQuote()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-lg shadow-[0_0_20px_rgba(120,60,200,0.3)] transition-transform hover:-translate-y-1"
            >
              <ClipboardList className="w-5 h-5" /> Reserve Assessment
            </button>
            <a
              href="https://wa.me/14168905899"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white hover:bg-gray-50 text-marine-900 font-bold text-lg shadow-lg transition-transform hover:-translate-y-1"
            >
              WhatsApp Spike
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
