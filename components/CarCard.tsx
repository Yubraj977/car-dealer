import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, Settings2, ArrowRight } from "lucide-react";
import { Car, formatPrice, formatMileage } from "@/lib/data";

const badgeColors: Record<string, string> = {
  "New Arrival": "bg-blue-500",
  "Hot Deal": "bg-red-500",
  "Low Mileage": "bg-emerald-500",
  "Certified": "bg-purple-500",
};

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/inventory/${car.id}`} className="group block">
      <div className="card-hover bg-white rounded-2xl overflow-hidden border border-slate-100">
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <Image
            src={car.image}
            alt={`${car.year} ${car.make} ${car.model}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge */}
          {car.badge && (
            <div className={`absolute top-4 left-4 px-3 py-1 ${badgeColors[car.badge]} text-white text-xs font-semibold rounded-full shadow-lg`}>
              {car.badge}
            </div>
          )}

          {/* Condition */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium rounded-full">
            {car.condition}
          </div>

          {/* View Details on Hover */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium">
              View Details <ArrowRight size={14} />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title & Year */}
          <div className="mb-3">
            <p className="text-xs font-medium text-accent uppercase tracking-wider">{car.year}</p>
            <h3 className="text-lg font-bold text-primary group-hover:text-primary-light transition-colors">
              {car.make} {car.model}
            </h3>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-4 mb-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Gauge size={14} className="text-slate-400" />
              {formatMileage(car.mileage)} mi
            </span>
            <span className="flex items-center gap-1.5">
              <Fuel size={14} className="text-slate-400" />
              {car.fuelType}
            </span>
            <span className="flex items-center gap-1.5">
              <Settings2 size={14} className="text-slate-400" />
              {car.transmission}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{formatPrice(car.price)}</p>
                <p className="text-xs text-muted">Est. ${Math.round(car.price / 72).toLocaleString()}/mo</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-accent group-hover:text-white text-slate-400 flex items-center justify-center transition-all">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
