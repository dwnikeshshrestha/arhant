import { NextRequest, NextResponse } from "next/server";
import { getDb, sql } from "@/lib/db";
import { auth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

// GET /api/blogs/[id] — public, fetch a single blog by id OR slug
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const db = await getDb();
    const isNumeric = /^\d+$/.test(id);

    const request = db.request();
    let query: string;

    if (isNumeric) {
      request.input("id", sql.Int, parseInt(id));
      query = "SELECT * FROM blogs WHERE id = @id AND is_published = 1";
    } else {
      request.input("slug", sql.NVarChar, id);
      query = "SELECT * FROM blogs WHERE slug = @slug AND is_published = 1";
    }

    const result = await request.query(query);
    if (!result.recordset[0]) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(result.recordset[0]);
  } catch (err) {
    console.error("GET /api/blogs/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT /api/blogs/[id] — admin only, update blog
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, category, image_url, image_alt, meta_title, meta_description, is_published } = body;

    if (!title || !slug || !category) {
      return NextResponse.json({ error: "title, slug, and category are required" }, { status: 400 });
    }

    const db = await getDb();
    await db
      .request()
      .input("id", sql.Int, parseInt(id))
      .input("title", sql.NVarChar, title)
      .input("slug", sql.NVarChar, slug)
      .input("excerpt", sql.NVarChar, excerpt ?? null)
      .input("content", sql.NVarChar, content ?? null)
      .input("category", sql.NVarChar, category)
      .input("image_url", sql.NVarChar, image_url ?? null)
      .input("image_alt", sql.NVarChar, image_alt ?? null)
      .input("meta_title", sql.NVarChar, meta_title ?? null)
      .input("meta_description", sql.NVarChar, meta_description ?? null)
      .input("is_published", sql.Bit, is_published ? 1 : 0)
      .query(`
        UPDATE blogs SET
          title = @title,
          slug = @slug,
          excerpt = @excerpt,
          content = @content,
          category = @category,
          image_url = @image_url,
          image_alt = @image_alt,
          meta_title = @meta_title,
          meta_description = @meta_description,
          is_published = @is_published,
          updated_at = GETDATE()
        WHERE id = @id
      `);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("PUT /api/blogs/[id] error:", err);
    if (err instanceof Error && err.message.includes("UNIQUE")) {
      return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] — admin only
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const db = await getDb();
    await db
      .request()
      .input("id", sql.Int, parseInt(id))
      .query("DELETE FROM blogs WHERE id = @id");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/blogs/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
