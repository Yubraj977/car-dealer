"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  DollarSign,
  Globe,
  Handshake,
  UserCheck,
  TrendingDown,
  Send,
  Phone,
  Star,
  Truck,
  FileSearch,
  Heart,
} from "lucide-react";

const successStories = [
  {
    name: "David R.",
    location: "San Francisco, CA",
    request: "2019 Porsche 911 GT3 in Miami Blue",
    found: "Found in 3 days",
    saved: "$7,200",
    quote: "I searched for months with no luck. The Auto Room found my exact spec GT3 across the country, negotiated an incredible price, and delivered it to my door. Absolutely incredible service.",
  },
  {
    name: "Jennifer M.",
    location: "Austin, TX",
    request: "2020 Range Rover Autobiography LWB",
    found: "Found in 5 days",
    saved: "$5,800",
    quote: "As a busy mom, I had zero time to car shop. I told them what I wanted, and a week later it was in my driveway. The inspection report gave me total peace of mind.",
  },
  {
    name: "Carlos P.",
    location: "Miami, FL",
    request: "2017 Mercedes-AMG GT R in Green Hell Magno",
    found: "Found in 7 days",
    saved: "$9,400",
    quote: "This is a unicorn car. I didn't think they'd find one in the color I wanted, but they did — and under my budget. I've already told everyone about this service.",
  },
];

