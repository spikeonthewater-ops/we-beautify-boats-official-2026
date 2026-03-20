import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PLANS = [
  {
    title: "Always Ready Weekly Plan",
    desc: "Weekly wash and check for instant use. Your boat, always ready—every week, every wave, anywhere in Ontario!",
    price: "From CA$9,900",
    duration: "Season",
    features: [
      "Weekly exterior washdown",
      "System condition checks",
      "Instant readiness guarantee",
      "Priority scheduling",
      "15% seasonal discount applied"
    ],
    highlight: true
  },
  {
    title: "Bi-Weekly Full Plan",
    desc: "Every other week cleaning and check. Maintain cleanliness and monitor condition consistently.",
    price: "From CA$5,500",
    duration: "Season",
    features: [
      "Bi-weekly exterior detail",
      "Routine interior touchups",
      "Consistent protection upkeep",
      "15% seasonal discount applied"
    ],
    highlight: false
  },
  {
    title: "Launch Ready Plan",
    desc: "Comprehensive pre-season preparation to start your summer right.",
    price: "Custom Quote",
    duration: "One-time",
    features: [
      "Deep hull compounding & polish",
      "Full deck wash & wax",
      "Interior reset detailing",
      "Bottom prep & coating checks"
    ],
    highlight: false
  },
  {
    title: "Haul-Out Plan",
    desc: "End of season deep clean and protection for winter storage.",
    price: "Custom Quote",
    duration: "One-time",
    features: [
      "Algae and stain removal",
      "Winterization protection coat",
      "Interior moisture prevention",
      "Storage prep protocol"
    ],
    highlight: false
  }
];

export default function SeasonalPlans() {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-marine-900 mb-6"
          >
            Seasonal Service Plans
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Your boat's needs change with the seasons—and we're ready for all of them. 
            Enjoy a structured maintenance program with our exact <span className="font-bold text-cyan-600">15% seasonal discount</span> built in.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className={`relative flex flex-col p-8 rounded-3xl border ${
                plan.highlight 
                  ? 'bg-marine-900 text-white border-marine-800 shadow-2xl shadow-marine-900/30' 
                  : 'bg-white text-marine-900 border-border shadow-lg shadow-black/5'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-2xl font-display font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-marine-900'}`}>
                  {plan.title}
                </h3>
                <p className={`text-sm leading-relaxed min-h-[60px] ${plan.highlight ? 'text-gray-300' : 'text-muted-foreground'}`}>
                  {plan.desc}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold font-display tracking-tight ${plan.highlight ? 'text-cyan-400' : 'text-marine-900'}`}>
                    {plan.price}
                  </span>
                </div>
                <span className={`text-sm ${plan.highlight ? 'text-cyan-100/60' : 'text-muted-foreground'}`}>
                  per {plan.duration}
                </span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-cyan-400' : 'text-cyan-500'}`} />
                    <span className={`text-sm font-medium ${plan.highlight ? 'text-gray-200' : 'text-marine-800'}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="https://www.webeautifyboats.com/book-spike"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-marine-100 hover:bg-marine-900 hover:text-white text-marine-900'
                }`}
              >
                Book This Plan
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
