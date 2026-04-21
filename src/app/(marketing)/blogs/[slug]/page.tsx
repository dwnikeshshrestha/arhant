import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { ShareButtons } from "@/components/blog/ShareButtons";
import parse from 'html-react-parser';
type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  image_url: string | null;
  image_alt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
};

type Props = { params: Promise<{ slug: string }> };

async function getBlog(slug: string): Promise<Blog | null> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function getRelatedBlogs(category: string, excludeSlug: string): Promise<Blog[]> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const res = await fetch(
    `${baseUrl}/api/blogs?category=${encodeURIComponent(category)}&limit=4`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.blogs as Blog[]).filter((b) => b.slug !== excludeSlug).slice(0, 3);
}

function estimateReadingTime(content: string | null): number {
  if (!content) return 1;
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return {};
  return {
    title: blog.meta_title ?? blog.title,
    description: blog.meta_description ?? blog.excerpt ?? undefined,
    openGraph: {
      title: blog.meta_title ?? blog.title,
      description: blog.meta_description ?? blog.excerpt ?? undefined,
      images: blog.image_url
        ? [{ url: blog.image_url, alt: blog.image_alt ?? blog.title }]
        : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const [blog, relatedBlogs] = await Promise.all([
    getBlog(slug),
    getBlog(slug).then((b) => (b ? getRelatedBlogs(b.category, slug) : [])),
  ]);

  if (!blog) notFound();

  const readTime = estimateReadingTime(blog.content);
  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const pageUrl =
    typeof window === "undefined"
      ? `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/blogs/${slug}`
      : window.location.href;

  return (
    <PageLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        {blog.image_url ? (
          <>
            {/* Full-bleed image — always visible */}
            <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[620px]">
              <Image
                src={blog.image_url}
                alt={blog.image_alt ?? blog.title}
                fill
                className="object-cover"
                priority
              />

              {/* Layered overlay: subtle dark tint at top fading to heavy at bottom */}
              {/* Using explicit black so it works in both light & dark themes */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />

              {/* Subtle vignette on sides */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            </div>

            {/* Text anchored to bottom of the image */}
            <div className="absolute bottom-0 left-0 right-0 pb-10 pt-20">
              <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium transition-colors mb-6 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  All Articles
                </Link>

                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wide">
                    <Tag className="w-3 h-3" />
                    {blog.category}
                  </span>
                </div>

                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
                >
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-5">
                  <span className="inline-flex items-center gap-1.5 text-white/70 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {formattedDate}
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="inline-flex items-center gap-1.5 text-white/70 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {readTime} min read
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* No-image fallback hero */
          <div className="relative py-20 lg:py-28 bg-gradient-to-br from-primary/8 via-background to-background border-b border-foreground/8">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                opacity: 0.04,
              }}
            />
            <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-foreground/50 hover:text-primary text-xs font-medium transition-colors mb-6 group"
              >
                <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                All Articles
              </Link>
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wide">
                  <Tag className="w-3 h-3" />
                  {blog.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-foreground tracking-tight leading-[1.1] max-w-4xl">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-5">
                <span className="inline-flex items-center gap-1.5 text-foreground/50 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  {formattedDate}
                </span>
                <span className="text-foreground/25">·</span>
                <span className="inline-flex items-center gap-1.5 text-foreground/50 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {readTime} min read
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Article + Sidebar ────────────────────────────────────────── */}
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl py-14">
        <div className="flex flex-col lg:flex-row gap-14">

          {/* ── Main content ───────────────────────────────────────── */}
          <main className="flex-1 min-w-0">
            {/* Excerpt / lead */}
            {blog.excerpt && (
              <p className="text-lg sm:text-xl text-foreground/65 leading-relaxed mb-10 border-l-[3px] border-primary pl-5 font-medium">
                {blog.excerpt}
              </p>
            )}

            {/* Article body */}
            {blog.content ? (
              <div
                className="
                  prose prose-neutral dark:prose-invert prose-lg max-w-none
                  prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:leading-relaxed prose-p:text-foreground/75
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
                  prose-img:rounded-2xl prose-img:border prose-img:border-foreground/10 prose-img:shadow-sm
                  prose-li:text-foreground/75
                  prose-hr:border-foreground/10
                "
              >
                 {parse(blog?.content)}

                </div>
            ) : (
              <p className="text-foreground/40 text-center py-16">No content yet.</p>
            )}

            {/* ── Share ─────────────────────────────────────────────── */}
            <ShareButtons
              title={blog.title}
              url={`${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/blogs/${slug}`}
            />

            {/* ── Bottom nav ────────────────────────────────────────── */}
            <div className="mt-10 pt-8 border-t border-foreground/10 flex items-center justify-between">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/15 text-foreground/60 hover:border-primary hover:text-primary text-sm font-medium transition-all group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to all articles
              </Link>
              <span className="text-foreground/30 text-xs hidden sm:block">
                {blog.category} · {readTime} min read
              </span>
            </div>
          </main>

          {/* ── Sidebar ────────────────────────────────────────────── */}
          {/* <aside className="w-full lg:w-72 xl:w-80 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/35 mb-3">
                  Category
                </p>
                <Link
                  href={`/blogs?category=${encodeURIComponent(blog.category)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold transition-colors"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {blog.category}
                </Link>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 flex items-center gap-4">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/35">
                    Reading time
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    {readTime} min read
                  </p>
                </div>
              </div>

              <Link
                href="/blogs"
                className="flex items-center justify-between w-full px-5 py-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-primary/40 hover:bg-primary/5 text-sm font-semibold text-foreground/60 hover:text-primary transition-all group"
              >
                <span>Browse all articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </aside> */}
        </div>
      </div>

      {/* ── Related Articles — full-width card grid ───────────────────── */}
      {relatedBlogs.length > 0 && (
        <section className="border-t border-foreground/8 bg-foreground/[0.015]">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl py-16">
            {/* Section header */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-2">
                  Keep reading
                </p>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
                  Related Articles
                </h2>
              </div>
              <Link
                href={`/blogs?category=${encodeURIComponent(blog.category)}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-foreground/50 hover:text-primary transition-colors group"
              >
                More in {blog.category}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((related) => {
                const relatedReadTime = estimateReadingTime(related.content);
                const relatedDate = new Date(related.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <Link
                    key={related.id}
                    href={`/blogs/${related.slug}`}
                    className="group flex flex-col rounded-2xl border border-foreground/10 bg-background overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                  >
                    {/* Card image */}
                    <div className="relative w-full h-48 bg-foreground/5 overflow-hidden shrink-0">
                      {related.image_url ? (
                        <Image
                          src={related.image_url}
                          alt={related.image_alt ?? related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
                      )}

                      {/* Category overlay pill */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wide">
                          {related.category}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-5">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-1 text-foreground/40 text-[11px]">
                          <Calendar className="w-3 h-3" />
                          {relatedDate}
                        </span>
                        <span className="text-foreground/20 text-[11px]">·</span>
                        <span className="inline-flex items-center gap-1 text-foreground/40 text-[11px]">
                          <Clock className="w-3 h-3" />
                          {relatedReadTime} min
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-heading font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                        {related.title}
                      </h3>

                      {/* Excerpt */}
                      {related.excerpt && (
                        <p className="text-sm text-foreground/55 leading-relaxed line-clamp-2 flex-1">
                          {related.excerpt}
                        </p>
                      )}

                      {/* Read more cue */}
                      <div className="flex items-center gap-1 mt-4 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                        Read article
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile "more" link */}
            <div className="sm:hidden mt-8 text-center">
              <Link
                href={`/blogs?category=${encodeURIComponent(blog.category)}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                More in {blog.category}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
