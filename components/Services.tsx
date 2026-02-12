import { DollarSign, ShieldCheck, Repeat, Wrench, Truck, FileCheck } from "lucide-react";

const services = [
  {
    icon: DollarSign,
    title: "Flexible Financing",
    description: "Competitive rates from 2.9% APR with multiple lender options. Get pre-approved in minutes with our online application.",
    color: "from-red-600 to-red-500",
    shadow: "shadow-red-600/20",
  },
  {
    icon: ShieldCheck,
    title: "Extended Warranty",
    description: "Comprehensive coverage plans up to 7 years. Drive with confidence knowing you're protected against unexpected repairs.",
    color: "from-red-600 to-red-500",
    shadow: "shadow-red-600/20",
  },
  {
    icon: Repeat,
    title: "Trade-In Program",
    description: "Get top dollar for your current vehicle. Our instant online appraisal tool provides a fair market value in seconds.",
    color: "from-red-600 to-red-500",
    shadow: "shadow-red-600/20",
  },
  {
    icon: Wrench,
    title: "Service Center",
    description: "Factory-trained technicians using genuine OEM parts. Complimentary first service for all purchased vehicles.",
    color: "from-red-600 to-red-500",
    shadow: "shadow-red-600/20",
  },
  {
    icon: Truck,
    title: "Home Delivery",
    description: "Can't make it to the showroom? We'll bring the car to you. Free delivery within 100 miles of our dealership.",
    color: "from-red-600 to-red-500",
    shadow: "shadow-red-600/20",
  },
  {
    icon: FileCheck,
    title: "Vehicle History",
    description: "Complete transparency with detailed CARFAX reports. Every vehicle undergoes a rigorous 150-point inspection.",
    color: "from-red-600 to-red-500",
    shadow: "shadow-red-600/20",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-section-alt">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mt-3">
            Premium Services
          </h2>
          <p className="text-muted mt-4 text-lg max-w-2xl mx-auto">
            Beyond exceptional vehicles, we provide a complete automotive experience designed around your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card-hover group bg-white rounded-2xl p-8 border border-neutral-100"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} ${service.shadow} shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon size={26} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
