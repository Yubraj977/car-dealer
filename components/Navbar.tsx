"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Car, Search } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/find-my-car", label: "Find My Car" },
  { href: "/finance", label: "Financing" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <span className="text-slate-300">By Appointment &amp; Walk-Ins Welcome</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+15852368019" className="flex items-center gap-1.5 text-accent-light hover:text-accent transition-colors">
              <Phone size={14} />
              (585) 236-8019
            </a>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">1066 Gravel Rd, Suite 14, Webster, NY</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                <Car size={24} className="text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-primary tracking-tight">THE AUTO</span>
                <span className="text-xl font-light text-muted ml-1">ROOM</span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted -mt-0.5">Webster, NY</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary rounded-lg hover:bg-slate-50 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+15852368019"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary border border-slate-200 rounded-xl hover:border-primary/20 hover:bg-slate-50 transition-all"
              >
                <Phone size={16} />
                Call Us
              </a>
              <Link
                href="/find-my-car"
                className="btn-shimmer flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-accent to-accent-light text-white text-sm font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
              >
                <Search size={15} />
                Find My Car
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-6 space-y-1 border-t border-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 space-y-2">
              <a
                href="tel:+15852368019"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-primary border border-slate-200 rounded-xl"
              >
                <Phone size={16} />
                (585) 236-8019
              </a>
              <Link
                href="/find-my-car"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-accent to-accent-light text-white text-sm font-semibold rounded-xl"
              >
                <Search size={16} />
                Find My Car
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
