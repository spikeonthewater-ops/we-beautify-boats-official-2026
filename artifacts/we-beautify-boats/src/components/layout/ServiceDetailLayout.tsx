import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface ServiceDetailLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  image: string;
}

export function ServiceDetailLayout({ title, subtitle, description, bullets, image }: ServiceDetailLayoutProps) {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/our-services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-600 transition-colors mb-12 font-medium">
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-marine-900 mb-4">{title}</h1>
              <h2 className="text-2xl text-cyan-600 font-medium">{subtitle}</h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-border">
              <h3 className="text-xl font-display font-bold text-marine-900 mb-6">Service Inclusions</h3>
              <ul className="space-y-4">
                {bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-cyan-500 shrink-0" />
                    <span className="text-marine-800 font-medium leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <a
                href="https://www.webeautifyboats.com/book-spike"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-marine-900 hover:bg-cyan-500 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:-translate-y-1"
              >
                Book This Service
              </a>
            </div>
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
              <div className="absolute inset-0 bg-marine-900/10 mix-blend-overlay"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10 animate-pulse"></div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
