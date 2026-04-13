import { cn } from "@/lib/utils";
import React, { ReactNode, forwardRef } from "react";

interface ContainerLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  backgroundElements?: ReactNode;
}

const ContainerLayout = forwardRef<HTMLElement, ContainerLayoutProps>(
  ({ children, className, innerClassName, backgroundElements, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("w-full py-24 scroll-mt-24 font-sans", className)} {...props}>
        {backgroundElements}
        <div className={cn("container mx-auto px-6 lg:px-8", innerClassName)}>
          {children}
        </div>
      </section>
    );
  }
);
ContainerLayout.displayName = "ContainerLayout";

export default ContainerLayout;
