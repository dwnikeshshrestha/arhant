"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ContainerLayout from "../layout/ContainerLayout";

const PARTNERS = [
  "/assets/tech-partner/DanLogo.png",
  "/assets/tech-partner/NCHL-Logo.png",
  "/assets/tech-partner/cell-pay.png",
  "/assets/tech-partner/esewa_logo.png",
  "/assets/tech-partner/ime-pay.png",
  "/assets/tech-partner/npx.png",
  "/assets/tech-partner/palmmind-logo.webp",
  "/assets/tech-partner/thegana.svg"
];

export function PartnersSection() {
  return (
    <ContainerLayout id="partners" className="bg-background border-y border-foreground/5 overflow-hidden !py-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-foreground/50 text-sm tracking-widest uppercase font-bold"
        >
          Technology Partners
        </motion.p>
      </div>

      {/* Infinite scrolling marquee container */}
      <div className="relative flex overflow-x-hidden w-full group">
        {/* Gradients to fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] py-4">
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div
              key={index}
              className="mx-8 sm:mx-12 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-300"
            >
              <div className="relative h-16 w-32 sm:h-20 sm:w-40 px-4 flex items-center justify-center rounded-2xl bg-foreground/5 dark:bg-white/95 dark:p-3">
                <Image
                  src={partner}
                  alt="Tech Partner"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 128px, 160px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContainerLayout>
  );
}

