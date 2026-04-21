import BlogForm from "@/components/admin/BlogForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getDb, sql } from "@/lib/db";

type Props = { params: Promise<{ id: string }> };

async function getBlog(id: string) {
  try {
    const db = await getDb();
    const result = await db
      .request()
      .input("id", sql.Int, parseInt(id))
      .query("SELECT * FROM blogs WHERE id = @id");
    return result.recordset[0] ?? null;
  } catch {
    return null;
  }
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) notFound();

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
        <span className="text-sm text-foreground line-clamp-1">{blog.title}</span>
      </div>
      <h1 className="text-2xl font-heading font-bold text-foreground mb-8">Edit Blog Post</h1>
      <BlogForm mode="edit" initialData={blog} />
    </div>
  );
}
