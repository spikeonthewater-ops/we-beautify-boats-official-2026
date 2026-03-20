import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

interface ServiceLevel {
  label: string;
  name: string;
  description: string;
}

interface ServiceOption {
  name: string;
  description: string;
}

interface ServiceDetailLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  levels?: ServiceLevel[];
  options?: ServiceOption[];
}

const LEVEL_COLORS = [
  "border-l-cyan-300 bg-cyan-50",
  "border-l-cyan-400 bg-cyan-50",
  "border-l-cyan-500 bg-cyan-100",
  "border-l-purple-500 bg-purple-50",
  "border-l-purple-700 bg-purple-100",
];

const LEVEL_NUMBER_COLORS = [
  "text-cyan-300",
  "text-cyan-400",
  "text-cyan-500",
  "text-purple-500",
  "text-purple-700",
];

export function ServiceDetailLayout({
  title,
  subtitle,
  description,
  image,
  levels,
  options,
}: ServiceDetailLayoutProps) {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          href="/our-services"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-600 transition-colors mb-12 font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-marine-900 mb-4">
                {title}
              </h1>
              <h2 className="text-2xl text-cyan-600 font-medium">{subtitle}</h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>

            {/* Level-based services */}
            {levels && levels.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-display font-bold text-marine-900 mb-4">
                  Service Levels
                </h3>
                {levels.map((level, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`border-l-4 pl-5 pr-4 py-4 rounded-r-2xl ${LEVEL_COLORS[i] ?? "border-l-gray-400 bg-gray-50"}`}
                  >
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className={`text-3xl font-display font-black leading-none ${LEVEL_NUMBER_COLORS[i] ?? "text-gray-400"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {level.label}
                        </span>
                        <h4 className="text-base font-display font-bold text-marine-900 leading-tight">
                          {level.name}
                        </h4>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1 ml-10">
                      {level.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Named options (for Protections) */}
            {options && options.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-display font-bold text-marine-900 mb-4">
                  Protection Options
                </h3>
                {options.map((opt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white border border-border rounded-2xl px-6 py-4 shadow-sm hover:shadow-md hover:border-cyan-500/30 transition-all"
                  >
                    <h4 className="font-display font-bold text-marine-900 text-base mb-1">
                      {opt.name}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {opt.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            <a
              href="https://www.webeautifyboats.com/book-spike"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-marine-900 hover:bg-cyan-500 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:-translate-y-1"
            >
              Book This Service
            </a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative lg:sticky lg:top-32"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] relative">
              <img
                src={`${import.meta.env.BASE_URL}images/${image}`}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-marine-900/10 mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10 animate-pulse" />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
