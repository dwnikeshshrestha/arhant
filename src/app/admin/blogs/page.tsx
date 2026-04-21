"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

type Blog = {
  id: number;
  title: string;
  slug: string;
  category: string;
  is_published: boolean;
  created_at: string;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function fetchBlogs() {
    setLoading(true);
    // Fetch all blogs (published + drafts) for admin — reuse the same endpoint with admin flag
    const res = await fetch("/api/admin/blogs");
    if (res.ok) {
      const data = await res.json();
      setBlogs(data.blogs);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    setDeletingId(id);
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    await fetchBlogs();
    setDeletingId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Blog Posts</h1>
          <p className="text-foreground/50 text-sm mt-1">{blogs.length} total posts</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Blog
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-foreground/5 animate-pulse" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 text-foreground/40">
          No blog posts yet.{" "}
          <Link href="/admin/blogs/new" className="text-primary hover:underline">
            Create the first one.
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-foreground/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-foreground/10 bg-foreground/5">
                <th className="text-left px-4 py-3 text-foreground/50 font-medium">Title</th>
                <th className="text-left px-4 py-3 text-foreground/50 font-medium">Category</th>
                <th className="text-left px-4 py-3 text-foreground/50 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-foreground/50 font-medium">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-medium text-foreground line-clamp-1">{blog.title}</span>
                    <span className="block text-xs text-foreground/40 mt-0.5">/blogs/{blog.slug}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {blog.is_published ? (
                      <span className="inline-flex items-center gap-1 text-green-500 text-xs font-medium">
                        <Eye className="w-3 h-3" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-foreground/40 text-xs font-medium">
                        <EyeOff className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-foreground/50 text-xs">
                    {new Date(blog.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/blogs/${blog.id}`}
                        className="p-1.5 rounded-lg text-foreground/50 hover:text-primary hover:bg-primary/5 transition-all"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deletingId === blog.id}
                        className="p-1.5 rounded-lg text-foreground/50 hover:text-red-500 hover:bg-red-500/5 transition-all disabled:opacity-40"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
