"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, ChevronDown, ArrowRight, Play, Shield, Award, Star } from "lucide-react";
import { makes, bodyTypes } from "@/lib/data";

export default function HeroSection() {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (bodyType) params.set("bodyType", bodyType);
    if (priceRange) params.set("priceRange", priceRange);
    router.push(`/inventory?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
          alt="Luxury car"
          fill
          className="object-cover"
          priority
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float delay-200" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <span className="w-2 h-2 bg-accent-light rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">#1 Rated Luxury Dealer in California</span>
            </div>

            <h1 className="animate-fade-in-up delay-100 text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Find Your
              <br />
              <span className="gradient-text">Dream Car</span>
              <br />
              Today
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg text-slate-300 max-w-lg mb-8 leading-relaxed">
              Discover an unparalleled collection of premium vehicles. From luxury sedans to exotic supercars, your perfect ride awaits.
            </p>

            {/* Stats Row */}
            <div className="animate-fade-in-up delay-300 flex items-center gap-8 mb-10">
              {[
                { value: "500+", label: "Premium Cars" },
                { value: "15K+", label: "Happy Clients" },
                { value: "20+", label: "Years Trust" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-400 flex flex-wrap items-center gap-4">
              <button
                onClick={() => router.push("/inventory")}
                className="btn-shimmer group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
              >
                Explore Inventory
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group flex items-center gap-3 px-6 py-4 text-white font-medium rounded-2xl border border-white/20 hover:bg-white/10 transition-all">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                  <Play size={16} fill="white" />
                </div>
                Watch Tour
              </button>
            </div>
          </div>

          {/* Right - Search Card */}
          <div className="animate-fade-in-up delay-300 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Search size={20} className="text-accent-light" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Quick Search</h3>
                  <p className="text-slate-400 text-sm">Find your perfect match</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Make</label>
                  <select
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-800">All Makes</option>
                    {makes.map((m) => (
                      <option key={m} value={m} className="bg-slate-800">{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Body Type</label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-800">All Types</option>
                    {bodyTypes.map((b) => (
                      <option key={b} value={b} className="bg-slate-800">{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-800">Any Price</option>
                    <option value="0-100000" className="bg-slate-800">Under $100,000</option>
                    <option value="100000-200000" className="bg-slate-800">$100,000 - $200,000</option>
                    <option value="200000-500000" className="bg-slate-800">$200,000+</option>
                  </select>
                </div>

                <button
                  onClick={handleSearch}
                  className="btn-shimmer w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all mt-2"
                >
                  <Search size={18} />
                  Search Vehicles
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10">
                {[
                  { icon: Shield, label: "Verified" },
                  { icon: Award, label: "Certified" },
                  { icon: Star, label: "Top Rated" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <Icon size={14} className="text-accent-light" />
                    {label}
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
