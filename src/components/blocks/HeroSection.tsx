"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Activity, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="font-sans relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Dynamic Cursor Glow Background */}
      <motion.div
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 1 }}
        className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none hidden md:block"
      />

      <div className="container relative z-10 mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side: Typography */}
        <div className="flex-1 text-left">
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Leading B2B SaaS in Nepal
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[5rem] font-heading font-extrabold text-foreground tracking-tight leading-[1.1] mb-6"
          >
            Leading Insurance <br />
            Software purely <br />
            in <span className="text-primary italic">Nepal.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl font-sans leading-relaxed"
          >
            Empowering life, general, and micro insurance companies with highly
            scalable, customizable, and comprehensive operations management
            platforms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-8 rounded-xl text-white font-medium group relative overflow-hidden transition-all shadow-[0_0_40px_-10px_rgba(255,100,0,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,100,0,0.7)]"
            >
              Request a Demo
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto h-14 px-8 rounded-xl text-foreground hover:bg-foreground/5 hover:text-primary transition-all group"
            >
              Explore Solutions
            </Button>
          </motion.div>
        </div>

        {/* Right Side: Unique Interactive Visual / Dashboard Mockup */}
        <div className="flex-1 w-full lg:w-auto relative hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="relative w-full max-w-[500px] h-[600px] mx-auto [perspective:1000px]"
          >
            {/* Base abstract plane */}
            <div className="absolute inset-0 bg-gradient-to-tr from-card to-background border border-border shadow-2xl shadow-primary/10 rounded-3xl overflow-hidden [transform:rotateX(10deg)_rotateZ(-5deg)] hover:[transform:rotateX(5deg)_rotateZ(-2deg)] transition-transform duration-700">
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

              {/* Fake UI Elements */}
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center bg-background/50 backdrop-blur rounded-2xl p-4 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">
                        Policies Active
                      </div>
                      <div className="text-xs text-foreground/50">
                        IENSURE LIFE
                      </div>
                    </div>
                  </div>
                  <div className="text-primary font-bold text-xl">+24%</div>
                </div>

                <div className="flex justify-between items-center bg-background/50 backdrop-blur rounded-2xl p-4 border border-border/50 translate-x-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">
                        Claims Processed
                      </div>
                      <div className="text-xs text-foreground/50">
                        IENSURE GENERAL
                      </div>
                    </div>
                  </div>
                  <div className="text-blue-500 font-bold text-xl">1.2M</div>
                </div>

                <div className="flex justify-between items-center bg-background/50 backdrop-blur rounded-2xl p-4 border border-border/50 -translate-x-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">
                        Micro Enrollments
                      </div>
                      <div className="text-xs text-foreground/50">
                        IENSURE MICRO
                      </div>
                    </div>
                  </div>
                  <div className="text-purple-500 font-bold text-xl">+890</div>
                </div>
              </div>

              {/* Grid Background within container */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-20 dark:hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
            </div>

            {/* Floating decorative elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-24 h-24 bg-primary/30 blur-xl rounded-full"
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 blur-xl rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
