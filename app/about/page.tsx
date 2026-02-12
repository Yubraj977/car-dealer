import Image from "next/image";
import Link from "next/link";
import { Award, Users, ShieldCheck, Clock, Star, CheckCircle2, ArrowRight, Target, Gem, Heart } from "lucide-react";

const stats = [
  { value: "20+", label: "Years of Excellence", icon: Clock },
  { value: "15K+", label: "Happy Customers", icon: Users },
  { value: "500+", label: "Premium Vehicles", icon: Award },
  { value: "98%", label: "Client Satisfaction", icon: Star },
];

const values = [
  {
    icon: Target,
    title: "Integrity First",
    description: "Transparent pricing, honest assessments, and no hidden fees. We believe trust is the foundation of every great relationship.",
  },
  {
    icon: Gem,
    title: "Uncompromising Quality",
    description: "Every vehicle undergoes our rigorous 150-point inspection. We only sell cars we'd proudly drive ourselves.",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description: "Your satisfaction isn't just a goal — it's our standard. From first contact to years after your purchase, we're here for you.",
  },
];

const team = [
  { name: "Robert Kensington", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Alexandra Pierce", role: "Sales Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Marcus Johnson", role: "Finance Manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "Sophia Williams", role: "Service Manager", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562141961-b5d1de1189e2?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            Redefining the Car<br />Buying Experience
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Since 2005, Prestige Motors has been the premier destination for discerning automotive enthusiasts seeking exceptional vehicles and unparalleled service.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-xl border border-slate-100">
                <stat.icon size={28} className="mx-auto text-accent mb-3" />
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1562141961-b5d1de1189e2?w=800&q=80"
                  alt="Our showroom"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-white rounded-2xl p-6 shadow-xl">
                <p className="text-3xl font-bold">20+</p>
                <p className="text-sm opacity-90">Years of Trust</p>
              </div>
            </div>
            <div>
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">Our Story</span>
              <h2 className="text-4xl font-bold text-primary mt-3 mb-6">
                A Legacy Built on Passion
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  What started as a small boutique dealership in Beverly Hills has grown into one of California&apos;s most respected luxury automotive destinations. Our founder, Robert Kensington, had a vision: to create a car buying experience as refined as the vehicles themselves.
                </p>
                <p>
                  Today, Prestige Motors curates a collection of over 500 premium vehicles from the world&apos;s most prestigious brands. Every car in our inventory is hand-selected, thoroughly inspected, and presented to the highest standards.
                </p>
                <p>
                  Our commitment goes beyond the sale. We build lasting relationships with our clients, providing comprehensive after-sales support, exclusive events, and a level of service that sets the benchmark in the industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-section-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Our Values</span>
            <h2 className="text-4xl font-bold text-primary mt-3">What Drives Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 border border-slate-100 text-center card-hover">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon size={28} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Our Team</span>
            <h2 className="text-4xl font-bold text-primary mt-3">Meet the Experts</h2>
            <p className="text-muted mt-4 max-w-xl mx-auto">
              Our team of certified professionals brings decades of combined experience in the luxury automotive industry.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-semibold text-primary">{member.name}</h3>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Prestige Difference?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Visit our showroom or browse our inventory online. Your dream car awaits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/inventory"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-2xl shadow-xl"
            >
              Browse Inventory <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
