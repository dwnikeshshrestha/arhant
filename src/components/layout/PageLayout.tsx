import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface PageHeroProps {
  children: React.ReactNode;
  className?: string;
}

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageLayout — outer shell for every single page.
 * Sets background, min-height and clips horizontal overflow.
 */
export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div
      className={cn(
        "bg-background min-h-screen overflow-x-hidden font-sans",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * PageHero — full-width hero band inside a PageLayout.
 * Provides consistent vertical rhythm: pt-10 pb-20.
 * Forwards refs so scroll-based animations can attach.
 */
export const PageHero = forwardRef<HTMLDivElement, PageHeroProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full min-h-[52vh] flex items-center overflow-hidden pt-10 pb-20",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
PageHero.displayName = "PageHero";

/**
 * PageSection — a content section inside a PageLayout.
 * Mirrors ContainerLayout spacing: py-16 md:py-20 lg:py-24.
 * Has an inner container for consistent horizontal gutter.
 */
export function PageSection({ children, className, id }: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full py-16 md:py-20 lg:py-24 scroll-mt-24",
        className,
      )}
    >
      <div className="container mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}
