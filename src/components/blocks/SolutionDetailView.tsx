"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import {
  PageLayout,
  PageHero,
  PageSection,
} from "@/components/layout/PageLayout";
import DescriptionTypography from "@/components/DescriptionTypography";
import { Button } from "@/components/ui/Button";
import {
  solutions,
  getSolutionBySlug,
  type Solution,
} from "@/lib/solutions-data";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";

// ─── Hero ─────────────────────────────────────────────────────────────────────
function SolutionHero({ solution }: { solution: Solution }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const Icon = solution.icon;

  return (
    <PageHero ref={ref} className="pb-16">
      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: `${solution.glowColor}18` }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 15, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: `${solution.glowColor}10` }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.03,
        }}
      />

      {/* Large background word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[13vw] font-heading font-black uppercase text-foreground/[0.025] tracking-widest whitespace-nowrap">
          {solution.badge}
        </span>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div style={{ y, opacity }}>
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-6"
          >
            <Link
              href="/solutions"
              className="flex items-center gap-1.5 text-foreground/50 hover:text-primary transition-colors text-xs font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              All Solutions
            </Link>
            <span className="text-foreground/20 text-xs">/</span>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              {solution.badge}
            </span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-5"
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-linear-to-r ${solution.gradient} text-white`}
            >
              <Icon className="w-3.5 h-3.5" />
              {solution.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-foreground tracking-tight leading-[1.05] mb-5 max-w-4xl"
          >
            {solution.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`text-base font-semibold mb-6 bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent`}
          >
            {solution.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DescriptionTypography className="text-lg max-w-2xl mb-8">
              {solution.description}
            </DescriptionTypography>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-10 pt-8 border-t border-border/50 max-w-xl"
          >
            {solution.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span
                  className={`text-2xl font-heading font-bold bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-foreground/45">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </PageHero>
  );
}

function ScrollablePreview() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={<></>}
      >
        {/* <img
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        /> */}

        <Image
          src="/assets/our-solutions/lifeInsurance.png"
          alt="life insurance preview"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          // priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </ContainerScroll>
    </div>
  );
}
// ─── Features Grid ────────────────────────────────────────────────────────────
function FeaturesSection({ solution }: { solution: Solution }) {
  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-3 mb-3">
          <span className="w-6 h-[2px] bg-foreground/20 rounded-full" />
          Key Capabilities
        </span>
        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
          Everything you need to{" "}
          <span
            className={`bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent`}
          >
            run {solution.shortTitle}
          </span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {solution.features.map((feature, i) => {
          const FIcon = feature.icon;
          return (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-foreground/[0.07] hover:border-foreground/[0.14] hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-linear-to-br ${solution.gradient} text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}
              >
                <FIcon className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {feature.label}
                </p>
                <p className="text-xs text-foreground/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Overview + Benefits ──────────────────────────────────────────────────────
function OverviewSection({ solution }: { solution: Solution }) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-20 items-start">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-3 mb-4">
          <span className="w-6 h-[2px] bg-foreground/20 rounded-full" />
          Platform Overview
        </span>
        <h2 className="text-3xl font-heading font-bold text-foreground mb-5 leading-tight">
          Built for the way{" "}
          <span
            className={`bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent italic`}
          >
            insurers actually work
          </span>
        </h2>
        <DescriptionTypography className="leading-relaxed">
          {solution.longDescription}
        </DescriptionTypography>

        <div className="mt-8">
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-4">
            Trusted by
          </p>
          <div className="flex items-center gap-3">
            {solution.clients.map((client) => (
              <div
                key={client.name}
                title={client.name}
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold text-white bg-linear-to-br ${solution.gradient} shadow-md`}
              >
                {client.initials}
              </div>
            ))}
            <span className="text-xs text-foreground/40 ml-1">& more</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        {solution.benefits.map((benefit, i) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-foreground/[0.07] hover:border-foreground/[0.12] transition-all duration-300"
          >
            <div
              className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-linear-to-br ${solution.gradient}`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {benefit.title}
              </p>
              <p className="text-xs text-foreground/55 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Other Solutions ──────────────────────────────────────────────────────────
function OtherSolutions({ current }: { current: string }) {
  const others = solutions.filter((s) => s.slug !== current);
  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-foreground/40">
          Explore More
        </span>
        <h2 className="text-2xl font-heading font-bold text-foreground mt-2">
          Other Solutions
        </h2>
      </motion.div>
      <div className="grid sm:grid-cols-3 gap-4">
        {others.map((sol, i) => {
          const Icon = sol.icon;
          return (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/solutions/${sol.slug}`}
                className="group flex flex-col gap-3 p-5 rounded-2xl bg-card border border-foreground/[0.07] hover:border-foreground/20 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br ${sol.gradient} text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {sol.title}
                  </p>
                  <p className="text-xs text-foreground/50 mt-0.5 leading-relaxed line-clamp-2">
                    {sol.tagline}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA({ solution }: { solution: Solution }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden bg-card border border-foreground/[0.08] p-10 lg:p-16 text-center mb-8"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${solution.glowColor}18 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-10">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-linear-to-r ${solution.gradient} text-white`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Get Started
        </div>
        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
          Ready to transform your{" "}
          <span
            className={`bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent italic`}
          >
            {solution.shortTitle} operations?
          </span>
        </h2>
        <DescriptionTypography className="max-w-xl mx-auto mb-8 text-base">
          Our solutions architects will walk you through a live demo of{" "}
          {solution.title} tailored to your specific business needs.
        </DescriptionTypography>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact-us">
            <Button size="lg" className="gap-2">
              Request a Demo <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/solutions">
            <Button size="lg" variant="outline">
              View All Solutions
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Root View ────────────────────────────────────────────────────────────────
// Accepts only the slug string (serializable) from the server page component.
// Resolves the full solution object (including icon functions) client-side.
export default function SolutionDetailView({ slug }: { slug: string }) {
  const solution = getSolutionBySlug(slug);
  if (!solution) return null; // Server already handles notFound(), this is a safety guard

  return (
    <>
      <PageLayout>
        <SolutionHero solution={solution} />
      {/* <ScrollablePreview /> */}
        <PageSection id="solution-detail" className="pt-0! pb-24">
          <FeaturesSection solution={solution} />
          <OverviewSection solution={solution} />
          <OtherSolutions current={solution.slug} />
          <CTA solution={solution} />
        </PageSection>
      </PageLayout>
    </>
  );
}
