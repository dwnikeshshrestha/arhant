import BlogForm from "@/components/admin/BlogForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewBlogPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-1 text-foreground/50 hover:text-foreground text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Blogs
        </Link>
        <span className="text-foreground/20">/</span>
        <span className="text-sm text-foreground">New Post</span>
      </div>
      <h1 className="text-2xl font-heading font-bold text-foreground mb-8">New Blog Post</h1>
      <BlogForm mode="new" />
    </div>
  );
}
