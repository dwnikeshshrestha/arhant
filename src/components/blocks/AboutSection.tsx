"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp } from "lucide-react";

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about-us" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column: About content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary"></span>
              About Us
            </h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              Introducing Nepal&apos;s IT Mastery to the World.
            </h3>
            <div className="space-y-6 text-foreground/70 font-sans leading-relaxed text-lg">
              <p>
                Arhant Solutions was established with the objective of introducing Nepal’s highly matured IT execution capability to the world. We are a rapidly expanding IT service company with the goal of assisting clients with the deployment and use of their enterprises.
              </p>
              <p>
                We are devoted to offering services, mostly in the area of insurance, that assist our clients in thriving in a world that is always changing since we have a great belief in advancement, growth, and opportunity.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Mission & Vision */}
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-foreground/5 border border-foreground/10 p-8 rounded-2xl hover:bg-foreground/10 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30">
                <Target className="text-primary w-6 h-6" />
              </div>
              <h4 className="text-2xl font-heading font-bold text-foreground mb-4">Our Mission</h4>
              <p className="text-foreground/70 font-sans">
                To consistently develop IT solutions that provide our clients with a competitive advantage, facilitating their achievement of success milestones.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-foreground/5 border border-foreground/10 p-8 rounded-2xl hover:bg-foreground/10 transition-colors duration-300 transform md:translate-x-8"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30">
                <Lightbulb className="text-primary w-6 h-6" />
              </div>
              <h4 className="text-2xl font-heading font-bold text-foreground mb-4">Our Vision</h4>
              <p className="text-foreground/70 font-sans">
                To leverage technology and industry norms to bridge the divide between business and technology in the insurance industry.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

