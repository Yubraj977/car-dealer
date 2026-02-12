import Link from "next/link";
import { Car, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center">
                <Car size={24} className="text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">PRESTIGE</span>
                <span className="text-xl font-light text-slate-400 ml-1">MOTORS</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your premier destination for luxury and performance vehicles. We&apos;ve been connecting discerning buyers with exceptional automobiles since 2005.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-accent/20 flex items-center justify-center text-slate-400 hover:text-accent-light transition-all"
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
                { href: "/finance", label: "Financing Options" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
                { href: "/inventory?condition=certified", label: "Certified Pre-Owned" },
                { href: "/inventory?condition=new", label: "New Arrivals" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-accent-light text-sm transition-colors">
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
                  <Link href="/inventory" className="text-slate-400 hover:text-accent-light text-sm transition-colors">
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
                <span className="text-slate-400 text-sm">123 Premium Auto Blvd<br />Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent-light shrink-0" />
                <a href="tel:+15551234567" className="text-slate-400 hover:text-accent-light text-sm transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent-light shrink-0" />
                <a href="mailto:info@prestigemotors.com" className="text-slate-400 hover:text-accent-light text-sm transition-colors">
                  info@prestigemotors.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-accent-light mt-0.5 shrink-0" />
                <div className="text-slate-400 text-sm">
                  <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Prestige Motors. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
                <a key={item} href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
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
