"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative pt-20 h-screen overflow-hidden font-sans">
      {/* Cursor glow */}
      <motion.div
        animate={{ x: mousePosition.x - 300, y: mousePosition.y - 300 }}
        transition={{ type: "tween", ease: "backOut", duration: 1 }}
        className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none hidden md:block"
      />

      {/* Same horizontal container as every other section */}
      <div className="container mx-auto px-6 lg:px-8 h-full flex items-center">
        <div className="w-full h-[85%] flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: content ── */}
          <div className="flex flex-col justify-center flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-heading font-extrabold text-foreground tracking-tight leading-[1.1] mb-5"
            >
              Powering Nepal&apos;s
              <br />
              <span className="text-primary italic">Insurance</span>
              <br />
              Industry with Smart Tech
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-base md:text-lg text-foreground/65 mb-8 max-w-md leading-relaxed"
            >
              Enterprise-grade insurance management systems trusted by 26+
              companies — automating operations and accelerating digital
              transformation across Nepal.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Our Work
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="grid grid-cols-4 gap-6 pt-8 border-t border-border max-w-sm"
            >
              {[
                { value: "26+", label: "Companies" },
                { value: "15", label: "Non-Life" },
                { value: "9", label: "Life" },
                { value: "83%", label: "Market" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-heading font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs text-foreground/45">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: image ── */}
          <div className="flex-[1.1] hidden lg:block relative h-full">
            {/* Glow blobs */}
            <div className="absolute top-1/3 right-4 w-64 h-64 bg-primary/20 blur-3xl rounded-full -z-10" />
            <div className="absolute bottom-1/4 left-4 w-56 h-56 bg-blue-500/15 blur-3xl rounded-full -z-10" />

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
              className="relative w-full h-full py-8"
            >
              {/* Main image */}
              <div
                className="relative w-full h-full overflow-hidden shadow-2xl shadow-black/25 ring-1 ring-border/30"
                style={{ borderRadius: "40px 12px 40px 12px" }}
              >
                <Image
                  src="https://plus.unsplash.com/premium_photo-1722859220312-0f4db78d3087?q=80&w=1114&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Insurance Technology Platform"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-background/15 via-transparent to-transparent" />
              </div>

              {/* Accent image — bottom-left overlap */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
                className="absolute bottom-16 -left-10 w-40 h-40 overflow-hidden shadow-2xl shadow-black/25 ring-2 ring-background"
                style={{ borderRadius: "24px 8px 24px 8px" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
                  alt="Team working"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Pill badge — top-left */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-12 -left-8 bg-background/95 backdrop-blur-md border border-border rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2.5"
              >
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                  83% Nepal Market Share
                </span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
