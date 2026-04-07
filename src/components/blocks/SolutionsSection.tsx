"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ShieldCheck, Users, Layers, Activity, ArrowRight } from "lucide-react";
import Image from "next/image";

// ─── Data ────────────────────────────────────────────────────────────────────
const imageMap = {
  life: "/assets/our-solutions/lifeInsurance.png",
  general: "/assets/our-solutions/lifeInsurance.png",
  aggregator: "/assets/our-solutions/lifeInsurance.png",
  micro: "/assets/our-solutions/lifeInsurance.png",
} as const;

type SolutionId = keyof typeof imageMap;

interface Solution {
  id: SolutionId;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  badge: string;
  stat1: string;
  stat2: string;
}

const solutions: Solution[] = [
  {
    id: "life",
    title: "Life Insurance Platform",
    description:
      "End-to-end automation for life policy administration and complex underwriting workflows at enterprise scale.",
    icon: Activity,
    color: "from-blue-600 to-indigo-600",
    glowColor: "#1d4ed8",
    badge: "Life & Health",
    stat1: "12,490 Active Policies",
    stat2: "+14.2% Growth",
  },
  {
    id: "general",
    title: "General Insurance Suite",
    description:
      "Highly flexible foundation designed to support robust non-life portfolios with configurable product engines.",
    icon: ShieldCheck,
    color: "from-orange-500 to-red-600",
    glowColor: "#ea580c",
    badge: "Non-Life",
    stat1: "3,892 Claims/day",
    stat2: "−5.1% TAT",
  },
  {
    id: "aggregator",
    title: "Insurance Aggregator",
    description:
      "Unified gateways connecting carriers to compare, bind and issue quotes seamlessly across all lines.",
    icon: Layers,
    color: "from-emerald-500 to-teal-600",
    glowColor: "#059669",
    badge: "Distribution",
    stat1: "450 ms Avg Latency",
    stat2: "99.9% Uptime",
  },
  {
    id: "micro",
    title: "Micro Insurance Engine",
    description:
      "Lightweight scalable solutions designed for widespread inclusive insurance reaching underserved markets.",
    icon: Users,
    color: "from-purple-500 to-fuchsia-600",
    glowColor: "#9333ea",
    badge: "Inclusive Finance",
    stat1: "1.2 M Users",
    stat2: "+89 K/mo",
  },
];

// ─── Breakpoint ──────────────────────────────────────────────────────────────
const LG_BREAKPOINT = 1024;

