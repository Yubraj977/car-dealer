"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Shield, Clock, DollarSign, UserCheck } from "lucide-react";

export default function HeroSection() {
  const [carRequest, setCarRequest] = useState("");

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 bg-accent/90 rounded-full mb-8">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-sm font-medium tracking-wide">Now Open in Webster, NY</span>
            </div>

            <h1 className="animate-fade-in-up delay-100 text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Tell Us What
              <br />
              You Want.
              <br />
              We&apos;ll Find It.
            </h1>

            <div className="animate-fade-in-up delay-150 w-16 h-1 bg-accent rounded-full mb-6" />

            <p className="animate-fade-in-up delay-200 text-lg text-neutral-300 max-w-lg mb-8 leading-relaxed">
              More than a dealership — we&apos;re your personal car-finding concierge. Tell us the car you want, and our team will track it down and get it to you in Webster, NY.
            </p>

            {/* Stats Row */}
            <div className="animate-fade-in-up delay-300 flex items-center gap-8 mb-10">
              {[
                { value: "Any Car", label: "We'll Find It" },
                { value: "Honest", label: "Transparent Pricing" },
                { value: "Free", label: "Car Finder Service" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-neutral-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-400 flex flex-wrap items-center gap-4">
              <Link
                href="/find-my-car"
                className="btn-shimmer group flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-2xl shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all"
              >
                <Search size={18} />
                Find My Car
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/inventory"
                className="group flex items-center gap-3 px-6 py-4 text-white font-medium rounded-2xl border border-white/25 hover:bg-white/10 transition-all"
              >
                Browse Our Inventory
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Right - Car Finder Quick Card */}
          <div className="animate-fade-in-up delay-300 hidden lg:block">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <UserCheck size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-primary font-semibold text-lg">Car Finder Concierge</h3>
                  <p className="text-muted text-sm">Tell us — we&apos;ll handle the rest</p>
                </div>
              </div>

              {/* How it works mini */}
              <div className="space-y-3 mb-6">
                {[
                  { num: "1", text: "Tell us the car you want — any make, model, budget" },
                  { num: "2", text: "We search nationwide: auctions, dealers, private sellers" },
                  { num: "3", text: "We negotiate, inspect & handle all paperwork" },
                  { num: "4", text: "Your car is delivered to your doorstep" },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {step.num}
                    </span>
                    <p className="text-muted text-sm leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>

              {/* Quick request */}
              <div className="mb-4">
                <label className="text-muted text-xs font-medium uppercase tracking-wider mb-1.5 block">What car are you looking for?</label>
                <input
                  type="text"
                  value={carRequest}
                  onChange={(e) => setCarRequest(e.target.value)}
                  placeholder='e.g. "2020 BMW M3 under $60K"'
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-primary text-sm placeholder:text-neutral-400 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>

              <Link
                href="/find-my-car"
                className="btn-shimmer w-full flex items-center justify-center gap-2 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl shadow-lg shadow-accent/20 transition-all"
              >
                <Search size={18} />
                Start My Search — It&apos;s Free
              </Link>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-6 mt-5 pt-5 border-t border-neutral-100">
                {[
                  { icon: Shield, label: "No Obligation" },
                  { icon: Clock, label: "24hr Updates" },
                  { icon: DollarSign, label: "Save Thousands" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-muted text-xs">
                    <Icon size={14} className="text-accent" />
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
