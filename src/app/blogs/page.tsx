"use client";
import { PageLayout, PageHero, PageSection } from "@/components/layout/PageLayout";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Tabs, TabsList } from "@/components/ui/tabs";
import DescriptionTypography from "@/components/DescriptionTypography";

const ALL_BLOGS = [
  {
    id: 1,
    title: "The Future of Micro Insurance in Developing Nations",
    category: "Industry Trends",
    date: "April 15, 2026",
    excerpt:
      "Exploring how micro insurance models are reshaping financial protection for underserved communities.",
  },
  {
    id: 2,
    title: "How Automation is Reducing Claims Processing Time by 40%",
    category: "Technology",
    date: "March 28, 2026",
    excerpt:
      "AI-driven workflows are cutting manual overhead and dramatically accelerating claims resolution.",
  },
  {
    id: 3,
    title: "IEnsure General: A Comprehensive Look at Capabilities",
    category: "Product Update",
    date: "March 10, 2026",
    excerpt:
      "An in-depth overview of the latest features and enhancements shipped in IEnsure General.",
  },
  {
    id: 4,
    title: "Navigating Regulatory Compliance in Embedded Insurance",
    category: "Regulatory",
    date: "February 25, 2026",
    excerpt:
      "Key regulatory considerations every InsurTech must address when embedding insurance into third-party platforms.",
  },
  {
    id: 5,
    title: "Real-World Impact: Crop Insurance Success Stories",
    category: "Case Studies",
    date: "February 12, 2026",
    excerpt:
      "How smallholder farmers across South Asia are recovering faster from climate shocks with parametric crop cover.",
  },
  {
    id: 6,
    title: "Building APIs for Insurance Data Interoperability",
    category: "Technology",
    date: "January 30, 2026",
    excerpt:
      "Designing robust, standards-compliant APIs that allow insurers, aggregators, and regulators to share data seamlessly.",
  },
  {
    id: 7,
    title: "Trends Shaping Life Insurance Distribution in 2026",
    category: "Industry Trends",
    date: "January 18, 2026",
    excerpt:
      "From bancassurance to digital-first channels, life insurance distribution is undergoing a fundamental shift.",
  },
  {
    id: 8,
    title: "IEnsure Life: New Underwriting Engine Released",
    category: "Product Update",
    date: "January 5, 2026",
    excerpt:
      "Our revamped underwriting engine cuts policy issuance time and integrates real-time risk scoring.",
  },
  {
    id: 9,
    title: "The Role of Blockchain in Claims Fraud Detection",
    category: "Technology",
    date: "December 20, 2025",
    excerpt:
      "Immutable ledgers and smart contracts are emerging as powerful tools against fraudulent claims.",
  },
  {
    id: 10,
    title: "How a Regional Bank Digitised Its Insurance Arm in 90 Days",
    category: "Case Studies",
    date: "December 8, 2025",
    excerpt:
      "A step-by-step account of a full digital transformation delivered in an aggressive timeline.",
  },
  {
    id: 11,
    title: "IRDAI Sandbox Regulations: What Startups Need to Know",
    category: "Regulatory",
    date: "November 25, 2025",
    excerpt:
      "Breaking down the sandbox framework and how InsurTechs can leverage it to pilot innovative products.",
  },
  {
    id: 12,
    title: "Parametric Weather Insurance: A Primer",
    category: "Industry Trends",
    date: "November 10, 2025",
    excerpt:
      "How parametric triggers remove subjectivity from weather-related claims and speed up payouts.",
  },
  {
    id: 13,
    title: "Integrating IEnsure with Your Core Banking System",
    category: "Product Update",
    date: "October 28, 2025",
    excerpt:
      "A practical guide to connecting IEnsure's APIs with common CBS platforms for a unified customer view.",
  },
  {
    id: 14,
    title: "Telematics and Usage-Based Motor Insurance",
    category: "Technology",
    date: "October 15, 2025",
    excerpt:
      "How vehicle telematics data is enabling personalised premiums and safer driving incentives.",
  },
  {
    id: 15,
    title: "Rural Health Insurance: Lessons from the Field",
    category: "Case Studies",
    date: "October 2, 2025",
    excerpt:
      "On-ground insights from deploying community health insurance schemes across rural districts.",
  },
  {
    id: 16,
    title: "Data Privacy Obligations Under New Insurance Rules",
    category: "Regulatory",
    date: "September 18, 2025",
    excerpt:
      "What the latest data localisation and consent mandates mean for insurers handling sensitive policyholder data.",
  },
  {
    id: 17,
    title: "The Business Case for Embedded Insurance",
    category: "Industry Trends",
    date: "September 5, 2025",
    excerpt:
      "Why embedding insurance at the point of sale is becoming a competitive differentiator for fintechs and e-commerce platforms.",
  },
  {
    id: 18,
    title: "AI Chatbots for First Notice of Loss: A Deep Dive",
    category: "Technology",
    date: "August 22, 2025",
    excerpt:
      "How conversational AI is transforming the first-contact experience for customers filing claims.",
  },
  {
    id: 19,
    title: "IEnsure Analytics Dashboard: What's New",
    category: "Product Update",
    date: "August 8, 2025",
    excerpt:
      "New visualisations, custom report builder, and real-time KPI monitoring are now live in IEnsure Analytics.",
  },
  {
    id: 20,
    title: "Microfinance Institutions as Insurance Distribution Partners",
    category: "Case Studies",
    date: "July 25, 2025",
    excerpt:
      "Partnering with MFIs to reach the last mile — challenges, learnings, and scale outcomes.",
  },
];

