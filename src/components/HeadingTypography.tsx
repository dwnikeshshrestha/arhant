"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
interface ContainerLayoutProps {
  children: ReactNode;
  className?: string;
}
function HeadingTypography({ children, className }: ContainerLayoutProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className={cn(
        "text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-[1.1] font-heading",
        className,
      )}
    >
      {children}
    </motion.h1>
  );
}

export default HeadingTypography;
