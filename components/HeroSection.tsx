import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, MapPin, Phone, Star, Car, ShieldCheck, Handshake, CheckCircle2 } from "lucide-react";

const TRUST_ITEMS = [
  { icon: ShieldCheck, value: "150+", label: "Vehicles In Stock" },
  { icon: Star, value: "4.9★", label: "Customer Rating" },
  { icon: Handshake, value: "1000+", label: "Happy Customers" },
  { icon: Car, value: "Free", label: "Car Finder Service" },
];

export default function HeroSection() {

  return (
    <section className="relative flex flex-col overflow-hidden bg-white">
      {/* Top Bar */}
      <div className="border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-muted">
              <MapPin size={14} className="text-accent" />
              Webster, NY
            </span>
            <span className="flex items-center gap-1.5 text-muted">
              <Phone size={14} className="text-accent" />
              (585) 555-0123
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-muted">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span>Rated 4.9/5 by 1000+ customers</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-14 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Left - Content (7 cols) */}
            <div className="lg:col-span-7">
              <div className="animate-fade-in-up inline-flex items-center gap-2 px-5 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-accent text-sm font-semibold tracking-wide">The Auto Room — Webster, NY</span>
              </div>

              <h1 className="animate-fade-in-up delay-100 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-[1.08] mb-5">
                Find Your Perfect
                <br />
                <span className="gradient-text">Car Today</span>
              </h1>

              <p className="animate-fade-in-up delay-200 text-lg text-muted max-w-lg mb-8 leading-relaxed">
                Premium vehicles, honest pricing, and a car-finding concierge that does the hard work for you.
              </p>

              {/* Search Bar */}
              <div className="animate-fade-in-up delay-300 max-w-xl mb-8">
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-neutral-200/60 border border-neutral-200 overflow-hidden">
                  <Search size={20} className="absolute left-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by make, model, or keyword..."
                    className="w-full pl-13 pr-4 py-4.5 text-primary text-base placeholder:text-neutral-400 focus:outline-none"
                  />
                  <Link
                    href="/inventory"
                    className="flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-6 py-2.5 mr-2 rounded-xl transition-colors whitespace-nowrap"
                  >
                    Search
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="animate-fade-in-up delay-400 flex flex-wrap items-center gap-4">
                <Link
                  href="/inventory"
                  className="btn-shimmer group flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-2xl shadow-lg shadow-accent/20 transition-all"
                >
                  Browse Inventory
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/find-my-car"
                  className="group flex items-center gap-2 px-8 py-4 text-primary font-semibold rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                >
                  <Search size={18} />
                  Car Finder Service
                </Link>
              </div>
            </div>

            {/* Right - Image (5 cols) */}
            <div className="animate-fade-in-up delay-300 hidden lg:block lg:col-span-5">
              <div className="relative">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-3/4">
                  <Image
                    src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80"
                    alt="Red luxury sports car"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/30 to-transparent" />
                </div>

                {/* Secondary Image - overlapping bottom-left */}
                <div className="absolute -bottom-8 -left-8 w-44 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80"
                    alt="Premium car front view"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Rating Card - top right */}
                <div className="absolute -top-3 -right-3 bg-white rounded-2xl py-3 px-4 shadow-lg border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <div>
                      <p className="text-primary font-bold text-sm leading-none">4.9/5</p>
                      <p className="text-muted text-[10px]">1,000+ reviews</p>
                    </div>
                  </div>
                </div>

                {/* Verified Card - mid-left */}
                <div className="absolute top-1/2 -left-5 -translate-y-1/2 bg-white rounded-xl py-2.5 px-3.5 shadow-lg border border-neutral-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-primary text-xs font-semibold">150-Point Inspected</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_ITEMS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-primary font-bold text-lg leading-tight">{value}</p>
                  <p className="text-muted text-xs">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
