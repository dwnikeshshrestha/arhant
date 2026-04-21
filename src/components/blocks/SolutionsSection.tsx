"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Activity, ArrowRight, Layers, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ContainerLayout from "../layout/ContainerLayout";
import DescriptionTypography from "../DescriptionTypography";

// ─── Types ──────────────────────────────────────────────────────────────
type SolutionId = "life" | "general" | "aggregator" | "micro";

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

// ─── Feature Highlights (shared across all products) ────────────────────
const FEATURE_HIGHLIGHTS = [
  "Policy Administration",
  "Underwriting",
  "Claims Management",
  "Reporting & Analytics",
  "Accounting",
];

// ─── Data ──────────────────────────────────────────────────────────────
const imageMap: Record<SolutionId, string> = {
  life: "/assets/our-solutions/lifeInsurance.png",
  general: "/assets/our-solutions/nonLife.png",
  aggregator: "/assets/our-solutions/insuranceAggregator.png",
  micro: "/assets/our-solutions/lifeInsurance.png",
};

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

const LG_BREAKPOINT = 1024;

// ─── Component ─────────────────────────────────────────────────────────
export function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillNavRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ── Responsive detection ───────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < LG_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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

  // ── Scroll calculations ────────────────────────────────────────────
  const cardHeight = isMobile ? 460 : 510;
  const totalScrollDistance = isMobile ? 1400 : 2000;
  const pinOffset = isMobile ? 72 : 80;
  const scrollStep = totalScrollDistance / (solutions.length - 1);

  // Stores the ScrollTrigger instance so handleNavClick can read .start reliably
  const stRef = useRef<ScrollTrigger | null>(null);

  const handleNavClick = useCallback(
    (index: number) => {
      // st.start is the exact scrollY where the pin begins.
      // getBoundingClientRect() breaks after pinning because the element is
      // fixed in the viewport, making top ~= pinOffset regardless of scrollY.
      const pinStart = stRef.current?.start;
      if (pinStart != null) {
        window.scrollTo({
          top: pinStart + scrollStep * index,
          behavior: "smooth",
        });
        return;
      }
      // Fallback before scroll-trigger initializes (page load, first render)
      if (!stackRef.current) return;
      const el = stackRef.current;
      let offsetTop = 0;
      let node: HTMLElement | null = el;
      while (node) {
        offsetTop += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      window.scrollTo({
        top: offsetTop - pinOffset + scrollStep * index,
        behavior: "smooth",
      });
    },
    [pinOffset, scrollStep],
  );

  // ── Animation (scroll-trigger + Lenis) ───────────────────────────

  useEffect(() => {
    if (!mounted) return;

    let lenis: Lenis | null = null;
    let ctx: gsap.Context | null = null;

    const initAnimation = async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!isMobile) {
        const LenisModule = await import("lenis");
        const Lenis = LenisModule.default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time: number) => lenis?.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      }

      ctx = gsap.context(() => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length === 0) return;

        cards.forEach((card, idx) => {
          gsap.set(card, { clearProps: "all" });
          if (idx > 0) {
            gsap.set(card, { yPercent: 100, opacity: 0 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stackRef.current,
            start: `top top+=${pinOffset}`,
            end: `+=${totalScrollDistance}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: isMobile ? 0.3 : 1,
            invalidateOnRefresh: true,
            onRefresh: (self: ScrollTrigger) => {
              // Keep stRef up-to-date so handleNavClick always uses the
              // recalculated .start after resize or layout shifts.
              stRef.current = self;
            },
            onUpdate: (self: ScrollTrigger) => {
              stRef.current = self;
              const progress = self.progress;
              const segments = cards.length - 1;
              const idx = Math.min(
                segments,
                Math.floor(progress * segments + 0.5),
              );
              setActiveIndex(idx);
            },
          },
        });

        const segmentDuration = 1;

        for (let i = 1; i < cards.length; i++) {
          const insertPos = (i - 1) * segmentDuration;

          tl.to(
            cards[i],
            {
              yPercent: 0,
              opacity: 1,
              duration: segmentDuration,
              ease: "power2.inOut",
            },
            insertPos,
          );

          for (let j = 0; j < i; j++) {
            const depth = i - j;
            tl.to(
              cards[j],
              {
                scale: 1 - (isMobile ? 0.025 : 0.035) * depth,
                y: -(isMobile ? 6 : 12) * depth,
                duration: segmentDuration,
                ease: "power2.inOut",
              },
              insertPos,
            );
          }
        }
      }, stackRef);

      ScrollTrigger.refresh();
    };

    initAnimation();

    return () => {
      if (ctx) ctx.revert();
      if (stRef.current) stRef.current.kill();
      if (lenis) lenis.destroy();
    };
  }, [mounted, isMobile, totalScrollDistance, pinOffset]);

  return (
    <ContainerLayout
      id="solutions"
      ref={sectionRef}
      className="bg-background relative !pb-24 lg:!pb-32"
    >
      {/* Dynamic background glow */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 65% 50% at 75% 50%, ${solutions[activeIndex].glowColor}18 0%, transparent 65%)`,
        }}
      />
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 lg:mb-20 gap-6 lg:gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-primary rounded-full" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Our Solutions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-[1.1] font-heading">
            Transforming <br />
            <span className="text-primary italic">Insurance Ecosystems</span>
          </h2>
        </div>
        <div>
          <DescriptionTypography className="max-w-md lg:text-lg mb-4 lg:mb-6">
            Our comprehensive platforms are engineered to solve the most complex
            challenges in modern insurance.
          </DescriptionTypography>
          <button className="flex items-center gap-2 text-foreground font-semibold group hover:text-primary transition-colors">
            Explore All Solutions{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Mobile pill navigation (sticky) */}
      <div className="lg:hidden sticky top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-lg border-b border-foreground/[0.06]">
        <div
          ref={pillNavRef}
          className="flex gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {solutions.map((sol, i) => {
            const isActive = activeIndex === i;
            const Icon = sol.icon;
            return (
              <button
                key={sol.id}
                ref={isActive ? activePillRef : null}
                onClick={() => handleNavClick(i)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-300 shrink-0 ${
                  isActive
                    ? `bg-linear-to-r ${sol.color} text-white shadow-lg shadow-black/10`
                    : "bg-foreground/[0.06] text-foreground/40 active:scale-95"
                }`}
              >
                <Icon className="w-3 h-3" />
                {sol.title.split(" ").slice(0, 2).join(" ")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start mt-5 lg:mt-0">
        {/* Desktop left sidebar */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24 self-start space-y-2">
          {solutions.map((sol, i) => {
            const isActive = activeIndex === i;
            const Icon = sol.icon;
            return (
              <button
                key={sol.id}
                onClick={() => handleNavClick(i)}
                className={`relative w-full group p-4 rounded-2xl text-left transition-all duration-300 overflow-hidden cursor-pointer ${
                  isActive
                    ? "bg-card shadow-md border border-foreground/[0.08]"
                    : "hover:bg-foreground/[0.03] border border-transparent"
                }`}
              >
                {isActive && (
                  <span
                    className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-linear-to-b ${sol.color}`}
                  />
                )}
                <div className="flex gap-4 items-center pl-1">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? `bg-linear-to-br ${sol.color} text-white shadow-md`
                        : "bg-foreground/5 text-foreground/30"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-bold text-sm leading-tight transition-colors ${
                        isActive
                          ? "text-foreground"
                          : "text-foreground/40 group-hover:text-foreground/70"
                      }`}
                    >
                      {sol.title}
                    </p>
                    <p
                      className={`text-xs mt-0.5 truncate transition-colors ${
                        isActive ? "text-foreground/50" : "text-foreground/25"
                      }`}
                    >
                      {sol.badge}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
          <div className="flex items-center gap-2 pt-2 pl-5">
            {solutions.map((sol, i) => (
              <div
                key={sol.id}
                className={`rounded-full transition-all duration-500 ${
                  activeIndex === i
                    ? `h-2 w-6 bg-linear-to-r ${sol.color}`
                    : "h-2 w-2 bg-foreground/15"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card stack container */}
        <div className="lg:col-span-8">
          <div
            ref={stackRef}
            className="relative w-full"
            style={{ height: cardHeight }}
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
                  style={{ zIndex: i + 1, transformOrigin: "top center" }}
                >
                  {/* Card */}
                  <div className="group relative w-full h-full rounded-2xl lg:rounded-[2rem] overflow-hidden bg-card border border-foreground/[0.08] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.28)]">
                    {/* Top accent stripe */}
                    <div
                      className={`absolute inset-x-0 top-0 h-1 z-10 bg-linear-to-r ${sol.color}`}
                    />

                    {/* Background image — wrapped for isolated zoom */}
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={imageMap[sol.id]}
                        alt={sol.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        priority={i === 0}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>

                    {/* Dark overlay — deepens on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

                    {/* Color glow that bleeds in from the bottom on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[2]"
                      style={{
                        background: `radial-gradient(ellipse at 50% 115%, ${sol.glowColor}40 0%, transparent 60%)`,
                        boxShadow: `inset 0 0 0 1px ${sol.glowColor}28`,
                      }}
                    />

                    {/* Content */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 z-10">
                      {/* Badge + title + description + stat */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
                        <div className="min-w-0">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-linear-to-r ${sol.color} text-white mb-3`}
                          >
                            <Icon className="w-3 h-3" />
                            {sol.badge}
                          </span>
                          <h3 className="text-white text-lg sm:text-2xl font-bold leading-tight">
                            {sol.title}
                          </h3>
                          <p className="text-white/55 text-xs sm:text-sm mt-1.5 max-w-sm leading-relaxed">
                            {sol.description}
                          </p>
                        </div>
                        <div className="shrink-0 self-end sm:self-auto">
                          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl sm:rounded-2xl px-3.5 sm:px-5 py-2 sm:py-3.5 text-right transition-all duration-300 group-hover:bg-white/14 group-hover:border-white/22">
                            <p className="text-white font-bold text-xs sm:text-sm">
                              {sol.stat1}
                            </p>
                            <p className="text-white/45 text-[10px] sm:text-xs mt-0.5">
                              {sol.stat2}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Feature chips — always visible row */}
                      <div className="mt-4 pt-3.5 border-t border-white/9">
                        <div
                          className="flex gap-2 overflow-x-auto"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          {FEATURE_HIGHLIGHTS.map((label) => (
                            <span
                              key={label}
                              className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-white/55 bg-white/6 border border-white/8 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 transition-colors duration-300 group-hover:text-white/70 group-hover:border-white/13`}
                            >
                              <span
                                className={`inline-block w-1.25 h-1.25 rounded-full shrink-0 bg-linear-to-br ${sol.color}`}
                              />
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile progress dots — tappable */}
          <div className="flex lg:hidden items-center justify-center gap-2 pt-4">
            {solutions.map((sol, i) => (
              <button
                key={sol.id}
                onClick={() => handleNavClick(i)}
                aria-label={`Go to ${sol.title}`}
                className={`rounded-full transition-all duration-500 active:scale-90 ${
                  activeIndex === i
                    ? `h-2 w-6 bg-linear-to-r ${sol.color}`
                    : "h-2 w-2 bg-foreground/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
}
