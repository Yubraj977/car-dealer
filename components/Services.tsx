import Image from "next/image";
import Link from "next/link";
import { DollarSign, ShieldCheck, Repeat, Wrench, Truck, FileCheck, ArrowRight } from "lucide-react";

const services = [
  {
    icon: DollarSign,
    title: "Flexible Financing",
    description: "Competitive rates from 2.9% APR with multiple lender options. Get pre-approved in minutes.",
    highlight: "From 2.9% APR",
  },
  {
    icon: ShieldCheck,
    title: "Extended Warranty",
    description: "Comprehensive coverage plans up to 7 years. Protected against unexpected repairs.",
    highlight: "Up to 7 Years",
  },
  {
    icon: Repeat,
    title: "Trade-In Program",
    description: "Get top dollar for your current vehicle with our instant online appraisal tool.",
    highlight: "Instant Appraisal",
  },
  {
    icon: Wrench,
    title: "Service Center",
    description: "Factory-trained technicians using genuine OEM parts. Complimentary first service included.",
    highlight: "OEM Parts",
  },
  {
    icon: Truck,
    title: "Home Delivery",
    description: "We'll bring the car to you. Free delivery within 100 miles of our dealership.",
    highlight: "Free Delivery",
  },
  {
    icon: FileCheck,
    title: "Vehicle History",
    description: "Complete transparency with detailed CARFAX reports and a rigorous 150-point inspection.",
    highlight: "150-Point Check",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top: Image Banner + Header */}
        <div className="grid lg:grid-cols-5 gap-10 mb-14">
          {/* Image */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] lg:aspect-auto">
            <Image
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80"
              alt="Car service center"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-bold text-xl">Full-Service Experience</p>
              <p className="text-white/70 text-sm mt-1">Everything you need, under one roof</p>
            </div>
          </div>

          {/* Header */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-3">
              Premium Services
            </h2>
            <p className="text-muted mt-4 text-lg max-w-xl leading-relaxed">
              Beyond exceptional vehicles, we provide a complete automotive experience designed around your needs — from financing to delivery.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all w-fit"
            >
              Get in touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-white rounded-2xl p-7 border border-neutral-100 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-200 group-hover:bg-accent/10 group-hover:border-accent/20 flex items-center justify-center transition-all duration-300">
                  <service.icon size={22} className="text-muted group-hover:text-accent transition-colors duration-300" />
                </div>
                <span className="text-xs font-semibold text-accent bg-accent/8 px-3 py-1 rounded-full">
                  {service.highlight}
                </span>
              </div>

              <h3 className="text-lg font-bold text-primary mb-2">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
