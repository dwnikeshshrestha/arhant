"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const navItems = [
  {
    title: "About Us",
    link: "/about",
  },
  {
    title: "Solutions",
    link: "/solutions",
  },
  {
    title: "Our Work",
    link: "/our/work",
  },

  //   {
  //           title:  "Products",
  //           link:"/products",
  // },
  //    {
  //           title:  "Partners",
  //           link:"/about",
  // },
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "Contact",
    link: "/contact-us",
  },
];
export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm dark:shadow-none"
          : "bg-transparent md:py-4"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <Image
            src="/arhant-logo-black-new.png"
            alt="Arhant Solutions Logo"
            width={160}
            height={50}
            className="h-12 w-auto object-contain transition-transform group-hover:scale-105 block dark:hidden"
            priority
          />

          {/* Dark mode logo */}
          <Image
            src="/arhant-logo-white.png"
            alt="Arhant Solutions Logo"
            width={160}
            height={50}
            className="h-12 w-auto object-contain transition-transform group-hover:scale-105 hidden dark:block"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8 ">
            {navItems.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-foreground/10 transition-colors text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