export default function FindMyCarPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    // Step 1: What are you looking for
    make: "",
    model: "",
    yearFrom: "",
    yearTo: "",
    budgetMin: "",
    budgetMax: "",
    // Step 2: Preferences
    colorPreference: "",
    mileageMax: "",
    transmission: "",
    fuelType: "",
    features: "",
    mustHaves: "",
    // Step 3: Your info
    name: "",
    email: "",
    phone: "",
    timeline: "",
    notes: "",
  });

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "car-finder",
          name: form.name,
          email: form.email,
          phone: form.phone,
          carDetails: {
            make: form.make,
            model: form.model,
            yearFrom: form.yearFrom,
            yearTo: form.yearTo,
            budgetMin: form.budgetMin,
            budgetMax: form.budgetMax,
            colorPreference: form.colorPreference,
            mileageMax: form.mileageMax,
            transmission: form.transmission,
            fuelType: form.fuelType,
            mustHaves: form.mustHaves,
            features: form.features,
            timeline: form.timeline,
            notes: form.notes,
          },
        }),
      });
      setSubmitted(true);
    } catch {
      // silently fail for user
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <Search size={16} className="text-accent-light" />
              <span className="text-white/80 text-sm font-medium">Car Finder Concierge Service</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Tell Us Your Dream Car.
              <br />
              <span className="gradient-text">We&apos;ll Find It.</span>
            </h1>

            <p className="text-lg text-neutral-300 max-w-xl leading-relaxed mb-8">
              Stop endlessly scrolling listings. Give us your specs, and our nationwide network of contacts, auctions, and dealer relationships will track down the exact car you want — often at a better price than you&apos;d find on your own.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
              {[
                { icon: Shield, text: "100% Free Service" },
                { icon: Clock, text: "Avg. 48hr Find Time" },
                { icon: DollarSign, text: "Save Thousands" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={16} className="text-accent-light" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {submitted ? (
            /* Success State */
            <div className="text-center py-16 animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">Request Submitted!</h2>
              <p className="text-muted text-lg max-w-lg mx-auto mb-8">
                Our car-finding team is on it. You&apos;ll receive a confirmation email shortly, and we&apos;ll start searching immediately. Expect your first update within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/inventory"
                  className="px-8 py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary-light transition-colors"
                >
                  Browse Our Inventory Too
                </Link>
                <button
                  onClick={() => { setSubmitted(false); setStep(1); setForm({ make: "", model: "", yearFrom: "", yearTo: "", budgetMin: "", budgetMax: "", colorPreference: "", mileageMax: "", transmission: "", fuelType: "", features: "", mustHaves: "", name: "", email: "", phone: "", timeline: "", notes: "" }); }}
                  className="px-8 py-4 border border-neutral-200 text-primary font-semibold rounded-2xl hover:bg-neutral-50 transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  {["What You Want", "Your Preferences", "Your Details"].map((label, i) => (
                    <button
                      key={label}
                      onClick={() => setStep(i + 1)}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                        step >= i + 1 ? "text-accent" : "text-neutral-300"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step > i + 1
                            ? "bg-emerald-500 text-white"
                            : step === i + 1
                            ? "bg-accent text-white"
                            : "bg-neutral-100 text-neutral-400"
                        }`}
                      >
                        {step > i + 1 ? <CheckCircle2 size={16} /> : i + 1}
                      </span>
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-500"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1 */}
                {step === 1 && (
                  <div className="animate-fade-in-up">
                    <h2 className="text-2xl font-bold text-primary mb-2">What car are you looking for?</h2>
                    <p className="text-muted mb-8">Be as specific or broad as you&apos;d like. We work with any make and model.</p>

                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Make / Brand *</label>
                          <input
                            type="text"
                            required
                            value={form.make}
                            onChange={(e) => updateForm("make", e.target.value)}
                            placeholder="e.g. BMW, Toyota, Porsche, Any..."
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Model *</label>
                          <input
                            type="text"
                            required
                            value={form.model}
                            onChange={(e) => updateForm("model", e.target.value)}
                            placeholder="e.g. M3 Competition, Camry, 911 GT3..."
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Year From</label>
                          <input
                            type="text"
                            value={form.yearFrom}
                            onChange={(e) => updateForm("yearFrom", e.target.value)}
                            placeholder="e.g. 2018"
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Year To</label>
                          <input
                            type="text"
                            value={form.yearTo}
                            onChange={(e) => updateForm("yearTo", e.target.value)}
                            placeholder="e.g. 2024"
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Min Budget</label>
                          <input
                            type="text"
                            value={form.budgetMin}
                            onChange={(e) => updateForm("budgetMin", e.target.value)}
                            placeholder="e.g. $20,000"
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Max Budget *</label>
                          <input
                            type="text"
                            required
                            value={form.budgetMax}
                            onChange={(e) => updateForm("budgetMax", e.target.value)}
                            placeholder="e.g. $50,000"
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors"
                      >
                        Next: Preferences <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="animate-fade-in-up">
                    <h2 className="text-2xl font-bold text-primary mb-2">Your preferences</h2>
                    <p className="text-muted mb-8">Help us narrow down the perfect match. All fields are optional.</p>

                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Color Preference</label>
                          <input
                            type="text"
                            value={form.colorPreference}
                            onChange={(e) => updateForm("colorPreference", e.target.value)}
                            placeholder="e.g. Black, White, Any dark color..."
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Max Mileage</label>
                          <input
                            type="text"
                            value={form.mileageMax}
                            onChange={(e) => updateForm("mileageMax", e.target.value)}
                            placeholder="e.g. 50,000 miles"
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Transmission</label>
                          <select
                            value={form.transmission}
                            onChange={(e) => updateForm("transmission", e.target.value)}
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          >
                            <option value="">No preference</option>
                            <option value="automatic">Automatic</option>
                            <option value="manual">Manual</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Fuel Type</label>
                          <select
                            value={form.fuelType}
                            onChange={(e) => updateForm("fuelType", e.target.value)}
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          >
                            <option value="">No preference</option>
                            <option value="gasoline">Gasoline</option>
                            <option value="diesel">Diesel</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="electric">Electric</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Must-Have Features</label>
                        <input
                          type="text"
                          value={form.mustHaves}
                          onChange={(e) => updateForm("mustHaves", e.target.value)}
                          placeholder="e.g. Sunroof, Leather seats, Apple CarPlay, Navigation..."
                          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Anything Else?</label>
                        <textarea
                          rows={3}
                          value={form.features}
                          onChange={(e) => updateForm("features", e.target.value)}
                          placeholder="e.g. Prefer single owner, no accidents, specific trim level..."
                          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 text-muted font-medium hover:text-primary transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors"
                      >
                        Next: Your Details <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className="animate-fade-in-up">
                    <h2 className="text-2xl font-bold text-primary mb-2">Your details</h2>
                    <p className="text-muted mb-8">How should we reach you with updates?</p>

                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => updateForm("name", e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => updateForm("phone", e.target.value)}
                            placeholder="(555) 000-0000"
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => updateForm("email", e.target.value)}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">How soon do you need it?</label>
                        <select
                          value={form.timeline}
                          onChange={(e) => updateForm("timeline", e.target.value)}
                          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">As soon as possible</option>
                          <option value="1-2weeks">1-2 weeks</option>
                          <option value="1month">Within a month</option>
                          <option value="flexible">I&apos;m flexible / just browsing</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Additional Notes</label>
                        <textarea
                          rows={3}
                          value={form.notes}
                          onChange={(e) => updateForm("notes", e.target.value)}
                          placeholder="Anything else we should know..."
                          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-6 p-4 bg-neutral-50 rounded-xl flex flex-wrap items-center gap-4 text-sm text-muted">
                      <div className="flex items-center gap-1.5">
                        <Shield size={14} className="text-emerald-500" />
                        Free — No obligation
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        No spam, ever
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-emerald-500" />
                        First update within 24hrs
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-3 text-muted font-medium hover:text-primary transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn-shimmer flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-xl shadow-lg shadow-red-700/25 hover:shadow-red-700/40 transition-all"
                      >
                        <Send size={18} />
                        {submitting ? "Submitting..." : "Submit Car Request"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-section-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Success Stories</span>
            <h2 className="text-4xl font-bold text-primary mt-3">Cars We&apos;ve Found</h2>
            <p className="text-muted mt-4 max-w-xl mx-auto">
              Real customers, real cars, real savings. Here are some of our recent finds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div key={story.name} className="bg-white rounded-2xl p-8 border border-neutral-100 card-hover">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-6 italic">&ldquo;{story.quote}&rdquo;</p>
                <div className="border-t border-neutral-100 pt-4">
                  <p className="font-semibold text-primary text-sm">{story.name}</p>
                  <p className="text-xs text-muted">{story.location}</p>
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <Search size={12} className="text-accent" />
                      <span className="text-muted">Wanted: <span className="text-primary font-medium">{story.request}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock size={12} className="text-emerald-500" />
                      <span className="text-emerald-600 font-medium">{story.found}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <DollarSign size={12} className="text-emerald-500" />
                      <span className="text-emerald-600 font-medium">Saved {story.saved}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Search */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">We Find Any Car, Anywhere</h2>
            <p className="text-muted mt-3 max-w-2xl mx-auto">
              From everyday reliable rides to rare collector cars — no request is too big or too small.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Heart, label: "Daily Drivers" },
              { icon: TrendingDown, label: "Budget Finds" },
              { icon: Star, label: "Luxury Cars" },
              { icon: Globe, label: "Rare Imports" },
              { icon: FileSearch, label: "Classic Cars" },
              { icon: Truck, label: "Trucks & SUVs" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="p-6 bg-neutral-50 rounded-2xl text-center hover:bg-accent/5 transition-colors group cursor-pointer">
                <Icon size={28} className="mx-auto mb-3 text-neutral-400 group-hover:text-accent transition-colors" />
                <p className="text-sm font-medium text-primary">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Let Us Find Your Dream Car?
          </h2>
          <p className="text-neutral-300 mb-8 text-lg">
            It&apos;s free, there&apos;s no obligation, and we typically find matches within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setSubmitted(false); setStep(1); }}
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-2xl shadow-xl"
            >
              <Search size={18} />
              Start Your Search
            </button>
            <a
              href="tel:+15852368019"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <Phone size={18} />
              Call (585) 236-8019
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
