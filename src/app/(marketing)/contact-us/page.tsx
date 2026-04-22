"use client";
import { PageLayout, PageHero, PageSection } from "@/components/layout/PageLayout";
import DescriptionTypography from "@/components/DescriptionTypography";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const socialLinks = [
  {
    name: "LinkedIn",
    handle: "YourSaaS",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    bg: "bg-blue-600 hover:bg-blue-700",
    text: "text-white",
  },
  {
    name: "Instagram",
    handle: "@yoursaas",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    bg: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500",
    text: "text-white",
  },
];

const contactInfo = [
  {
    label: "General",
    value: "contact@yoursaas.ai",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    label: "Support",
    value: "support@yoursaas.ai",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+1 (800) 123 XX21",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6z"
        />
      </svg>
    ),
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function ContactHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <PageHero ref={ref} className="pb-16">
      {/* Background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary/6 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.03,
        }}
      />

      {/* Large background word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[14vw] font-heading font-black uppercase text-foreground/[0.025] tracking-widest whitespace-nowrap">
          CONTACT
        </span>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div style={{ y, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-[2px] bg-primary rounded-full" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Get in Touch
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-foreground tracking-tight leading-[1.05] mb-6 max-w-4xl"
          >
            Let&apos;s talk about
            <br />
            <span className="text-primary italic">your next project</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DescriptionTypography className="text-lg max-w-2xl mb-8">
              We are always looking for ways to improve our products and services.
              Contact us and let us know how we can help you with your insurance
              and digital transformation needs.
            </DescriptionTypography>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-8 pt-8 border-t border-border/50 max-w-xl"
          >
            {[
              { value: "24/7", label: "Global Support" },
              { value: "<2h", label: "Average Response" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-heading font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-foreground/45">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </PageHero>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <ContactHero />
      <PageSection id="contact-content" className="pt-0! pb-24 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* ── Left column ── */}
          <div>
            {/* Contact info */}
            <div className="flex flex-col gap-4 mb-10">
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                Contact Information
              </h3>
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 text-sm text-foreground/70"
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-foreground/[0.04] text-primary">
                    {item.icon}
                  </span>
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </span>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* World map SVG */}
            <div className="mt-12 relative">
              <div className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-4">Our location</div>
              {/* <div className="h-[30rem] w-full flex items-center justify-center ">
                <PinContainer
                  title="Hattisar, Kathmandu Nepal"
                  href="https://maps.app.goo.gl/UUj9cA5U7uw5brZa7"
                  containerClassName="w-full"
                >
                  <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2  ">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold text-black">
                      Arhant Solutions
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                      <span className="text-slate-500 ">
                        Hattisar Kathmandu , Nepal
                      </span>
                    </div>
                    <div>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1717114254125!2d85.32017757599203!3d27.71198412528593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19de968a5d9b%3A0x8aeb72970105f70a!2sArhant%20Solutions!5e0!3m2!1sen!2snp!4v1775637598051!5m2!1sen!2snp"
                        width={280}
                        height={320}
                        style={{ border: 0 }}
                        //   allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-sm"
                      />
                    </div>
                  </div>
                </PinContainer>
              </div> */}
            </div>

            <div className="mt-12">
              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-4">
                Find us on
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${s.bg} ${s.text} shadow-sm hover:shadow-md hover:-translate-y-0.5`}
                  >
                    {s.icon}
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column — form ── */}
          <div className="bg-card border border-foreground/[0.08] rounded-3xl p-8 lg:p-10 relative overflow-hidden shadow-sm">
            {/* subtle dot grid on card */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                opacity: 0.03,
              }}
            />
            <div className="relative z-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth={2}
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold font-heading text-foreground">
                    Message sent!
                  </h2>
                  <p className="text-foreground/60 text-sm">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        fullName: "",
                        email: "",
                        company: "",
                        message: "",
                      });
                    }}
                    className="mt-4 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-foreground/[0.03] border border-foreground/[0.08] rounded-xl px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full bg-foreground/[0.03] border border-foreground/[0.08] rounded-xl px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your Company Let."
                      className="w-full bg-foreground/[0.03] border border-foreground/[0.08] rounded-xl px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full bg-foreground/[0.03] border border-foreground/[0.08] rounded-xl px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-primary-foreground text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-primary/20"
                  >
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
