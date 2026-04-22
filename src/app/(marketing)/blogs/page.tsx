"use client";
import { PageLayout, PageHero, PageSection } from "@/components/layout/PageLayout";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Tabs, TabsList } from "@/components/ui/tabs";
import DescriptionTypography from "@/components/DescriptionTypography";
import Link from "next/link";
import Image from "next/image";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image_url: string | null;
  image_alt: string | null;
  created_at: string;
};

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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.03,
        }}
      />
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
        </motion.div>
      </div>
    </PageHero>
  );
}

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchBlogs = useCallback(async (cat: string, pg: number, append = false) => {
    if (!append) setLoading(true);
    else setLoadingMore(true);

    const params = new URLSearchParams({ page: String(pg), limit: String(PAGE_SIZE) });
    if (cat !== "All") params.set("category", cat);

    const res = await fetch(`/api/blogs?${params}`);
    if (res.ok) {
      const data = await res.json();
      setBlogs((prev) => append ? [...prev, ...data.blogs] : data.blogs);
      setTotal(data.total);
    }
    setLoading(false);
    setLoadingMore(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBlogs(activeCategory, 1, false);
  }, [activeCategory, fetchBlogs]);

  function handleCategoryChange(cat: string) {
    setPage(1);
    setActiveCategory(cat);
  }

  function handleLoadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(activeCategory, nextPage, true);
  }

  const hasMore = blogs.length < total;

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
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-52 rounded-2xl bg-foreground/5 mb-5" />
                <div className="h-3 bg-foreground/5 rounded w-1/3 mb-3" />
                <div className="h-5 bg-foreground/5 rounded w-full mb-2" />
                <div className="h-4 bg-foreground/5 rounded w-4/5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {blogs.map((blog, idx) => (
                <motion.article
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: (idx % PAGE_SIZE) * 0.05, duration: 0.3 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/blogs/${blog.slug}`}>
                    {/* Thumbnail */}
                    <div className="h-52 rounded-2xl bg-foreground/5 border border-foreground/10 mb-5 overflow-hidden relative">
                      {blog.image_url ? (
                        <Image
                          src={blog.image_url}
                          alt={blog.image_alt ?? blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute bottom-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium z-10">
                        {blog.category}
                      </div>
                    </div>

                    {/* Meta */}
                    <p className="text-foreground/50 text-xs mb-2">
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "long", day: "numeric", year: "numeric",
                      })}
                    </p>
                    <h4 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {blog.title}
                    </h4>
                    <p className="text-foreground/55 text-sm line-clamp-2 mb-4">
                      {blog.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty state */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-20 text-foreground/40">
            No articles found in this category.
          </div>
        )}

        {/* Load More */}
        {hasMore && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-14"
          >
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-foreground/15 text-foreground/70 hover:border-primary hover:text-primary text-sm font-medium transition-all disabled:opacity-50"
            >
              {loadingMore ? "Loading…" : "Load more articles"} <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* End of results */}
        {!hasMore && !loading && total > PAGE_SIZE && (
          <p className="text-center text-foreground/35 text-sm mt-14">
            You&apos;ve reached the end &mdash; {total} articles total.
          </p>
        )}
      </PageSection>
    </PageLayout>
  );
}
