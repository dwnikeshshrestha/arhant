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

<>
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
              Our Journey
            </h2>
            <HeadingTypography className="mb-6">
              Empowering{" "}
              <span className="text-primary italic">Global Clients</span> with
              Local Expertise.
            </HeadingTypography>
            <div className="space-y-6">
              <DescriptionTypography>
                We are a rapidly expanding IT service company with the goal of
                assisting clients with the deployment and use of their
                enterprises. Our commitment lies in bridging the gap between
                complex technological demands and seamless execution.
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
      </>

  );
}
