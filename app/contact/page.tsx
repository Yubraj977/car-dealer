"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">Contact Us</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Have a question or ready to schedule a test drive? Our team is here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative -mt-8 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Phone, label: "Call Us", value: "(555) 123-4567", href: "tel:+15551234567" },
              { icon: Mail, label: "Email Us", value: "info@prestigemotors.com", href: "mailto:info@prestigemotors.com" },
              { icon: MapPin, label: "Visit Us", value: "123 Premium Auto Blvd, Beverly Hills, CA", href: "#" },
              { icon: Clock, label: "Hours", value: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM", href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon size={22} className="text-accent" />
                </div>
                <p className="text-xs text-muted font-medium uppercase tracking-wider">{label}</p>
                <p className="text-sm font-semibold text-primary mt-1">{value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <MessageSquare size={22} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">Send Us a Message</h2>
                    <p className="text-muted text-sm">We typically respond within 1 business hour.</p>
                  </div>
                </div>

                {submitted && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-emerald-600" />
                    <p className="text-sm text-emerald-700 font-medium">Thank you! Your message has been sent successfully.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all"
                      >
                        <option value="">Select a topic</option>
                        <option value="test-drive">Schedule Test Drive</option>
                        <option value="pricing">Pricing Inquiry</option>
                        <option value="financing">Financing Options</option>
                        <option value="trade-in">Trade-In Appraisal</option>
                        <option value="service">Service Appointment</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary focus:outline-none focus:border-accent/50 focus:bg-white transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-shimmer w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map placeholder */}
              <div className="bg-slate-200 rounded-3xl overflow-hidden aspect-[4/3] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26430.393553120906!2d-118.43209796470972!3d34.07362429035497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100">
                <h3 className="text-lg font-bold text-primary mb-6">Frequently Asked</h3>
                <div className="space-y-4">
                  {[
                    { q: "Do you offer test drives?", a: "Yes! Schedule online or walk in during business hours." },
                    { q: "Can I get pre-approved?", a: "Apply online for instant pre-approval with competitive rates." },
                    { q: "Do you accept trade-ins?", a: "Absolutely. Get an instant online appraisal or visit our showroom." },
                    { q: "Do you deliver vehicles?", a: "Free delivery within 100 miles, nationwide shipping available." },
                  ].map((faq) => (
                    <div key={faq.q} className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm font-semibold text-primary">{faq.q}</p>
                      <p className="text-sm text-muted mt-1">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
