import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const brands = [
  { name: "Mercedes-Benz", logo: "/brands/mercedes-benz.svg" },
  { name: "BMW", logo: "/brands/bmw.svg" },
  { name: "Porsche", logo: "/brands/porsche.svg" },
  { name: "Audi", logo: "/brands/audi.svg" },
  { name: "Ferrari", logo: "/brands/ferrari.svg" },
  { name: "Lamborghini", logo: "/brands/lamborghini.svg" },
  { name: "Range Rover", logo: "/brands/range-rover.svg" },
  { name: "Tesla", logo: "/brands/tesla.svg" },
  { name: "Aston Martin", logo: "/brands/aston-martin.svg" },
  { name: "Lexus", logo: "/brands/lexus.svg" },
  { name: "Bentley", logo: "/brands/bentley.svg" },
  { name: "Maserati", logo: "/brands/maserati.svg" },
];

export default function BrandsSection() {
  return (
    <section className="py-20 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
              Our Partners
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Trusted Brands We Carry
            </h2>
          </div>
          <Link
            href="/inventory"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-accent hover:text-accent-light text-sm font-medium transition-colors"
          >
            View all brands <ArrowRight size={14} />
          </Link>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href="/inventory"
              className="group relative flex flex-col items-center justify-center py-7 px-4 rounded-2xl border border-neutral-200 bg-white hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              {/* Logo */}
              <div className="w-14 h-14 mb-3 flex items-center justify-center opacity-30 group-hover:opacity-70 transition-opacity duration-300">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Name */}
              <span className="text-xs font-medium text-muted group-hover:text-primary transition-colors text-center">
                {brand.name}
              </span>
              {/* Hover accent line */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-0.5 bg-accent rounded-full transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
