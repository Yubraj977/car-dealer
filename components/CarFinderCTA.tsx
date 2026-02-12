"use client";

import Link from "next/link";
import { Search, ArrowRight, UserCheck, Globe, Handshake, TrendingDown } from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    title: "Tell Us What You Want",
    description: "Share your dream car specs — make, model, budget, color, features. Be as specific or flexible as you like.",
  },
  {
    icon: Globe,
    title: "We Search Nationwide",
    description: "Our team scours auctions, private sellers, dealer networks, and exclusive listings across the country.",
  },
  {
    icon: Handshake,
    title: "We Negotiate For You",
    description: "We handle price negotiations, vehicle inspections, history checks, and all the paperwork.",
  },
  {
    icon: TrendingDown,
    title: "You Save & Drive",
    description: "Get the best deal without the hassle. We deliver the car to your door, inspected and ready to go.",
  },
];

export default function CarFinderCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -tranneutral-y-1/2 tranneutral-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main pitch */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <Search size={16} className="text-accent" />
              <span className="text-accent text-sm font-semibold">Our Unique Service</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
              Can&apos;t Find Your
              <br />
              <span className="gradient-text">Perfect Car?</span>
              <br />
              We&apos;ll Find It For You.
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              Unlike typical dealerships, we go beyond our own lot. Tell us exactly what car you&apos;re looking for — any make, any model, any year — and our expert team will track it down, negotiate the best price, inspect it, and deliver it to your doorstep.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Whether it&apos;s a rare classic, a specific trim you can&apos;t find locally, or simply you don&apos;t have time to shop around — our <strong className="text-primary">Car Finder Concierge</strong> service does the hard work so you don&apos;t have to.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/find-my-car"
                className="btn-shimmer group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-2xl shadow-xl shadow-red-700/25 hover:shadow-red-700/40 transition-all"
              >
                <Search size={18} />
                Find My Car
                <ArrowRight size={18} className="group-hover:tranneutral-x-1 transition-transform" />
              </Link>
              <span className="text-sm text-muted">Free service — no obligation</span>
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            <h3 className="text-2xl font-bold mb-2">How We Work For You</h3>
            <p className="text-neutral-400 text-sm mb-8">A better way to buy a car</p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { value: "Any Make", label: "Any Model" },
                { value: "Fast", label: "Turnaround" },
                { value: "Save $$$", label: "We Negotiate" },
                { value: "Free", label: "No Obligation" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 bg-white/5 rounded-2xl">
                  <p className="text-2xl font-bold text-accent-light">{stat.value}</p>
                  <p className="text-xs text-neutral-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-sm text-neutral-300 italic">
                &ldquo;Buying a car should feel straightforward, comfortable, and enjoyable. That&apos;s why we created The Auto Room — to do things the right way.&rdquo;
              </p>
              <p className="text-xs text-accent-light mt-2 font-medium">— The Auto Room Team</p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-primary">How Car Finder Works</h3>
          <p className="text-muted mt-2">Four simple steps to your dream car</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-neutral-200 z-0" />
              )}
              <div className="relative z-10 bg-white border border-neutral-100 rounded-2xl p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-white transition-all">
                  <step.icon size={22} className="text-accent group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Step {index + 1}</span>
                <h4 className="text-base font-bold text-primary mt-1 mb-2">{step.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
