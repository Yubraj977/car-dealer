import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight, MapPin, Calendar } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
              alt="Luxury car on road"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/85" />
          </div>

          {/* Content */}
          <div className="relative z-10 py-20 px-8 md:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-8 border border-white/10">
                <Calendar size={16} />
                Schedule a Test Drive Today
              </span>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to Drive Your
                <br />
                Dream Car Home?
              </h2>

              <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-2xl mx-auto">
                Visit The Auto Room or let us find the exact car you&apos;re looking for. Our hands-on team is ready to help you find the right vehicle — the straightforward way.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link
                  href="/inventory"
                  className="btn-shimmer group flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-2xl shadow-lg shadow-accent/25 transition-all"
                >
                  Browse Inventory
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/10 transition-all"
                >
                  <Phone size={18} />
                  Contact Us
                </Link>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { icon: Phone, label: "Call Us", value: "(585) 236-8019" },
                  { icon: MapPin, label: "Visit Us", value: "Webster, NY" },
                  { icon: Calendar, label: "Hours", value: "By Appointment" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                    <Icon size={20} className="text-accent shrink-0" />
                    <div className="text-left">
                      <p className="text-xs text-white/40">{label}</p>
                      <p className="text-sm font-medium text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
