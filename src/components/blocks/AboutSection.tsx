"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";
import Image from "next/image";
import MissionSection from "./MissionSection";
import HeadingTypography from "../HeadingTypography";
import ContainerLayout from "../layout/ContainerLayout";
import DescriptionTypography from "../DescriptionTypography";

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
    <ContainerLayout
      id="about-us"
      className="bg-background relative overflow-hidden"
    >
      {/* Subtle background glow */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[120px] rounded-full pointer-events-none" /> */}

      <div className="relative z-10  space-y-25">
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
            {/* <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              Introducing Nepal&apos;s IT Mastery to the World.
            </h3> */}
            {/* <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-[1.1] font-heading">
               Introducing Nepal&apos;s  <br />
              <span className="text-primary italic">IT Mastery to the World.</span>
            </h2> */}
            <HeadingTypography className="mb-6">
              Introducing{" "}
              <span className="text-primary italic">Nepal&apos;s</span> IT
              Mastery to the World.
            </HeadingTypography>
            <div className="space-y-6">
              <DescriptionTypography>
                Arhant Solutions was established with the objective of
                introducing Nepal’s highly matured IT execution capability to
                the world. We are a rapidly expanding IT service company with
                the goal of assisting clients with the deployment and use of
                their enterprises.
              </DescriptionTypography>
              <DescriptionTypography>
                We are devoted to offering services, mostly in the area of
                insurance, that assist our clients in thriving in a world that
                is always changing since we have a great belief in advancement,
                growth, and opportunity.
              </DescriptionTypography>
            </div>
          </motion.div>

          {/* Right Column: Mission & Vision */}
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="pt-40 relative">
                <Image
                  src="/assets/about-us/about.jpg"
                  className="rounded-md h-auto max-w-full object-cover"
                  alt="Image 1"
                  // fill
                  height={250}
                  width={250}
                />
              </div>
              <div className="space-y-6 pt-20">
                <Image
                  src="/assets/about-us/about.jpg"
                  className="rounded-md h-auto max-w-full object-cover"
                  alt="Image 1"
                  // fill
                  height={250}
                  width={250}
                />
                <Image
                  src="/assets/about-us/about1.jpg"
                  className="rounded-md h-auto max-w-full object-cover"
                  alt="Image 1"
                  // fill
                  height={250}
                  width={250}
                />
              </div>
              <div className="space-y-6">
                <Image
                  src="/assets/about-us/about.jpg"
                  className="rounded-md h-auto max-w-full object-cover"
                  alt="Image 1"
                  // fill
                  height={250}
                  width={250}
                />
                <Image
                  src="/assets/about-us/about1.jpg"
                  className="rounded-md h-auto max-w-full object-cover"
                  alt="Image 1"
                  // fill
                  height={250}
                  width={250}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <MissionSection />
        </motion.div>
      </div>
    </ContainerLayout>
  );
}