const CATEGORIES = [
  "All",
  "Industry Trends",
  "Technology",
  "Product Update",
  "Regulatory",
  "Case Studies",
];

const PAGE_SIZE = 10;

// ─── Hero ─────────────────────────────────────────────────────────────────────
function BlogHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
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
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.03,
        }}
      />

      {/* Large background word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[17vw] font-heading font-black uppercase text-foreground/[0.025] tracking-widest whitespace-nowrap">
          BLOGS
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
              Blog & Articles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-foreground tracking-tight leading-[1.05] mb-6 max-w-4xl"
          >
            Insights into the <br />
            <span className="text-primary italic">Insurance Ecosystem</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DescriptionTypography className="text-lg max-w-2xl mb-8">
              Stay updated with the latest trends, technologies, and strategies shaping the future of the insurance industry.
            </DescriptionTypography>
          </motion.div>

          {/* Stats bar */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-8 pt-8 border-t border-border/50 max-w-xl"
          >
            {[
              { value: "50+", label: "Articles Published" },
              { value: "10K+", label: "Monthly Readers" },
              { value: "Weekly", label: "New Insights" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-heading font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-foreground/45">{stat.label}</span>
              </div>
            ))}
          </motion.div> */}
        </motion.div>
      </div>
    </PageHero>
  );
}

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered =
    activeCategory === "All"
      ? ALL_BLOGS
      : ALL_BLOGS.filter((b) => b.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <PageLayout>
      <BlogHero />
      <PageSection id="blogs-grid" className="pt-0! pb-24 relative overflow-hidden">

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-10 overflow-x-auto"
      >
        <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
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

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {visible.map((blog, idx) => (
            <motion.article
              key={blog.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: (idx % PAGE_SIZE) * 0.05, duration: 0.3 }}
              className="group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="h-52 rounded-2xl bg-foreground/5 border border-foreground/10 mb-5 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                  {blog.category}
                </div>
              </div>

              {/* Meta */}
              <p className="text-foreground/50 text-xs mb-2">{blog.date}</p>
              <h4 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {blog.title}
              </h4>
              <p className="text-foreground/55 text-sm line-clamp-2 mb-4">
                {blog.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-4 h-4" />
              </span>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {visible.length === 0 && (
        <div className="text-center py-20 text-foreground/40">
          No articles found in this category.
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-14"
        >
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-foreground/15 text-foreground/70 hover:border-primary hover:text-primary text-sm font-medium transition-all"
          >
            Load more articles <ChevronDown className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* End of results indicator */}
      {!hasMore && filtered.length > PAGE_SIZE && (
        <p className="text-center text-foreground/35 text-sm mt-14">
          You&apos;ve reached the end &mdash; {filtered.length} articles total.
        </p>
      )}
    </PageSection>
    </PageLayout>
  );
}
