import { NextRequest, NextResponse } from "next/server";
import { getDb, sql } from "@/lib/db";
import { auth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/blogs/[id] — admin only, fetch single blog (including drafts)
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const db = await getDb();
    const result = await db
      .request()
      .input("id", sql.Int, parseInt(id))
      .query("SELECT * FROM blogs WHERE id = @id");

    if (!result.recordset[0]) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(result.recordset[0]);
  } catch (err) {
    console.error("GET /api/admin/blogs/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}
