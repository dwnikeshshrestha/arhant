"use client";
import { motion } from "framer-motion";

import { SectionBadge } from "@/lib/helperComponent";
import Image from "next/image";
import DescriptionTypography from "../DescriptionTypography";
import ContainerLayout from "../layout/ContainerLayout";

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
function TechnologyPartnerSection() {
  return (
    <ContainerLayout
      id="technology-section"
      className="relative bg-background overflow-hidden"
    >
      {/* ── TECHNOLOGY PARTNERS ────────────────────────────────────────── */}

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionBadge label="Ecosystem" centered />
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight mb-6">
            Technology <span className="text-primary italic">Partners</span>
          </h2>
          <DescriptionTypography className="mb-4 text-center mx-auto">
            We integrate with Nepal&apos;s leading payment gateways, financial
            infrastructure providers, and technology platforms to deliver a
            seamless insurance ecosystem.
          </DescriptionTypography>
        </motion.div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 ">
        {TECH_PARTNERS.map((partner, i) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
            whileHover={{ scale: 1.04, y: -4 }}
            className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-6 md:p-8 cursor-pointer transition-all duration-300 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/8"
          >
            {/* Top glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none bg-gradient-to-b from-primary/5 to-transparent" />

            <div className="relative w-full h-14 sm:h-16 flex items-center justify-center dark:bg-white/90 dark:rounded-lg dark:p-2">
              <Image
                src={partner.src}
                alt={partner.name}
                fill
                className="object-contain grayscale group-hover:grayscale-0 transition-all duration-400"
                sizes="200px"
              />
            </div>
            <span className="text-xs font-semibold text-foreground/40 group-hover:text-foreground/70 transition-colors duration-300 tracking-wide">
              {partner.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-12 h-px bg-gradient-to-r from-transparent via-border to-transparent origin-center"
      />
    </ContainerLayout>
  );
}

export default TechnologyPartnerSection;
