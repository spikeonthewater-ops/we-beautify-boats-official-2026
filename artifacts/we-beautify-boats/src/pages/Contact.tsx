import { motion } from "framer-motion";
import { Phone, MessageCircle, Clock, MapPin, CalendarClock, ArrowUpRight } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";
import PageMeta from "@/components/PageMeta";

export default function Contact() {
  const { openQuote } = useQuote();
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <PageMeta
        title="Contact & Book | Spike On The Water (Ontario)"
        description="Book Ontario's top mobile boat detailer. Call Spike at 416-890-5899 or WhatsApp — serving Toronto, Oakville, Burlington & Hamilton marinas. Reserve your assessment today."
        path="/contact"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Before we meet your boat</span>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-marine-900 mb-6">Let's Talk Details.</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Feel free to reach out anytime with your boat detailing inquiries. For a prompt response and personalized assistance, give Spike a call directly.
              </p>
            </div>

            <div className="space-y-6 bg-white p-8 rounded-3xl border border-border shadow-lg shadow-black/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-marine-900 text-lg mb-1">Direct Line & WhatsApp</h3>
                  <a href="tel:4168905899" className="text-2xl font-bold text-cyan-600 hover:text-cyan-500 transition-colors">
                    416-890-5899
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    * Phone calls are preferred over text messages for the best service experience.
                  </p>
                </div>
              </div>

              <hr className="border-border" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-marine-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-marine-900" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-marine-900 text-lg mb-1">Service Area</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Toronto, Etobicoke, Mississauga, Oakville, Burlington, Hamilton, and marinas across Lake Ontario.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Cards Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Book Now Card */}
            <button
              onClick={() => openQuote()}
              className="group flex items-center p-8 bg-marine-900 rounded-3xl hover:bg-marine-800 transition-colors shadow-xl shadow-marine-900/20 w-full text-left"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <CalendarClock className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-2xl font-display font-bold text-white">Book Spike Now</h3>
                </div>
                <p className="text-gray-300">Schedule your expert boat service online. Innovation meets precision.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-6 h-6 text-cyan-400" />
              </div>
            </button>

            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/14168905899"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center p-8 bg-cyan-500 rounded-3xl hover:bg-cyan-400 transition-colors shadow-xl shadow-cyan-500/20"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-6 h-6 text-white" />
                  <h3 className="text-2xl font-display font-bold text-white">WhatsApp Spike</h3>
                </div>
                <p className="text-cyan-50 font-medium">Message Spike directly on WhatsApp — quick answers, no hold times.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
            </a>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
