import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Users, Clock, Shield, CheckCircle2 } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Honest Pricing",
    description: "Straightforward, transparent pricing with no hidden fees or surprises. The price you see is the price you pay.",
  },
  {
    icon: Shield,
    title: "150-Point Inspection",
    description: "Every vehicle undergoes rigorous quality checks before it reaches our showroom. Drive with confidence.",
  },
  {
    icon: Users,
    title: "Small, Hands-On Team",
    description: "You work directly with people who care about the experience, not just the transaction.",
  },
  {
    icon: Clock,
    title: "Car Finder Service",
    description: "Can't find what you want? Tell us and we'll track it down from anywhere in the country.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80"
                    alt="Premium car on road"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80"
                    alt="Car interior dashboard"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80"
                    alt="Sports car side view"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80"
                    alt="Classic car driving"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Floating stats card */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-4 shadow-xl border border-neutral-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-primary">20+ Years of Excellence</p>
                <p className="text-muted text-xs">Trusted across New York</p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Why The Auto Room</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-3 mb-4">
              The Auto Room Difference
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-10">
              Buying a car should feel straightforward, comfortable, and enjoyable. We focus on honest pricing, carefully selected vehicles, and a better overall experience.
            </p>

            {/* Reasons */}
            <div className="space-y-5 mb-10">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="group flex gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-accent/20 hover:bg-neutral-50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 group-hover:bg-accent/10 group-hover:border-accent/20 flex items-center justify-center shrink-0 transition-all duration-300">
                    <reason.icon size={22} className="text-muted group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">{reason.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
            >
              Learn more about us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
