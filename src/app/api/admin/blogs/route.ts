import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";

// GET /api/admin/blogs — admin only, returns ALL blogs including drafts
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDb();
    const result = await db.request().query(`
      SELECT id, title, slug, category, is_published, created_at, updated_at
      FROM blogs
      ORDER BY created_at DESC
    `);

    return NextResponse.json({ blogs: result.recordset });
  } catch (err) {
    console.error("GET /api/admin/blogs error:", err);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
