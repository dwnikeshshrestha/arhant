"use client";
import { AboutSection } from "@/components/blocks/AboutSection";
import OurValues from "@/components/blocks/OurValues";
import { PageLayout, PageHero, PageSection } from "@/components/layout/PageLayout";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DescriptionTypography from "@/components/DescriptionTypography";

function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <PageHero ref={ref} className="pb-16">
      {/* Background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[600px] h-[400px] bg-primary/6 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"
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
        <span className="text-[17vw] font-heading font-black uppercase text-foreground/[0.025] tracking-widest whitespace-nowrap">
          ABOUT
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
              About Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-foreground tracking-tight leading-[1.05] mb-6 max-w-4xl"
          >
            Introducing <span className="text-primary italic">Nepal&apos;s</span>
            <br />
            IT Mastery to the World
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DescriptionTypography className="text-lg max-w-2xl mb-8">
              Arhant Solutions was established with the objective of introducing Nepal’s highly matured IT execution capability to the world. We are a rapidly expanding IT service company with the goal of assisting clients with the deployment and use of their enterprises.
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
              { value: "10+", label: "Years Experience" },
              { value: "50+", label: "IT Professionals" },
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

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutHero />
      <PageSection id="about-us" className="pt-0! pb-24 relative overflow-hidden">
        <AboutSection />
        <OurValues />
      </PageSection>
    </PageLayout>
  );
}
