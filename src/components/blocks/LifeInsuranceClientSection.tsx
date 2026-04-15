"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ContainerLayout from "../layout/ContainerLayout";
import { HoverEffect } from "../ui/card-hover-effect";
import { SectionBadge } from "@/lib/helperComponent";
import DescriptionTypography from "../DescriptionTypography";

// ─── Data ──────────────────────────────────────────────────────────────────────

const GENERAL_CLIENTS = [
  { src: "/assets/clients/AJOD-insurance.jpg", name: "AJOD Insurance" },
  { src: "/assets/clients/NLG.jpg", name: "NLG Insurance" },
  {
    src: "/assets/clients/himalayan-general-insurance 1.png",
    name: "Himalayan General",
  },
  { src: "/assets/clients/ime-general-insurance 1.png", name: "IME General" },
  { src: "/assets/clients/national-insurance.jpg", name: "National Insurance" },
  {
    src: "/assets/clients/lumbini-general-insurance-company.jpg",
    name: "Lumbini General",
  },
  { src: "/assets/clients/premier-insurance 1.png", name: "Premier Insurance" },
  { src: "/assets/clients/shikhar.png", name: "Shikhar Insurance" },
  {
    src: "/assets/clients/siddhartha-insurance.jpg",
    name: "Siddhartha Insurance",
  },
  { src: "/assets/clients/united-insurance 1.png", name: "United Insurance" },
  {
    src: "/assets/clients/prudential-insurance.png",
    name: "Prudential Insurance",
  },
  { src: "/assets/clients/gic.png", name: "GIC" },
  { src: "/assets/clients/oriental-insurance.png", name: "Oriental Insurance" },
  { src: "/assets/clients/rastriya-beema-company.png", name: "Rastriya Beema" },
  { src: "/assets/clients/sanima.png", name: "Sanima General" },
];

const LIFE_CLIENTS = [
  {
    src: "/assets/clients/1620379054024-Asian-Life-Insurance 1.png",
    name: "Asian Life",
  },
  { src: "/assets/clients/citizen-life-insurance 1.png", name: "Citizen Life" },
  { src: "/assets/clients/ime-life-insurance28 1.png", name: "IME Life" },
  { src: "/assets/clients/jyoti-life-insurance 1.png", name: "Jyoti Life" },
  { src: "/assets/clients/lic-logo 1.png", name: "LIC Nepal" },
  { src: "/assets/clients/national-life 1.png", name: "National Life" },
  { src: "/assets/clients/nepallife.png", name: "Nepal Life" },
  {
    src: "/assets/clients/reliable-life-insurance-limited52 1.png",
    name: "Reliable Life",
  },
  { src: "/assets/clients/union-life-insurance 1.png", name: "Union Life" },
];

const TECH_PARTNERS = [
  { src: "/assets/tech-partner/DanLogo.png", name: "Dan IT" },
  { src: "/assets/tech-partner/NCHL-Logo.png", name: "NCHL" },
  { src: "/assets/tech-partner/cell-pay.png", name: "CellPay" },
  { src: "/assets/tech-partner/esewa_logo.png", name: "eSewa" },
  { src: "/assets/tech-partner/ime-pay.png", name: "IME Pay" },
  { src: "/assets/tech-partner/npx.png", name: "NPX" },
  { src: "/assets/tech-partner/palmmind-logo.webp", name: "Palmmind" },
  { src: "/assets/tech-partner/thegana.svg", name: "The Gana" },
];
const projects = [
  {
    title: "15",
    description: "Non-Life Insurance Companies",
    link: "https://stripe.com",
  },
  {
    title: "83%",
    description: "Nepal Non-Life Market Coverage",
    link: "https://netflix.com",
  },
  {
    title: "18",
    description: "Total Non-Life Companies in Nepal",
    link: "https://google.com",
  },
];
const projectsLife = [
  {
    title: "9",
    description: "Life Insurance Companies",
    link: "https://stripe.com",
  },
  {
    title: "100%",
    description: "Uptime SLA Maintained",
    link: "https://netflix.com",
  },
  {
    title: "∞",
    description: "Ongoing Support & Maintenance",
    link: "https://google.com",
  },
];
// ─── Animated Counter ──────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ─── Client Logo Grid ──────────────────────────────────────────────────────────

function ClientLogoGrid({
  clients,
  accentColor,
}: {
  clients: { src: string; name: string }[];
  accentColor: string;
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
      {clients.map((client, i) => (
        <motion.div
          key={client.name}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
          whileHover={{ scale: 1.06, y: -3 }}
          className="group relative flex items-center justify-center rounded-xl border border-border bg-card p-3 md:p-4 cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
          style={{
            boxShadow: undefined,
          }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 120%, ${accentColor}18 0%, transparent 65%)`,
            }}
          />
          <div className="relative w-full h-10 sm:h-12 flex items-center justify-center dark:bg-white/90 dark:rounded-lg dark:p-1.5">
            <Image
              src={client.src}
              alt={client.name}
              fill
              className="object-contain grayscale group-hover:grayscale-0 transition-all duration-400"
              sizes="120px"
            />
          </div>
          <span className="sr-only">{client.name}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────

// ─── Section Header ────────────────────────────────────────────────────────────

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LifeInsuranceClientSection() {
  const primaryOrange = "hsl(24 100% 50%)";
  const primaryBlue = "hsl(217 91% 55%)";

  return (
    <ContainerLayout
      id="insurance-clients"
      className="relative bg-background overflow-hidden"
    >
      {/* ── LIFE INSURANCE ─────────────────────────────────────────────── */}
      <div className="border-b border-border/60">
        {/* Header — centered */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionBadge label="Life Insurance Clients" centered />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.1] mb-6"
          >
            <AnimatedCounter target={9} />{" "}
            <span className="text-primary">leading</span> life insurers trust{" "}
            <span className="italic">iEnsure Life</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <DescriptionTypography className="mb-4">
              Trusted by nine leading life insurance companies for core
              operations — from policy issuance and actuarial reporting to
              claims settlement and compliance.
            </DescriptionTypography>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <HoverEffect items={projectsLife} />
        </div>

        {/* Client Logos */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-5 text-center"
        >
          Our 9 Life Insurance Clients
        </motion.p>
        <ClientLogoGrid clients={LIFE_CLIENTS} accentColor={primaryBlue} />
      </div>
    </ContainerLayout>
  );
}
