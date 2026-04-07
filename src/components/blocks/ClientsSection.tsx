"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ClientsSection() {
  const clients = [
    "/assets/clients/1620379054024-Asian-Life-Insurance 1.png",
    "/assets/clients/AJOD-insurance.jpg",
    "/assets/clients/JAvva8NJkYavLZu4-NE0cNjFSqi2Kb1f 1.png",
    "/assets/clients/NLG.jpg",
    "/assets/clients/asian2.png",
    "/assets/clients/citizen-life-insurance 1.png",
    "/assets/clients/ebeema-logo 1.png",
    "/assets/clients/gic.png",
    "/assets/clients/gurans-life-insurance 1.png",
    "/assets/clients/gurdaian.png",
    "/assets/clients/himalayan-general-insurance 1.png",
    "/assets/clients/ime-general-insurance 1.png",
    "/assets/clients/ime-life-insurance28 1.png",
    "/assets/clients/jyoti-life-insurance 1.png",
    "/assets/clients/lic-logo 1.png",
    "/assets/clients/lumbini-general-insurance-company.jpg",
    "/assets/clients/national-insurance.jpg",
    "/assets/clients/national-life 1.png",
    "/assets/clients/nepal-insurers-association.jpg",
    "/assets/clients/nepallife.png",
    "/assets/clients/oriental-insurance.png",
    "/assets/clients/premier-insurance 1.png",
    "/assets/clients/prudential-insurance.png",
    "/assets/clients/rastriya-beema-company.png",
    "/assets/clients/reliable-life-insurance-limited52 1.png",
    "/assets/clients/sanima.png",
    "/assets/clients/shikhar.png",
    "/assets/clients/siddhartha-insurance.jpg",
    "/assets/clients/sunlife.png",
    "/assets/clients/union-life-insurance 1.png",
    "/assets/clients/united-insurance 1.png"
  ];

  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-20 bg-background border-y border-border overflow-hidden drop-shadow-lg ">
      <div className="container mx-auto px-6 max-w-6xl text-center mb-10">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-foreground/50 text-sm tracking-widest uppercase font-bold"
        >
          Trusted By Leading Enterprises
        </motion.h3>
      </div>

      {/* Infinite scrolling marquee container */}
      <div className="relative flex overflow-x-hidden w-full group">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] py-4">
          {duplicatedClients.map((client, idx) => (
            <div
              key={idx}
              className="mx-8 sm:mx-12 flex items-center justify-center opacity-60 hover:opacity-100 transition-all grayscale hover:grayscale-0 duration-300 cursor-pointer"
            >
              <div className="relative w-32 h-16 sm:w-40 sm:h-20 flex items-center justify-center dark:bg-white/95 dark:p-3 dark:rounded-xl">
                <Image
                  src={client}
                  alt="Client Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 128px, 160px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
