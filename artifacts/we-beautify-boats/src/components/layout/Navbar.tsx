import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useQuote } from "@/context/QuoteContext";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/our-services", label: "Services" },
  { href: "/workshops", label: "Workshops" },
  { href: "/seasonal-plans", label: "Seasonal Plans" },
  { href: "/our-work", label: "Our Work" },
  { href: "/meet-the-team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { openQuote } = useQuote();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled || mobileMenuOpen
            ? "bg-marine-900/95 backdrop-blur-md shadow-lg border-white/10 py-3"
            : "bg-marine-900/50 backdrop-blur-sm py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src={`${import.meta.env.BASE_URL}images/logo-wbb.png`}
              alt="We Beautify Boats Logo"
              className="h-16 w-auto object-contain mix-blend-screen group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/"
                ? location === "/"
                : location === link.href || location.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-cyan-400 rounded-full",
                    isActive ? "text-cyan-400" : "text-gray-300"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:4168905899"
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>416-890-5899</span>
            </a>
            <button
              onClick={() => openQuote()}
              className="px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-sm shadow-[0_0_20px_rgba(120,60,200,0.3)] hover:shadow-[0_0_25px_rgba(120,60,200,0.5)] transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-marine-900 pt-24 px-4 pb-6 flex flex-col lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-2 flex-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-4 text-lg font-medium border-b border-white/10 transition-colors",
                    location === link.href ? "text-cyan-400" : "text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <a
                href="tel:4168905899"
                className="flex items-center justify-center gap-2 py-4 text-white border border-white/20 rounded-xl"
              >
                <PhoneCall className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">Call 416-890-5899</span>
              </a>
              <button
                onClick={() => { openQuote(); }}
                className="flex items-center justify-center py-4 bg-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/25"
              >
                Get Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
