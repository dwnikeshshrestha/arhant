"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, Users, Layers, Activity, Server, FileText, PieChart, Bell, ArrowRight, LayoutGrid, Globe, Zap } from "lucide-react";
import Image from "next/image";
import { ScrollStack, ScrollStackItem } from "@/components/ui/scroll-stack";

const imageMap = {
  life: "/assets/our-solutions/lifeInsurance.png",
  general: "/assets/our-solutions/lifeInsurance.png",
  aggregator: "/assets/our-solutions/lifeInsurance.png",
  micro: "/assets/our-solutions/lifeInsurance.png"
} as const;

type SolutionId = keyof typeof imageMap;

interface Solution {
  id: SolutionId;
  title: string;
  description: string;
  icon: any;
  color: string;
  glowColor: string;
  demoData: {
    header: string;
    metric1: string;
    metric2: string;
  };
}


const solutions: readonly Solution[] = [
  {
    id: "life",
    title: "Life Insurance Platform",
    description: "End-to-end automation for life policy administration and complex underwriting.",
    icon: Activity,
    color: "from-blue-600 to-indigo-600",
    glowColor: "rgba(37, 99, 235, 0.15)",
    demoData: { header: "Life Underwriting", metric1: "12,490 Active", metric2: "+14.2%" }
  },
  {
    id: "general",
    title: "General Insurance Suite",
    description: "Highly flexible foundation designed to support robust non-life portfolios.",
    icon: ShieldCheck,
    color: "from-orange-500 to-red-600",
    glowColor: "rgba(249, 115, 22, 0.15)",
    demoData: { header: "General Claims", metric1: "3,892 Processing", metric2: "-5.1% TAT" }
  },
  {
    id: "aggregator",
    title: "Insurance Aggregator",
    description: "Unified gateways connecting carriers to compare quotes seamlessly.",
    icon: Layers,
    color: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.15)",
    demoData: { header: "Quote Aggregation", metric1: "450ms Latency", metric2: "99.9% Up" }
  },
  {
    id: "micro",
    title: "Micro Insurance Engine",
    description: "Lightweight scalable solutions designed for widespread inclusive insurance.",
    icon: Users,
    color: "from-purple-500 to-fuchsia-600",
    glowColor: "rgba(168, 85, 247, 0.15)",
    demoData: { header: "Micro Enrollments", metric1: "1.2M Users", metric2: "+89K/mo" }
  },
];

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState<Solution>(solutions[0]);
  console.log("activeTab", activeTab)
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect for the dashboard
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="solutions" className="py-32 bg-background relative overflow-hidden">
      {/* Dynamic Background Glow based on Active Tab */}
      <div
        className="absolute inset-0 transition-colors duration-1000 -z-10"
        style={{ backgroundColor: activeTab.glowColor }}
      />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Solutions</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-heading font-bold text-foreground leading-[1.1]"
            >
              Transforming <br />
              <span className="text-primary italic">Insurance Ecosystems</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-foreground/60 max-w-md font-sans text-lg mb-6">
              Our comprehensive platforms are engineered to solve the most complex challenges in modern insurance.
            </p>
            <button className="flex items-center gap-2 text-foreground font-semibold group hover:text-primary transition-colors">
              Explore All Solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Navigation with Liquid Tabs */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            {solutions.map((solution) => {
              const isActive = activeTab.id === solution.id;
              return (
                <button
                  key={solution.id}
                  onClick={() => setActiveTab(solution)}
                  className={`relative group p-6 rounded-3xl transition-all text-left overflow-hidden ${isActive ? "bg-card shadow-xl shadow-black/5" : "hover:bg-foreground/[0.03]"
                    }`}
                >
                  {/* Shared Liquid Layout ID */}
                  {isActive && (
                    <motion.div
                      layoutId="liquidTab"
                      className="absolute inset-0 bg-card border border-foreground/[0.08] dark:border-white/[0.08]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <div className="relative z-10 flex gap-5 items-center">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${isActive ? `bg-gradient-to-br ${solution.color} text-white` : "bg-foreground/5 text-foreground/40"
                      }`}>
                      <solution.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`text-xl font-heading font-bold transition-colors ${isActive ? "text-foreground" : "text-foreground/50 group-hover:text-foreground"
                        }`}>
                        {solution.title}
                      </h4>
                      <p className={`text-sm mt-1 transition-colors line-clamp-1 ${isActive ? "text-foreground/60" : "text-foreground/30"
                        }`}>
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* High-Fidelity 3D Dashboard Showcase */}
          <div
            className="lg:col-span-8 perspective-[1500px]"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative rounded-[2.5rem] bg-card/60 backdrop-blur-2xl border border-foreground/[0.08] dark:border-white/[0.08] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] p-1 overflow-hidden"
              >
                {/* Internal Dashboard Wrapper */}
                <div className="rounded-[2.25rem] bg-background/50 overflow-hidden h-[540px] flex flex-col relative border border-white/10 shadow-inner">

                  {/* Glassmorphic App Header */}

                  <Image src={imageMap[activeTab.id]} className="object-cover" alt={`${activeTab.title} Interface Showcase`} fill />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

    </section>
  );
}
