import Link from "next/link";
import { Phone, ArrowRight, MapPin, Calendar } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80')] bg-cover bg-center opacity-10" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-accent-light text-sm font-medium mb-8">
            <Calendar size={16} />
            Schedule a Test Drive Today
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Drive Your
            <br />
            <span className="gradient-text">Dream Car Home?</span>
          </h2>

          <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Visit our showroom today or schedule a private viewing. Our expert team is ready to help you find the perfect vehicle that matches your lifestyle and budget.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/inventory"
              className="btn-shimmer group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
            >
              Browse Inventory
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <Phone size={18} />
              Contact Us
            </Link>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Phone, label: "Call Us", value: "(555) 123-4567" },
              { icon: MapPin, label: "Visit Us", value: "Beverly Hills, CA" },
              { icon: Calendar, label: "Hours", value: "Mon-Sat 9AM-8PM" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <Icon size={20} className="text-accent-light shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-sm font-medium text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
