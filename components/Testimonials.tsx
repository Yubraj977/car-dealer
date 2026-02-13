"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || testimonials.length === 0) {
    return null;
  }

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
                <div key={stat.label} className="text-center p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Testimonial Card */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-10 border border-neutral-200 shadow-xl relative overflow-hidden">
              {/* Quote Icon */}
              <Quote size={80} className="absolute -top-2 -right-2 text-accent/5" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg leading-relaxed mb-8 text-muted">
                &ldquo;{testimonials[active].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg text-primary">{testimonials[active].name}</p>
                  <p className="text-muted text-sm">{testimonials[active].role}</p>
                  <p className="text-accent text-sm mt-1">Purchased: {testimonials[active].car}</p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-primary flex items-center justify-center transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-primary flex items-center justify-center transition-colors"
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
                      i === active ? "w-8 bg-accent" : "w-1.5 bg-neutral-200"
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
