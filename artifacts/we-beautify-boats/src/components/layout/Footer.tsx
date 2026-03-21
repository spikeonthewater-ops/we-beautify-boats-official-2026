import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-marine-900 text-gray-300 pt-20 pb-10 border-t border-marine-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <img
                src={`${import.meta.env.BASE_URL}images/logo-wbb.png`}
                alt="We Beautify Boats by Spike"
                className="h-28 w-auto object-contain mix-blend-screen hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Defined service levels. Documented processes. 25 years of freshwater expertise protecting your hull, deck and interior for long-term value.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Our Services", href: "/our-services" },
                { label: "Seasonal Plans", href: "/seasonal-plans" },
                { label: "Our Work Gallery", href: "/our-work" },
                { label: "Meet the Team", href: "/meet-the-team" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Deck Washes", href: "/deck-washes" },
                { label: "Deck Polishing", href: "/deck-polishing" },
                { label: "Hull Washes", href: "/hull-washes" },
                { label: "Bottom Prep", href: "/bottom-prep" },
                { label: "Interior Details", href: "/interior-details" },
                { label: "Protections", href: "/protections" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Serving Toronto, Etobicoke, Mississauga, Oakville, Burlington, Hamilton, and Ontario's freshwater lakes.
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-cyan-400 shrink-0" />
                <a href="tel:4168905899" className="hover:text-white transition-colors">416-890-5899</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                <a href="https://www.webeautifyboats.com/contact-us" className="hover:text-white transition-colors">Contact via website</a>
              </li>
            </ul>
            <div className="mt-8">
              <a
                href="https://www.webeautifyboats.com/book-spike"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl font-semibold transition-all duration-300 w-full"
              >
                Book Service
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} We Beautify Boats by Spike. All rights reserved.
          </p>
          <p className="text-sm font-display text-gray-400">
            We Work <span className="text-cyan-500 mx-1">&middot;</span> You Play
          </p>
        </div>
      </div>
    </footer>
  );
}
