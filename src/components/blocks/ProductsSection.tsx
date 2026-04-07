"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Box, CheckCircle2, Cloud, Zap } from "lucide-react";
import React from "react";

interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ElementType;
}

const products: Product[] = [
  {
    id: "life",
    title: "IENSURE LIFE",
    subtitle: "Life Insurance Management Software",
    description:
      "All-in-one insurance management software that aids life insurance companies in automating their operations, simplifying procedures, and enhancing productivity.",
    features: [
      "Policy Administration",
      "Claims Management",
      "Underwriting",
      "Accounting",
      "Reporting & Analytics",
    ],
    icon: Box,
  },
  {
    id: "general",
    title: "IENSURE GENERAL",
    subtitle: "General Insurance Capabilities",
    description:
      "Highly flexible and scalable solution customizable to meet specific business needs. Automates and optimizes operations to reduce costs, improve efficiency, and increase profitability.",
    features: [
      "Policy Administration",
      "Claims Management",
      "Underwriting",
      "Accounting",
      "Reporting & Analytics",
    ],
    icon: Zap,
  },
  {
    id: "micro",
    title: "IENSURE MICRO",
    subtitle: "Micro Insurance Management",
    description:
      "Designed to be highly flexible and customizable, allowing you to add new products or modify existing ones as your market evolves rapidly.",
    features: [
      "Policy Administration",
      "Claims Management",
      "Underwriting",
      "Accounting",
      "Reporting & Analytics",
    ],
    icon: Cloud,
  },
];

export function ProductsSection() {
  return (
    <section id="products" className="py-32 relative bg-background overflow-hidden">
      {/* Background Ornaments */}



      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
              IEnsure Suite
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
              Built for <span className="text-primary italic">Modern Insurers</span>
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto text-lg font-sans mt-2">
              Transforming traditional insurance operations into data-driven, customer-centric digital experiences with our specialized IEnsure product suite.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative flex flex-col h-full bg-foreground/[0.02] dark:bg-white/[0.03] backdrop-blur-sm rounded-3xl border border-foreground/[0.08] dark:border-white/[0.08] hover:border-primary/40 transition-all duration-500 overflow-hidden"
            >
              {/* Card Spotlight Highlight (Behind) */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-8 md:p-10 relative z-10 flex flex-col h-full">
                {/* Icon Section */}
                <div className="mb-8 relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <product.icon className="w-8 h-8" />
                  </div>
                  {/* Subtle float animation for the icon bg glow */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Headings */}
                <div className="mb-8 shrink-0">
                  <h3 className="text-2xl font-heading font-bold text-foreground leading-tight mb-3">
                    {product.title}
                  </h3>
                  <div className="h-1 w-12 bg-primary rounded-full mb-4" />
                  <p className="text-primary/80 font-sans text-sm font-semibold tracking-wide uppercase">
                    {product.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-foreground/70 font-sans leading-relaxed mb-8 grow">
                  {product.description}
                </p>

                {/* Feature List */}
                <div className="mb-10 grow flex flex-col">
                  <h4 className="text-foreground font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2 shrink-0">
                    Key Capabilities
                    <div className="h-px bg-foreground/10 flex-1" />
                  </h4>
                  <ul className="grid grid-cols-1 gap-4 grow">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-foreground/80 group/feat">
                        <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0 transition-group group-hover:bg-primary/20">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="font-sans group-hover:text-primary transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Section */}
                <div className="pt-6 border-t border-foreground/[0.08] shrink-0">
                  <Button className="w-full justify-between items-center bg-transparent border border-foreground/[0.1] dark:border-white/[0.1] text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 rounded-xl group/btn overflow-hidden relative">
                    <span className="relative z-10 flex items-center gap-2">Explore Solutions <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
