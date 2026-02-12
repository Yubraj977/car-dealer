import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logos/logo.png"
                alt="The Auto Room"
                width={150}
                height={150}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              The car buying experience should feel straightforward, respectful, and transparent. We focus on doing things the right way — one customer and one car at a time.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-accent/20 flex items-center justify-center text-neutral-400 hover:text-accent-light transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/inventory", label: "Browse Inventory" },
                { href: "/find-my-car", label: "Find My Car" },
                { href: "/finance", label: "Financing Options" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
                { href: "/inventory?condition=certified", label: "Certified Pre-Owned" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-400 hover:text-accent-light text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Types */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">Vehicle Types</h3>
            <ul className="space-y-3">
              {["Sedans", "SUVs", "Coupes", "Convertibles", "Electric Vehicles", "Sports Cars"].map((type) => (
                <li key={type}>
                  <Link href="/inventory" className="text-neutral-400 hover:text-accent-light text-sm transition-colors">
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-light mt-0.5 shrink-0" />
                <span className="text-neutral-400 text-sm">1066 Gravel Rd, Suite 14<br />Webster, NY</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent-light shrink-0" />
                <a href="tel:+15852368019" className="text-neutral-400 hover:text-accent-light text-sm transition-colors">
                  (585) 236-8019
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent-light shrink-0" />
                <a href="mailto:info@theautoroomny.com" className="text-neutral-400 hover:text-accent-light text-sm transition-colors">
                  info@theautoroomny.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-accent-light mt-0.5 shrink-0" />
                <div className="text-neutral-400 text-sm">
                  <p>By Appointment</p>
                  <p>&amp; Walk-Ins Welcome</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} The Auto Room. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
                <a key={item} href="#" className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
