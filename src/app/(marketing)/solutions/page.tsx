"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PageLayout, PageHero, PageSection } from "@/components/layout/PageLayout";
import DescriptionTypography from "@/components/DescriptionTypography";
import { Button } from "@/components/ui/Button";
import { solutions, type SolutionId, type Solution } from "@/lib/solutions-data";

// Data is imported from @/lib/solutions-data

// ─── Section Component ───────────────────────────────────────────────────────
function SolutionSection({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  const Icon = solution.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      id={solution.id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="scroll-mt-32"
    >
      <div
        className={`relative rounded-3xl overflow-hidden border border-foreground/[0.08] bg-card`}
      >
        {/* Glow accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at ${isEven ? "80%" : "20%"} 50%, ${solution.glowColor}12 0%, transparent 70%)`,
          }}
        />

        {/* Top accent stripe */}
        <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${solution.gradient}`} />

        <div className={`grid lg:grid-cols-2 gap-0`}>
          {/* ── Left / Content ── */}
          <div className={`p-8 lg:p-12 flex flex-col justify-center ${!isEven ? "lg:order-2" : ""}`}>
            {/* Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-linear-to-r ${solution.gradient} text-white`}
              >
                <Icon className="w-3.5 h-3.5" />
                {solution.badge}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-tight mb-3">
              {solution.title}
            </h2>
            <p className={`text-sm font-semibold mb-4 bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent`}>
              {solution.tagline}
            </p>
            <DescriptionTypography className="mb-8 max-w-lg">
              {solution.description}
            </DescriptionTypography>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06]">
              {solution.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className={`text-xl font-bold font-heading bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-foreground/50 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Client logos */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">
                Trusted by
              </p>
              <div className="flex items-center gap-3">
                {solution.clients.map((client) => (
                  <div
                    key={client.name}
                    title={client.name}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white bg-linear-to-br ${solution.gradient} shadow-md`}
                  >
                    {client.initials}
                  </div>
                ))}
                <span className="text-xs text-foreground/40 ml-1">& more</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact-us">
                <Button className="gap-2">
                  Request Demo <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href={`/solutions/${solution.slug}`}>
                <Button variant="outline" className="gap-2">
                  View Full Details <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* ── Right / Features Grid ── */}
          <div className={`p-8 lg:p-12 border-t lg:border-t-0 ${isEven ? "lg:border-l" : "lg:border-r lg:order-1"} border-foreground/[0.06]`}>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-6">
              Key Capabilities
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {solution.features.map((feature, i) => {
                const FIcon = feature.icon;
                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="group flex items-start gap-3 p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/[0.05] hover:border-foreground/[0.12] hover:bg-foreground/[0.04] transition-all duration-300"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-linear-to-br ${solution.gradient} text-white shadow-sm`}
                    >
                      <FIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-tight">
                        {feature.label}
                      </p>
                      <p className="text-xs text-foreground/50 mt-0.5 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function SolutionsHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <PageHero ref={ref}>
      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-500/6 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.03,
        }}
      />

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
              Our Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-foreground tracking-tight leading-[1.05] mb-6 max-w-4xl"
          >
            Built for Insurance,
            <br />
            <span className="text-primary italic">Engineered for Scale</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <DescriptionTypography className="text-lg mb-8">
              Four purpose-built platforms covering every segment of the insurance
              value chain — from life and general to micro-insurance and distribution.
              All engineered to eliminate complexity and accelerate growth.
            </DescriptionTypography>
          </motion.div>

          {/* Quick jump pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {solutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <a
                  key={sol.id}
                  href={`#${sol.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-linear-to-r ${sol.gradient} shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {sol.badge}
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </PageHero>
  );
}

// ─── Sticky Sidebar Nav ──────────────────────────────────────────────────────
function StickyNav({ activeId }: { activeId: SolutionId | null }) {
  return (
    <div className="hidden xl:flex flex-col gap-1 sticky top-28 self-start">
      <p className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-3 px-4">
        Jump to
      </p>
      {solutions.map((sol) => {
        const Icon = sol.icon;
        const isActive = activeId === sol.id;
        return (
          <a
            key={sol.id}
            href={`#${sol.id}`}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-card border border-foreground/[0.08] text-foreground shadow-sm"
                : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/[0.03]"
            }`}
          >
            {isActive && (
              <span
                className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-linear-to-b ${sol.gradient}`}
              />
            )}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                isActive
                  ? `bg-linear-to-br ${sol.gradient} text-white shadow-sm`
                  : "bg-foreground/5 text-foreground/30"
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="leading-tight">{sol.title.split(" ").slice(0, 2).join(" ")}</span>
          </a>
        );
      })}
    </div>
  );
}

// ─── CTA Banner ──────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden bg-card border border-foreground/[0.08] p-10 lg:p-16 text-center"
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-blue-600/8 pointer-events-none" />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none"
      />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Ready to transform?
        </div>
        <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-4">
          Not sure which platform <br className="hidden md:block" />
          <span className="text-primary italic">fits your needs?</span>
        </h2>
        <DescriptionTypography className="max-w-xl mx-auto mb-8 text-base">
          Our solutions architects will analyze your current operations and
          recommend the right combination of platforms for your business.
        </DescriptionTypography>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact-us">
            <Button size="lg" className="gap-2">
              Schedule a Free Consultation <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/our/work">
            <Button size="lg" variant="outline">
              View Our Work
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  const [activeId, setActiveId] = useState<SolutionId | null>("life");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    solutions.forEach((sol) => {
      const el = document.getElementById(sol.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(sol.id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <PageLayout>
      <SolutionsHero />

      <PageSection id="solutions-content" className="pt-0! pb-24">
        <div className="grid xl:grid-cols-[220px_1fr] gap-12 items-start">
          {/* Sticky sidebar */}
          <StickyNav activeId={activeId} />

          {/* Solution sections */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {solutions.map((sol, i) => (
              <SolutionSection key={sol.id} solution={sol} index={i} />
            ))}

            {/* CTA Banner */}
            <CTABanner />
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
