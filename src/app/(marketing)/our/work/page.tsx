"use client";

import DescriptionTypography from "@/components/DescriptionTypography";
import {
  PageHero,
  PageLayout,
  PageSection,
} from "@/components/layout/PageLayout";
import { Tabs, TabsList } from "@/components/ui/tabs";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  X
} from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Category =
  | "All"
  | "Enterprise System"
  | "Web Application"
  | "Data & Analytics"
  | "Mobile"
  | "Integration";

interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  tags: string[];
  year: string;
  featured?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: "proj-1",
    title: "Core Insurance Platform",
    category: "Enterprise System",
    description:
      "A comprehensive enterprise solution powering underwriting, claims processing, and policy lifecycle management for leading insurers across Nepal. Processing 12,000+ policies daily with 99.9% uptime.",
    imageUrl: "/assets/our-works/ebeema-new.png",
    websiteUrl: "#",
    tags: ["Underwriting", "Claims", "Policy Management"],
    year: "2023",
    featured: true,
  },
  {
    id: "proj-2",
    title: "Digital Claims Portal",
    category: "Web Application",
    description:
      "A streamlined self-service portal enabling customers to file, track, and manage claims digitally — reducing turnaround time by 60%.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    websiteUrl: "#",
    tags: ["Portal", "Self-Service", "UX"],
    year: "2023",
  },
  {
    id: "proj-3",
    title: "Agent Performance Dashboard",
    category: "Data & Analytics",
    description:
      "Real-time analytics and KPI tracking interface empowering insurance agents and managers to optimize performance and revenue.",
    imageUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop",
    websiteUrl: "#",
    tags: ["Analytics", "Dashboards", "Real-Time"],
    year: "2022",
  },
  {
    id: "proj-4",
    title: "Reinsurance Management System",
    category: "Enterprise System",
    description:
      "End-to-end reinsurance treaty and facultative management platform with automated bordereaux generation and settlement tracking.",
    imageUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
    websiteUrl: "#",
    tags: ["Reinsurance", "Automation", "Compliance"],
    year: "2022",
  },
  {
    id: "proj-5",
    title: "Insurance Aggregator Platform",
    category: "Integration",
    description:
      "Multi-carrier aggregator enabling real-time quote comparison and instant policy issuance across Nepal's top insurers with sub-500ms latency.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    websiteUrl: "#",
    tags: ["API", "Multi-Carrier", "Real-Time"],
    year: "2024",
  },
  {
    id: "proj-6",
    title: "Mobile Insurance App",
    category: "Mobile",
    description:
      "A customer-facing mobile application for policy purchase, premium payment, and claims filing — available on iOS and Android.",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    websiteUrl: "#",
    tags: ["iOS", "Android", "Payments"],
    year: "2024",
  },
  {
    id: "proj-7",
    title: "Risk Analytics Engine",
    category: "Data & Analytics",
    description:
      "ML-powered risk scoring and portfolio analytics platform providing actuarial-grade insights for underwriters and product managers.",
    imageUrl:
      "https://images.unsplash.com/photo-1642543348745-268e4b85e5e0?q=80&w=2070&auto=format&fit=crop",
    websiteUrl: "#",
    tags: ["ML", "Actuarial", "Risk"],
    year: "2023",
  },
  {
    id: "proj-8",
    title: "Agent Onboarding Portal",
    category: "Web Application",
    description:
      "Digital onboarding and licensing management portal for insurance agents reducing registration time from 2 weeks to 48 hours.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    websiteUrl: "#",
    tags: ["Onboarding", "Licensing", "Portal"],
    year: "2024",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Enterprise System",
  "Web Application",
  "Data & Analytics",
  "Mobile",
  "Integration",
];

