"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronLeft,
  User,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Manage Blogs",
    href: "/admin/blogs",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 border-r border-foreground/10 bg-card/30 backdrop-blur-xl flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand */}
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">
              Arhant <span className="text-primary">Admin</span>
            </span>
          </Link>
        )}
        {collapsed && (
           <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg mx-auto">
           A
         </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", !isActive && "group-hover:scale-110 transition-transform")} />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {collapsed && isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-foreground/10 space-y-4">
         <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground/60 hover:bg-foreground/5 hover:text-foreground transition-all"
            >
              <Home className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="font-medium text-sm">Public Site</span>}
          </Link>

        {!collapsed && session?.user && (
          <div className="px-3 py-3 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">
                {session.user.name || "Admin User"}
              </p>
              <p className="text-[10px] text-foreground/50 truncate">
                {session.user.email}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground/60 hover:text-red-500 hover:bg-red-500/5 transition-all",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium text-sm">Sign Out</span>}
        </button>

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>
    </aside>
  );
}
