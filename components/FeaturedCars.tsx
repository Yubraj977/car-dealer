"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import CarCard from "./CarCard";
import type { Car } from "@/lib/types";

const filters = ["All", "New", "Used", "Certified Pre-Owned"];

export default function FeaturedCars() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch(() => {});
  }, []);

  const filteredCars =
    activeFilter === "All"
      ? cars.slice(0, 8)
      : cars.filter((c) => c.condition === activeFilter).slice(0, 8);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-accent" />
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">Our Collection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Featured Vehicles
            </h2>
            <p className="text-muted mt-3 text-lg max-w-xl">
              Hand-picked premium vehicles, each inspected and certified to meet our exacting standards.
            </p>
          </div>
          <Link
            href="/inventory"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
          >
            View All Inventory <ArrowRight size={18} />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                activeFilter === filter
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car, index) => (
            <div key={car.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            href="/inventory"
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
          >
            Browse All {cars.length} Vehicles
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