// ─── Component ───────────────────────────────────────────────────────────────
export function SolutionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillNavRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < LG_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-scroll active pill into view on mobile
  useEffect(() => {
    if (!isMobile || !activePillRef.current || !pillNavRef.current) return;
    activePillRef.current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex, isMobile]);

  // ── Responsive values ──────────────────────────────────────────
  const cardH = isMobile ? 380 : 520;
  const totalScroll = isMobile ? 1400 : 2000;
  const pinOffset = isMobile ? 72 : 80;
  const scrollPerCard = totalScroll / (solutions.length - 1);

  const handleNavClick = useCallback(
    (i: number) => {
      if (!stackRef.current) return;
      const rect = stackRef.current.getBoundingClientRect();
      const stackTop = rect.top + window.scrollY - pinOffset;
      window.scrollTo({
        top: stackTop + scrollPerCard * i,
        behavior: "smooth",
      });
    },
    [pinOffset, scrollPerCard]
  );

  // ── GSAP + conditional Lenis ───────────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    let lenis: any = null;
    let ctx: any = null;

    const timer = setTimeout(async () => {
      const gsapMod = await import("gsap");
      const STMod = await import("gsap/ScrollTrigger");

      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = STMod.ScrollTrigger ?? STMod.default;
      gsap.registerPlugin(ScrollTrigger);

      // ── Lenis: ONLY on desktop ──────────────────────────────
      if (!isMobile) {
        const LenisMod = await import("lenis");
        const LenisClass = LenisMod.default ?? LenisMod.Lenis;
        lenis = new LenisClass({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time: number) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      }

      // ── GSAP context ────────────────────────────────────────
      ctx = gsap.context(() => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        const count = cards.length;

        // Clear any leftover inline styles
        cards.forEach((card, i) => {
          gsap.set(card, { clearProps: "all" });
          if (i > 0) {
            gsap.set(card, { yPercent: 100, opacity: 0 });
          }
        });

        // ── Master timeline ───────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stackRef.current,
            start: `top top+=${pinOffset}`,
            end: `+=${totalScroll}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: isMobile ? 0.5 : 1,
            invalidateOnRefresh: true,
            onUpdate: (self: any) => {
              const progress = self.progress;
              const segments = count - 1;
              const idx = Math.min(
                count - 1,
                Math.floor(progress * segments + 0.5)
              );
              setActiveIndex(idx);
            },
          },
        });

        const seg = 1;

        for (let i = 1; i < count; i++) {
          const pos = (i - 1) * seg;

          // Card slides up
          tl.to(
            cards[i],
            {
              yPercent: 0,
              opacity: 1,
              duration: seg,
              ease: "power2.inOut",
            },
            pos
          );

          // Previous cards recede into the stack
          for (let j = 0; j < i; j++) {
            const depth = i - j;
            tl.to(
              cards[j],
              {
                scale: 1 - (isMobile ? 0.025 : 0.035) * depth,
                y: -(isMobile ? 6 : 12) * depth,
                duration: seg,
                ease: "power2.inOut",
              },
              pos
            );
          }
        }
      }, stackRef);

      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
      if (lenis) lenis.destroy();
    };
  }, [mounted, isMobile, totalScroll, pinOffset]);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="bg-background relative pb-24 lg:pb-32"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 65% 50% at 75% 50%, ${solutions[activeIndex].glowColor}18 0%, transparent 65%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl pt-20 lg:pt-32">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 lg:mb-20 gap-6 lg:gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">
                Our Solutions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-[1.1]">
              Transforming <br />
              <span className="text-primary italic">
                Insurance Ecosystems
              </span>
            </h2>
          </div>
          <div>
            <p className="text-foreground/60 max-w-md text-base lg:text-lg mb-4 lg:mb-6">
              Our comprehensive platforms are engineered to solve the most
              complex challenges in modern insurance.
            </p>
            <button className="flex items-center gap-2 text-foreground font-semibold group hover:text-primary transition-colors">
              Explore All Solutions{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ── MOBILE: Horizontal pill nav ─────────────────────────── */}
        <div
          className="lg:hidden sticky top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-lg border-b border-foreground/[0.06]"
        >
          <div
            ref={pillNavRef}
            className="flex gap-2 overflow-x-auto pb-1 -mb-1"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>
            {solutions.map((sol, i) => {
              const isActive = activeIndex === i;
              const Icon = sol.icon;
              return (
                <button
                  key={sol.id}
                  ref={isActive ? activePillRef : null}
                  onClick={() => handleNavClick(i)}
                  className={[
                    "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-300 shrink-0",
                    isActive
                      ? `bg-gradient-to-r ${sol.color} text-white shadow-lg shadow-black/10`
                      : "bg-foreground/[0.06] text-foreground/40 active:scale-95",
                  ].join(" ")}
                >
                  <Icon className="w-3 h-3" />
                  {sol.title.split(" ").slice(0, 2).join(" ")}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start mt-5 lg:mt-0">

          {/* ── DESKTOP: Left sidebar nav ─────────────────────────── */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24 self-start space-y-2">
            {solutions.map((sol, i) => {
              const isActive = activeIndex === i;
              const Icon = sol.icon;
              return (
                <button
                  key={sol.id}
                  onClick={() => handleNavClick(i)}
                  className={[
                    "relative w-full group p-4 rounded-2xl text-left transition-all duration-300 overflow-hidden",
                    isActive
                      ? "bg-card shadow-md border border-foreground/[0.08]"
                      : "hover:bg-foreground/[0.03] border border-transparent",
                  ].join(" ")}
                >
                  {isActive && (
                    <span
                      className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b ${sol.color}`}
                    />
                  )}

                  <div className="flex gap-4 items-center pl-1">
                    <div
                      className={[
                        "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                        isActive
                          ? `bg-gradient-to-br ${sol.color} text-white shadow-md`
                          : "bg-foreground/5 text-foreground/30",
                      ].join(" ")}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={[
                          "font-bold text-sm leading-tight transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-foreground/40 group-hover:text-foreground/70",
                        ].join(" ")}
                      >
                        {sol.title}
                      </p>
                      <p
                        className={[
                          "text-xs mt-0.5 truncate transition-colors",
                          isActive
                            ? "text-foreground/50"
                            : "text-foreground/25",
                        ].join(" ")}
                      >
                        {sol.badge}
                      </p>
                    </div>

                    <span
                      className={[
                        "text-xs font-mono shrink-0 transition-colors",
                        isActive
                          ? "text-primary font-bold"
                          : "text-foreground/20",
                      ].join(" ")}
                    >
                      0{i + 1}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Progress dots */}
            <div className="flex items-center gap-2 pt-2 pl-5">
              {solutions.map((sol, i) => (
                <div
                  key={sol.id}
                  className={[
                    "rounded-full transition-all duration-500",
                    activeIndex === i
                      ? `h-2 w-6 bg-gradient-to-r ${sol.color}`
                      : "h-2 w-2 bg-foreground/15",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* ── Card stack ────────────────────────────────────────── */}
          <div className="lg:col-span-8">
            <div
              ref={stackRef}
              className="relative w-full"
              style={{ height: cardH }}
            >
              {solutions.map((sol, i) => {
                const Icon = sol.icon;
                return (
                  <div
                    key={sol.id}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="absolute inset-0 will-change-transform"
                    style={{
                      zIndex: i + 1,
                      transformOrigin: "top center",
                    }}
                  >
                    <div className="relative w-full h-full rounded-2xl lg:rounded-[2rem] overflow-hidden bg-card border border-foreground/[0.08] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)]">
                      {/* Top accent stripe */}
                      <div
                        className={`absolute inset-x-0 top-0 h-1 z-10 bg-gradient-to-r ${sol.color}`}
                      />

                      {/* Background image */}
                      <Image
                        src={imageMap[sol.id]}
                        alt={sol.title}
                        fill
                        className="object-cover"
                        priority={i === 0}
                      />

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Bottom info */}
                      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
                        <div className="min-w-0">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r ${sol.color} text-white mb-3`}
                          >
                            <Icon className="w-3 h-3" />
                            {sol.badge}
                          </span>
                          <h3 className="text-white text-lg sm:text-2xl font-bold leading-tight">
                            {sol.title}
                          </h3>
                          <p className="text-white/55 text-xs sm:text-sm mt-2 max-w-sm leading-relaxed">
                            {sol.description}
                          </p>
                        </div>

                        <div className="shrink-0 self-end sm:self-auto">
                          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl sm:rounded-2xl px-3.5 sm:px-5 py-2 sm:py-3.5 text-right">
                            <p className="text-white font-bold text-xs sm:text-sm">
                              {sol.stat1}
                            </p>
                            <p className="text-white/45 text-[10px] sm:text-xs mt-0.5">
                              {sol.stat2}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile progress dots */}
            <div className="flex lg:hidden items-center justify-center gap-2 pt-4">
              {solutions.map((sol, i) => (
                <div
                  key={sol.id}
                  className={[
                    "rounded-full transition-all duration-500",
                    activeIndex === i
                      ? `h-2 w-6 bg-gradient-to-r ${sol.color}`
                      : "h-2 w-2 bg-foreground/15",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
