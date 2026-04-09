import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
interface ContainerLayoutProps {
  children: ReactNode;
  className?: string;
}
function ContainerLayout({ children, className }: ContainerLayoutProps) {
  return (
    <section
      className={cn("container mx-auto py-20 font-sans  px-6 lg:px-8 ", className)}
    >
      {children}
    </section>
  );
}

export default ContainerLayout;
