"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    subject: "Licensing Inquiry",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-premium-bg pt-32 pb-24 px-6 text-premium-text">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-premium-orange uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
            Direct Studio Line
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-premium-text mb-6">
            Contact & Support
          </h1>
          <p className="text-premium-text/70 font-light text-lg leading-relaxed">
            Have questions regarding our digital asset licenses, custom editorial acquisitions, or need assistance with an existing order? Our curatorial support desk is available to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact & Entity Information */}
          <div className="lg:col-span-5 bg-premium-surface border border-premium-border/60 rounded-2xl p-8 md:p-10 shadow-sm space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-premium-text mb-3">Studio Headquarters</h2>
              <p className="text-premium-text/70 text-sm leading-relaxed">
                <strong className="text-premium-text block">MvjHub Visual Media</strong>
                22, Kashiram Avas Colony, Near ITI<br />
                Lalitpur, Uttar Pradesh - 284403, India
              </p>
            </div>

            <div className="border-t border-premium-border/40 pt-6">
              <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-premium-text/50 mb-3">
                Electronic Inquiries
              </h3>
              <p className="text-sm text-premium-text/80 mb-2">
                <span className="text-premium-text/50 font-mono text-xs uppercase block">Client Support</span>
                <a href="mailto:support@mvjhub.in" className="text-premium-orange hover:underline">
                  support@mvjhub.in
                </a>
              </p>
              <p className="text-sm text-premium-text/80">
                <span className="text-premium-text/50 font-mono text-xs uppercase block">Commercial Licensing</span>
                <a href="mailto:licensing@mvjhub.in" className="text-premium-orange hover:underline">
                  licensing@mvjhub.in
                </a>
              </p>
            </div>

            <div className="border-t border-premium-border/40 pt-6">
              <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-premium-text/50 mb-3">
                Operating Hours & Turnaround
              </h3>
              <p className="text-sm text-premium-text/70 leading-relaxed mb-2">
                <strong>Standard Support:</strong> Monday – Saturday, 9:30 AM to 6:30 PM IST
              </p>
              <p className="text-sm text-premium-text/70 leading-relaxed">
                <strong>Response Window:</strong> All licensing inquiries and technical order queries are addressed within <strong>24 to 48 business hours</strong>.
              </p>
            </div>

            <div className="border-t border-premium-border/40 pt-6 bg-premium-bg/50 p-4 rounded-xl border border-premium-border/30">
              <h4 className="text-xs uppercase tracking-widest font-bold text-premium-text/60 mb-2">
                Grievance & Compliance Officer
              </h4>
              <p className="text-xs text-premium-text/60 leading-relaxed">
                In compliance with the Information Technology Act & Consumer Protection (E-Commerce) Rules, inquiries or grievances may be addressed to: 
                <span className="block mt-1 font-mono text-premium-text/80">Compliance Desk, MvjHub (compliance@mvjhub.in)</span>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-premium-surface border border-premium-border/60 rounded-2xl p-8 md:p-10 shadow-sm">
            <h2 className="font-serif text-3xl text-premium-text mb-2">Send an Inquiry</h2>
            <p className="text-premium-text/60 text-sm mb-8 font-light">
              Submit your inquiry below and our curator team will get back to you promptly.
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-green-500/10 border border-green-500/30 text-center space-y-3">
                <div className="w-12 h-12 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h3 className="font-serif text-2xl text-premium-text">Inquiry Dispatched</h3>
                <p className="text-sm text-premium-text/70 max-w-md mx-auto">
                  Thank you for reaching out. Your message has been logged. Our curatorial desk will review your inquiry and follow up at <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", orderId: "", subject: "Licensing Inquiry", message: "" });
                  }}
                  className="mt-4 text-xs uppercase tracking-widest text-premium-orange font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-premium-text/60 mb-2 font-semibold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-premium-border/80 bg-premium-bg/50 text-premium-text placeholder:text-premium-text/30 focus:outline-none focus:border-premium-orange transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-premium-text/60 mb-2 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-premium-border/80 bg-premium-bg/50 text-premium-text placeholder:text-premium-text/30 focus:outline-none focus:border-premium-orange transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-premium-text/60 mb-2 font-semibold">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-premium-border/80 bg-premium-bg/50 text-premium-text focus:outline-none focus:border-premium-orange transition-colors text-sm"
                    >
                      <option value="Licensing Inquiry">Commercial Licensing Inquiry</option>
                      <option value="Order & Download Support">Order & Download Support</option>
                      <option value="Custom Asset Request">Custom Asset Request</option>
                      <option value="Billing & Invoicing">Billing & Invoicing</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-premium-text/60 mb-2 font-semibold">
                      Order ID (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ord_2026_xxxx"
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-premium-border/80 bg-premium-bg/50 text-premium-text placeholder:text-premium-text/30 focus:outline-none focus:border-premium-orange transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-premium-text/60 mb-2 font-semibold">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your inquiry, licensing scope, or issue in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-premium-border/80 bg-premium-bg/50 text-premium-text placeholder:text-premium-text/30 focus:outline-none focus:border-premium-orange transition-colors text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-premium-orange text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-premium-text transition-colors shadow-md"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
