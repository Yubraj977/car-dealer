const brands = [
  "Mercedes-Benz",
  "BMW",
  "Porsche",
  "Audi",
  "Ferrari",
  "Lamborghini",
  "Range Rover",
  "Tesla",
  "Aston Martin",
  "Lexus",
  "Bentley",
  "Maserati",
];

export default function BrandsSection() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm text-muted font-medium uppercase tracking-wider mb-10">
          Trusted Brands We Carry
        </p>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center h-16 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
            >
              <span className="text-sm font-semibold text-slate-400 group-hover:text-primary transition-colors tracking-wide">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
