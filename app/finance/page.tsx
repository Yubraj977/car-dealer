"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  DollarSign,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  Percent,
  FileText,
  BadgeCheck,
  Banknote,
  Phone,
} from "lucide-react";
import { formatPrice } from "@/lib/types";

export default function FinancePage() {
  const [loanAmount, setLoanAmount] = useState(80000);
  const [downPayment, setDownPayment] = useState(10000);
  const [interestRate, setInterestRate] = useState(4.9);
  const [loanTerm, setLoanTerm] = useState(60);

  const principal = loanAmount - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm))) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1)
      : principal / loanTerm;
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - principal;

  const steps = [
    {
      step: "01",
      icon: FileText,
      title: "Apply Online",
      description: "Fill out our simple online application. Takes only 5 minutes with instant preliminary approval.",
    },
    {
      step: "02",
      icon: BadgeCheck,
      title: "Get Approved",
      description: "Our finance team works with 20+ lenders to find the best rates for your credit profile.",
    },
    {
      step: "03",
      icon: Banknote,
      title: "Choose Your Terms",
      description: "Select the financing package that works best for your budget. Flexible terms from 24-84 months.",
    },
    {
      step: "04",
      icon: CheckCircle2,
      title: "Drive Home",
      description: "Sign the paperwork and drive off in your dream car. It's that simple.",
    },
  ];

  const benefits = [
    "Rates as low as 2.9% APR for qualified buyers",
    "No prepayment penalties on any loan",
    "Flexible terms from 24 to 84 months",
    "Special programs for first-time buyers",
    "Lease-to-own options available",
    "Gap insurance and extended warranty financing",
    "Quick 24-hour approval process",
    "Trade-in value applied to down payment",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">Financing</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            Drive Now,<br />Pay Smart
          </h1>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Competitive rates, flexible terms, and a hassle-free process. Let us help you find the perfect financing solution.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative -mt-8 z-10 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Calculator Inputs */}
              <div className="lg:col-span-3 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Calculator size={22} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">Payment Calculator</h2>
                    <p className="text-muted text-sm">Estimate your monthly payment</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-primary">Vehicle Price</label>
                      <span className="text-sm font-bold text-accent">{formatPrice(loanAmount)}</span>
                    </div>
                    <input
                      type="range"
                      min={20000}
                      max={400000}
                      step={5000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-red-600"
                    />
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>$20,000</span>
                      <span>$400,000</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-primary">Down Payment</label>
                      <span className="text-sm font-bold text-accent">{formatPrice(downPayment)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={Math.min(loanAmount * 0.5, 100000)}
                      step={1000}
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-red-600"
                    />
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>$0</span>
                      <span>{formatPrice(Math.min(loanAmount * 0.5, 100000))}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-primary">Interest Rate (APR)</label>
                      <span className="text-sm font-bold text-accent">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-red-600"
                    />
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>0%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">Loan Term</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[36, 48, 60, 72].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLoanTerm(term)}
                          className={`py-3 text-sm font-medium rounded-xl transition-all ${
                            loanTerm === term
                              ? "bg-primary text-white shadow-lg"
                              : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                          }`}
                        >
                          {term} mo
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary-light p-8 md:p-10 text-white flex flex-col justify-center">
                <p className="text-sm text-neutral-400 uppercase tracking-wider mb-2">Estimated Monthly Payment</p>
                <p className="text-5xl font-bold mb-8">
                  {formatPrice(Math.round(monthlyPayment))}
                  <span className="text-lg font-normal text-neutral-400">/mo</span>
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-neutral-400 text-sm">Loan Amount</span>
                    <span className="font-semibold">{formatPrice(principal)}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-neutral-400 text-sm">Total Interest</span>
                    <span className="font-semibold">{formatPrice(Math.round(totalInterest))}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-neutral-400 text-sm">Total Cost</span>
                    <span className="font-semibold text-accent-light">{formatPrice(Math.round(totalPayment))}</span>
                  </div>
                </div>

                <button className="btn-shimmer w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-xl shadow-lg">
                  Apply for Financing
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-section-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Process</span>
            <h2 className="text-4xl font-bold text-primary mt-3">How It Works</h2>
            <p className="text-muted mt-4 max-w-xl mx-auto">
              Getting financed has never been easier. Four simple steps to drive your dream car home.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-neutral-200" />
                )}
                <div className="bg-white rounded-2xl p-8 border border-neutral-100 text-center relative card-hover">
                  <span className="text-5xl font-bold text-neutral-100 absolute top-4 right-6">{step.step}</span>
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <step.icon size={26} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">Benefits</span>
              <h2 className="text-4xl font-bold text-primary mt-3 mb-6">
                Why Finance With Us
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-8">
                We work with over 20 lenders to find you the most competitive rates and flexible terms, regardless of your credit situation.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span className="text-sm text-primary font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-4">Get Pre-Approved Today</h3>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Take the first step toward your new vehicle. Our quick pre-approval process won&apos;t affect your credit score.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: Clock, text: "5-minute application" },
                  { icon: Shield, text: "No impact on credit score" },
                  { icon: Percent, text: "See your real rate instantly" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Icon size={16} className="text-accent-light" />
                    </div>
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
              <button className="btn-shimmer w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-xl shadow-lg">
                Start Application
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-section-alt">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Questions About Financing?
          </h2>
          <p className="text-muted text-lg mb-8">
            Our finance experts are here to help. Contact us for a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-2xl shadow-xl"
            >
              Contact Finance Team <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+15852368019"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all"
            >
              <Phone size={18} />
              (585) 236-8019
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
