import Image from "next/image";
import { CheckCircle2, Award, Users, Clock, Shield } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Honest Pricing",
    description: "Straightforward, transparent pricing with no hidden fees or surprises.",
  },
  {
    icon: Shield,
    title: "150-Point Inspection",
    description: "Every vehicle undergoes rigorous quality checks before it reaches our showroom.",
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
    <section className="py-24 bg-section-alt overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80"
                alt="Premium showroom"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl max-w-[240px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-primary text-lg">20+ Years</p>
                  <p className="text-muted text-xs">of Excellence</p>
                </div>
              </div>
              <p className="text-muted text-xs">Trusted by customers across New York.</p>
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Why The Auto Room</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-3 mb-6">
              The Auto Room Difference
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-10">
              Buying a car should feel straightforward, comfortable, and enjoyable. We focus on honest pricing, carefully selected vehicles, and a better overall experience.
            </p>

            {/* Reasons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <reason.icon size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{reason.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
