import { NextRequest, NextResponse } from "next/server";
import { getDb, sql } from "@/lib/db";
import { auth } from "@/lib/auth";

// GET /api/blogs — public, returns published blogs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10")));
    const offset = (page - 1) * limit;

    const db = await getDb();
    const request = db.request();
    request.input("limit", sql.Int, limit);
    request.input("offset", sql.Int, offset);

    let whereClause = "WHERE is_published = 1";
    if (category && category !== "All") {
      request.input("category", sql.NVarChar, category);
      whereClause += " AND category = @category";
    }

    const countRequest = db.request();
    if (category && category !== "All") {
      countRequest.input("category", sql.NVarChar, category);
    }

    const [dataResult, countResult] = await Promise.all([
      request.query(`
        SELECT id, title, slug, excerpt, category, image_url, image_alt, meta_title, meta_description, created_at
        FROM blogs
        ${whereClause}
        ORDER BY created_at DESC
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
      `),
      countRequest.query(`SELECT COUNT(*) AS total FROM blogs ${whereClause}`),
    ]);

    return NextResponse.json({
      blogs: dataResult.recordset,
      total: countResult.recordset[0].total,
      page,
      limit,
    });
  } catch (err) {
    console.error("GET /api/blogs error:", err);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST /api/blogs — admin only, create a new blog
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, excerpt, content, category, image_url, image_alt, meta_title, meta_description, is_published } = body;

    if (!title || !slug || !category) {
      return NextResponse.json({ error: "title, slug, and category are required" }, { status: 400 });
    }

    const db = await getDb();
    const result = await db
      .request()
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
        INSERT INTO blogs (title, slug, excerpt, content, category, image_url, image_alt, meta_title, meta_description, is_published)
        OUTPUT INSERTED.id
        VALUES (@title, @slug, @excerpt, @content, @category, @image_url, @image_alt, @meta_title, @meta_description, @is_published)
      `);

    return NextResponse.json({ id: result.recordset[0].id }, { status: 201 });
  } catch (err: unknown) {
    console.error("POST /api/blogs error:", err);
    if (err instanceof Error && err.message.includes("UNIQUE")) {
      return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