// ─── Category color map ──────────────────────────────────────────────────────
const CATEGORY_STYLE: Record<Category, string> = {
  All: "from-foreground to-foreground",
  "Enterprise System": "from-blue-500 to-indigo-600",
  "Web Application": "from-orange-500 to-red-500",
  "Data & Analytics": "from-emerald-500 to-teal-600",
  Mobile: "from-purple-500 to-fuchsia-600",
  Integration: "from-amber-500 to-orange-500",
};

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-card border border-foreground/[0.08] hover:border-foreground/[0.16] transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${project.featured ? "h-[360px]" : "h-[240px]"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full text-white bg-linear-to-r ${CATEGORY_STYLE[project.category]} shadow-md`}
          >
            {project.category}
          </span>
        </div>

        {/* Year */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-black/40 backdrop-blur-md text-white/70 border border-white/10">
            {project.year}
          </span>
        </div>

        {/* Arrow */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
          <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className={`font-heading font-bold text-foreground mb-2 ${project.featured ? "text-xl" : "text-base"}`}
        >
          {project.title}
        </h3>
        <p className="text-sm text-foreground/55 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-md bg-foreground/[0.05] text-foreground/50 border border-foreground/[0.07]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function OurWorkHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <PageHero ref={ref} className="pb-16">
      {/* Background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary/6 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, -15, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.03,
        }}
      />

      {/* Large background word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[18vw] font-heading font-black uppercase text-foreground/[0.025] tracking-widest whitespace-nowrap">
          Work
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
              Our Work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-foreground tracking-tight leading-[1.05] mb-6 max-w-4xl"
          >
            Projects that
            <br />
            <span className="text-primary italic">define the industry</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DescriptionTypography className="text-lg max-w-2xl mb-8">
              Explore how we have transformed insurance organizations across
              Nepal with cutting-edge software — from enterprise policy systems
              to mobile-first customer experiences.
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
              { value: "26+", label: "Clients served" },
              { value: "50+", label: "Projects delivered" },
              { value: "8+", label: "Years of expertise" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-heading font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-foreground/45">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </PageHero>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OurWorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filtered = useMemo(() => {
    let list = projects;
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  function handleCategoryChange(value: string) {
    setActiveCategory(value as Category);
  }
  return (
    <PageLayout>
      <OurWorkHero />

      <PageSection id="our-work-grid" className="pt-0! pb-24">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          {/* Category pills */}
          {/* <div className="flex items-center gap-1.5 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-foreground/40 mr-1 shrink-0" />
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? `bg-linear-to-r ${CATEGORY_STYLE[cat]} text-white shadow-md scale-105`
                      : "bg-foreground/[0.06] text-foreground/50 hover:bg-foreground/[0.10] hover:text-foreground/80"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div> */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10 overflow-x-auto"
          >
            <Tabs
              value={activeCategory}
              onValueChange={(value: string) => handleCategoryChange(value)}
            >
              <TabsList className="flex w-max gap-2 bg-transparent p-0 h-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                      activeCategory === cat
                        ? "bg-primary text-white border-primary"
                        : "bg-transparent text-foreground/60 border-foreground/15 hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search projects…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-foreground/[0.04] border border-foreground/[0.10] rounded-xl px-3.5 py-2 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary transition"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => {
                if (showSearch) {
                  setShowSearch(false);
                  setSearchQuery("");
                } else {
                  setShowSearch(true);
                }
              }}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-foreground/[0.06] text-foreground/50 hover:bg-foreground/[0.10] hover:text-foreground transition-colors"
            >
              {showSearch ? (
                <X className="w-4 h-4" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Count */}
        <motion.p
          key={filtered.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-foreground/40 mb-6"
        >
          Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` in "${activeCategory}"` : ""}
        </motion.p>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full flex flex-col items-center justify-center py-24 text-center gap-3"
              >
                <p className="text-5xl">🔍</p>
                <p className="text-lg font-semibold text-foreground/60">
                  No projects found
                </p>
                <p className="text-sm text-foreground/40">
                  Try a different category or search term
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                    setShowSearch(false);
                  }}
                  className="mt-2 text-sm text-primary hover:underline font-medium"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 relative rounded-3xl overflow-hidden bg-card border border-foreground/[0.08] p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <div className="relative z-10 text-center lg:text-left">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-3">
              Ready to build something{" "}
              <span className="text-primary italic">remarkable?</span>
            </h3>
            <DescriptionTypography className="max-w-lg">
              Let us bring your insurance platform vision to life — on time, on
              budget, and beyond expectation.
            </DescriptionTypography>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact-us"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/solutions"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-foreground/[0.06] border border-foreground/[0.10] text-foreground text-sm font-semibold hover:bg-foreground/[0.10] active:scale-95 transition-all duration-200"
            >
              View Solutions
            </Link>
          </div>
        </motion.div>
      </PageSection>
    </PageLayout>
  );
}
