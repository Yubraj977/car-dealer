"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  Fuel,
  Gauge,
  Settings2,
  Palette,
  Zap,
  Shield,
  CheckCircle2,
  MapPin,
  Clock,
  Car,
} from "lucide-react";
import { cars, formatPrice, formatMileage } from "@/lib/data";

export default function VehicleDetailPage() {
  const params = useParams();
  const car = cars.find((c) => c.id === params.id);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Vehicle Not Found</h1>
          <p className="text-muted mb-6">The vehicle you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/inventory" className="px-6 py-3 bg-primary text-white font-medium rounded-xl">
            Back to Inventory
          </Link>
        </div>
      </div>
    );
  }

  const specs = [
    { icon: Calendar, label: "Year", value: car.year.toString() },
    { icon: Gauge, label: "Mileage", value: `${formatMileage(car.mileage)} mi` },
    { icon: Fuel, label: "Fuel Type", value: car.fuelType },
    { icon: Settings2, label: "Transmission", value: car.transmission },
    { icon: Palette, label: "Exterior", value: car.color },
    { icon: Zap, label: "Horsepower", value: `${car.horsepower} HP` },
    { icon: Car, label: "Drivetrain", value: car.drivetrain },
    { icon: Settings2, label: "Engine", value: car.engine },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/inventory" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            Back to Inventory
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-200 shadow-xl">
              <Image
                src={car.image}
                alt={`${car.year} ${car.make} ${car.model}`}
                fill
                className="object-cover"
                priority
              />
              {car.badge && (
                <div className="absolute top-6 left-6 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-full shadow-lg">
                  {car.badge}
                </div>
              )}
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors shadow-lg">
                  <Heart size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-primary transition-colors shadow-lg">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {car.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {car.images.map((img, i) => (
                  <div key={i} className="relative w-32 h-24 rounded-xl overflow-hidden bg-slate-200 shrink-0 ring-2 ring-transparent hover:ring-accent/50 transition-all cursor-pointer">
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100">
              <h2 className="text-xl font-bold text-primary mb-4">About This Vehicle</h2>
              <p className="text-muted leading-relaxed">{car.description}</p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100">
              <h2 className="text-xl font-bold text-primary mb-6">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                      <spec.icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted">{spec.label}</p>
                      <p className="text-sm font-semibold text-primary">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100">
              <h2 className="text-xl font-bold text-primary mb-6">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span className="text-sm text-primary font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Pricing & Contact */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg sticky top-28">
              <div className="mb-6">
                <p className="text-xs font-medium text-accent uppercase tracking-wider">{car.condition}</p>
                <h1 className="text-2xl font-bold text-primary mt-1">
                  {car.year} {car.make} {car.model}
                </h1>
              </div>

              <div className="mb-6 p-4 bg-slate-50 rounded-2xl">
                <p className="text-3xl font-bold text-primary">{formatPrice(car.price)}</p>
                <p className="text-sm text-muted mt-1">Est. ${Math.round(car.price / 72).toLocaleString()}/mo with financing</p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs text-muted">Mileage</p>
                  <p className="text-sm font-bold text-primary">{formatMileage(car.mileage)} mi</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs text-muted">Drivetrain</p>
                  <p className="text-sm font-bold text-primary">{car.drivetrain}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs text-muted">Engine</p>
                  <p className="text-sm font-bold text-primary">{car.engine}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs text-muted">Horsepower</p>
                  <p className="text-sm font-bold text-primary">{car.horsepower} HP</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button className="btn-shimmer w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25">
                  <Calendar size={18} />
                  Schedule Test Drive
                </button>
                <a
                  href="tel:+15852368019"
                  className="w-full flex items-center justify-center gap-2 py-4 border border-slate-200 text-primary font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Phone size={18} />
                  Call (585) 236-8019
                </a>
                <button className="w-full flex items-center justify-center gap-2 py-4 border border-slate-200 text-primary font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                  <Mail size={18} />
                  Email About This Vehicle
                </button>
              </div>

              {/* Trust */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Shield size={16} className="text-emerald-500" />
                  150-Point Inspection Completed
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  Clean Vehicle History Report
                </div>
              </div>
            </div>

            {/* Dealer Info */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <h3 className="font-semibold text-primary mb-4">The Auto Room</h3>
              <div className="space-y-3 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-accent shrink-0" />
                  1066 Gravel Rd, Suite 14, Webster, NY
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-accent shrink-0" />
                  By Appointment &amp; Walk-Ins Welcome
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
