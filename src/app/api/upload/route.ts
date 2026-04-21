import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 5;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json(
      { error: `File must be under ${MAX_SIZE_MB}MB` },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const uniqueName = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, uniqueName), buffer);

  return NextResponse.json({ url: `/uploads/blogs/${uniqueName}` }, { status: 201 });
}
