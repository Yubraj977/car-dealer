"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-3 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              Don&apos;t just take our word for it. Hear from thousands of satisfied customers who found their dream vehicles with us.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "4.9/5", label: "Average Rating" },
                { value: "2,500+", label: "5-Star Reviews" },
                { value: "98%", label: "Would Recommend" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-slate-50 rounded-2xl">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Testimonial Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-10 text-white relative overflow-hidden">
              {/* Quote Icon */}
              <Quote size={80} className="absolute -top-2 -right-2 text-white/5" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-accent-light fill-accent-light" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg leading-relaxed mb-8 text-slate-200">
                &ldquo;{testimonials[active].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg">{testimonials[active].name}</p>
                  <p className="text-slate-400 text-sm">{testimonials[active].role}</p>
                  <p className="text-accent-light text-sm mt-1">Purchased: {testimonials[active].car}</p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? "w-8 bg-accent-light" : "w-1.5 bg-white/20"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
