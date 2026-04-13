import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DescriptionTypographyProps {
  children: ReactNode;
  className?: string;
}

function DescriptionTypography({ children, className }: DescriptionTypographyProps) {
  return (
    <p
      className={cn(
        "text-foreground/60 font-sans leading-relaxed text-lg",
        className
      )}
    >
      {children}
    </p>
  );
}

export default DescriptionTypography;
