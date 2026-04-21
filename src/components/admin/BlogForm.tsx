"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";
import RichTextEditor from "./RichTextEditor";

const CATEGORIES = [
  "Industry Trends",
  "Technology",
  "Product Update",
  "Regulatory",
  "Case Studies",
];

type BlogFormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  image_alt: string;
  meta_title: string;
  meta_description: string;
  is_published: boolean;
};

type Props = {
  initialData?: Partial<BlogFormData> & { id?: number };
  mode: "new" | "edit";
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function BlogForm({ initialData, mode }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const [form, setForm] = useState<BlogFormData>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    category: initialData?.category ?? CATEGORIES[0],
    image_url: initialData?.image_url ?? "",
    image_alt: initialData?.image_alt ?? "",
    meta_title: initialData?.meta_title ?? "",
    meta_description: initialData?.meta_description ?? "",
    is_published: initialData?.is_published ?? false,
  });

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      ...(mode === "new" && { slug: slugify(value) }),
    }));
  }

  function set(field: keyof BlogFormData) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  async function uploadFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed");
      return;
    }
    setUploading(true);
    setUploadError(null);

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();

    if (!res.ok) {
      setUploadError(data.error ?? "Upload failed");
    } else {
      setForm((prev) => ({ ...prev, image_url: data.url }));
    }
    setUploading(false);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }

  function removeImage() {
    setForm((prev) => ({ ...prev, image_url: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const url = mode === "new" ? "/api/blogs" : `/api/blogs/${initialData?.id}`;
    const method = mode === "new" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      setSaving(false);
      return;
    }

    router.push("/admin/blogs");
    router.refresh();
  }

  const inputClass =
    "w-full px-3 py-2 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:bg-foreground/[0.07] transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Core fields */}
      <div className="grid gap-6">
        <div>
          <label className="block text-xs font-medium text-foreground/60 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Blog post title"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground/60 mb-1.5">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={set("slug")}
            placeholder="url-friendly-slug"
            required
            className={inputClass}
          />
          <p className="text-xs text-foreground/40 mt-1">
            URL: /blogs/<span className="text-foreground/60">{form.slug || "your-slug"}</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select value={form.category} onChange={set("category")} className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">
              Status
            </label>
            <label className="flex items-center gap-3 cursor-pointer h-[38px]">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={set("is_published")}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-foreground/70">
                {form.is_published ? "Published" : "Draft (not visible on site)"}
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground/60 mb-1.5">
            Excerpt
          </label>
          <textarea
            value={form.excerpt}
            onChange={set("excerpt")}
            rows={2}
            placeholder="Short description shown on the blog listing page"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground/60 mb-1.5">
            Content
          </label>
          <RichTextEditor
            value={form.content}
            onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="p-5 rounded-2xl border border-foreground/10 bg-foreground/[0.02] space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Cover Image</h3>

        {/* Upload area */}
        {!form.image_url ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-3 h-48 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-foreground/15 hover:border-primary/50 hover:bg-foreground/5"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileInput}
              className="hidden"
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-sm text-foreground/50">Uploading…</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-foreground/30" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground/60">
                    <span className="text-primary font-medium">Click to upload</span> or drag & drop
                  </p>
                  <p className="text-xs text-foreground/35 mt-1">JPEG, PNG, WebP, GIF — max 5MB</p>
                </div>
                <div className="flex items-center gap-2 w-full px-4">
                  <div className="flex-1 h-px bg-foreground/10" />
                  <span className="text-xs text-foreground/30">or paste a URL</span>
                  <div className="flex-1 h-px bg-foreground/10" />
                </div>
                <input
                  type="url"
                  value={urlInput}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value) {
                      setForm((p) => ({ ...p, image_url: e.target.value }));
                    }
                  }}
                  placeholder="https://..."
                  className="w-full mx-4 px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-sm placeholder:text-foreground/30 focus:outline-none focus:border-primary/40 transition-colors"
                />
              </>
            )}
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden border border-foreground/10">
            <div className="relative w-full h-52">
              <Image
                src={form.image_url}
                alt={form.image_alt || "Cover image"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors group flex items-center justify-center">
              <div className="hidden group-hover:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-white text-foreground text-xs font-medium flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" /> Replace
                </button>
                <button
                  type="button"
                  onClick={removeImage}
                  className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileInput}
              className="hidden"
            />
            <p className="text-xs text-foreground/40 px-3 py-2 truncate">{form.image_url}</p>
          </div>
        )}

        {uploadError && (
          <p className="text-xs text-red-500">{uploadError}</p>
        )}

        <div>
          <label className="block text-xs font-medium text-foreground/60 mb-1.5">
            Image Alt Text
          </label>
          <input
            type="text"
            value={form.image_alt}
            onChange={set("image_alt")}
            placeholder="Describe the image for accessibility"
            className={inputClass}
          />
        </div>
      </div>

      {/* SEO */}
      <div className="p-5 rounded-2xl border border-foreground/10 bg-foreground/[0.02] space-y-4">
        <h3 className="text-sm font-semibold text-foreground">SEO</h3>
        <div>
          <label className="block text-xs font-medium text-foreground/60 mb-1.5">
            Meta Title
          </label>
          <input
            type="text"
            value={form.meta_title}
            onChange={set("meta_title")}
            placeholder="Defaults to post title if empty"
            className={inputClass}
          />
          <p className="text-xs text-foreground/40 mt-1">
            {form.meta_title.length}/60 characters
          </p>
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground/60 mb-1.5">
            Meta Description
          </label>
          <textarea
            value={form.meta_description}
            onChange={set("meta_description")}
            rows={2}
            placeholder="Defaults to excerpt if empty"
            className={inputClass}
          />
          <p className="text-xs text-foreground/40 mt-1">
            {form.meta_description.length}/160 characters
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-end pt-4 border-t border-foreground/10">
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="px-4 py-2 rounded-xl text-foreground/60 hover:text-foreground text-sm transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving || uploading}
          className="px-6 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : mode === "new" ? "Publish Blog" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
