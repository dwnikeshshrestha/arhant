"use client";

import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useColorTheme } from "@/contexts/ColorThemeContext";

export function ThemeCustomizer() {
  const { colorTheme, setColorTheme, themes } = useColorTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  if (!mounted) {
    // Placeholder so layout doesn't shift on hydration
    return (
      <div className="w-9 h-9" aria-hidden />
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-full hover:bg-foreground/10 transition-colors text-foreground"
        aria-label="Customize theme colors"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Palette className="w-5 h-5" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Color theme picker"
          className="absolute right-0 top-full mt-2 w-52 bg-background border border-border rounded-2xl shadow-2xl p-3 z-[200]"
        >
          <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-widest mb-3 px-1">
            Color Theme
          </p>

          <div className="grid grid-cols-3 gap-1">
            {themes.map((theme) => {
              const isActive = colorTheme === theme.key;
              return (
                <button
                  key={theme.key}
                  onClick={() => {
                    setColorTheme(theme.key);
                    setOpen(false);
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-foreground/5 transition-colors group"
                  aria-label={`${theme.label} theme${isActive ? " (active)" : ""}`}
                >
                  {/* Colour swatch */}
                  <div
                    className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: theme.displayColor,
                      outline: isActive
                        ? "2px solid var(--color-primary)"
                        : "2px solid transparent",
                      outlineOffset: "3px",
                      /* Subtle border for the near-white "Light" swatch */
                      boxShadow:
                        theme.key === "light"
                          ? "inset 0 0 0 1px rgba(0,0,0,0.12)"
                          : "none",
                    }}
                  >
                    {isActive && (
                      <Check
                        className="w-3.5 h-3.5"
                        style={{ color: theme.isDark ? "#ffffff" : "#111827" }}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <span className="text-[11px] leading-none text-foreground/55 group-hover:text-foreground transition-colors">
                    {theme.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
