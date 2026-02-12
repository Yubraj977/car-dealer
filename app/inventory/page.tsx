"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import CarCard from "@/components/CarCard";
import { conditions, formatPrice } from "@/lib/types";
import type { Car } from "@/lib/types";

export default function InventoryPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch(() => {});
  }, []);

  const makes = useMemo(() => [...new Set(cars.map((c) => c.make))].sort(), [cars]);
  const bodyTypes = useMemo(() => [...new Set(cars.map((c) => c.bodyType))].sort(), [cars]);
  const fuelTypes = useMemo(() => [...new Set(cars.map((c) => c.fuelType))].sort(), [cars]);

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      const matchesSearch =
        !search ||
        `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(search.toLowerCase());
      const matchesMake = !selectedMake || car.make === selectedMake;
      const matchesBody = !selectedBodyType || car.bodyType === selectedBodyType;
      const matchesFuel = !selectedFuelType || car.fuelType === selectedFuelType;
      const matchesCondition = !selectedCondition || car.condition === selectedCondition;
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      return matchesSearch && matchesMake && matchesBody && matchesFuel && matchesCondition && matchesPrice;
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "year-new":
        result.sort((a, b) => b.year - a.year);
        break;
      case "mileage-low":
        result.sort((a, b) => a.mileage - b.mileage);
        break;
    }

    return result;
  }, [cars, search, selectedMake, selectedBodyType, selectedFuelType, selectedCondition, priceRange, sortBy]);

  const activeFilters = [selectedMake, selectedBodyType, selectedFuelType, selectedCondition].filter(Boolean);

  const clearFilters = () => {
    setSearch("");
    setSelectedMake("");
    setSelectedBodyType("");
    setSelectedFuelType("");
    setSelectedCondition("");
    setPriceRange([0, 500000]);
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-primary to-primary-light py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Inventory</h1>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Explore our curated collection of {cars.length} premium vehicles. Every car is inspected, certified, and ready for you.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -tranneutral-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by make, model, or year..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                showFilters
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>

            {activeFilters.length > 0 && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-muted hover:text-red-500 transition-colors">
                <X size={14} /> Clear all
              </button>
            )}

            <p className="text-sm text-muted hidden md:block">
              Showing <span className="font-semibold text-primary">{filteredCars.length}</span> vehicles
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl text-neutral-600 focus:outline-none focus:border-accent/50 appearance-none cursor-pointer pr-8"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="mileage-low">Mileage: Lowest First</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            showFilters ? "max-h-[400px] opacity-100 mb-8" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Make</label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-accent/50"
                >
                  <option value="">All Makes</option>
                  {makes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Body Type</label>
                <select
                  value={selectedBodyType}
                  onChange={(e) => setSelectedBodyType(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-accent/50"
                >
                  <option value="">All Types</option>
                  {bodyTypes.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Fuel Type</label>
                <select
                  value={selectedFuelType}
                  onChange={(e) => setSelectedFuelType(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-accent/50"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Condition</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-accent/50"
                >
                  <option value="">All Conditions</option>
                  {conditions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Max Price</label>
                <select
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-accent/50"
                >
                  <option value={500000}>Any Price</option>
                  <option value={100000}>Under $100,000</option>
                  <option value={150000}>Under $150,000</option>
                  <option value={200000}>Under $200,000</option>
                  <option value={300000}>Under $300,000</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Pills */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {selectedMake && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {selectedMake}
                <button onClick={() => setSelectedMake("")}><X size={12} /></button>
              </span>
            )}
            {selectedBodyType && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {selectedBodyType}
                <button onClick={() => setSelectedBodyType("")}><X size={12} /></button>
              </span>
            )}
            {selectedFuelType && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {selectedFuelType}
                <button onClick={() => setSelectedFuelType("")}><X size={12} /></button>
              </span>
            )}
            {selectedCondition && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {selectedCondition}
                <button onClick={() => setSelectedCondition("")}><X size={12} /></button>
              </span>
            )}
          </div>
        )}

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car, index) => (
              <div key={car.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <CarCard car={car} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-neutral-300" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">No vehicles found</h3>
            <p className="text-muted mb-6">Try adjusting your filters to find what you&apos;re looking for.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-light transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
