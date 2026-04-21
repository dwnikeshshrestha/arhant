"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, FileText, Settings, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  console.log("data",session);

  return (
    <div className="min-h-[70vh] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-foreground/50 text-sm mt-1">
              Welcome, {session?.user?.name || session?.user?.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-foreground/15 text-foreground/60 hover:text-red-500 hover:border-red-500/30 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/blogs"
            className="group p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:border-primary/30 transition-all"
          >
            <FileText className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors">
              Manage Blogs
            </h3>
            <p className="text-foreground/50 text-sm mt-1">
              Create, edit, and publish blog articles.
            </p>
          </Link>

          <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10 opacity-50">
            <LayoutDashboard className="w-8 h-8 text-foreground/30 mb-4" />
            <h3 className="text-lg font-heading font-bold text-foreground/50">
              Analytics
            </h3>
            <p className="text-foreground/30 text-sm mt-1">Coming soon</p>
          </div>

          <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10 opacity-50">
            <Settings className="w-8 h-8 text-foreground/30 mb-4" />
            <h3 className="text-lg font-heading font-bold text-foreground/50">
              Settings
            </h3>
            <p className="text-foreground/30 text-sm mt-1">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
