"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import ContainerLayout from "../layout/ContainerLayout";
import DescriptionTypography from "../DescriptionTypography";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "proj-1",
    title: "Core Insurance Platform",
    category: "Enterprise System",
    description:
      "A comprehensive enterprise solution powering underwriting, claims processing, and policy lifecycle management for leading insurers across Nepal.",
    imageUrl:
      "/assets/our-works/ebeema-new.png?q=80&w=2426&auto=format&fit=crop",
    websiteUrl: "#",
    tags: ["Underwriting", "Claims", "Policy Management"],
  },
  {
    id: "proj-2",
    title: "Digital Claims Portal",
    category: "Web Application",
    description:
      "A streamlined self-service portal enabling customers to file, track, and manage claims digitally — reducing turnaround time by 60%.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    websiteUrl: "#",
    tags: ["Portal", "Self-Service", "UX"],
  },
  {
    id: "proj-3",
    title: "Agent Performance Dashboard",
    category: "Data & Analytics",
    description:
      "Real-time analytics and KPI tracking interface empowering insurance agents and managers to optimize performance and revenue.",
    imageUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop",
    websiteUrl: "#",
    tags: ["Analytics", "Dashboards", "Real-Time"],
  },
  {
    id: "proj-4",
    title: "Reinsurance Management System",
    category: "Enterprise System",
    description:
      "End-to-end reinsurance treaty and facultative management platform with automated bordereaux generation and settlement tracking.",
    imageUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
    websiteUrl: "#",
    tags: ["Reinsurance", "Automation", "Compliance"],
  },
];

function ProjectCard({
  project,
  featured = false,
  index,
}: {
  project: Project;
  featured?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image Layer */}
      <div
        className={`relative w-full overflow-hidden ${
          featured ? "h-[500px]" : "h-[280px]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Gradient Overlay — always visible, darkens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-5 left-5 z-20">
          {/* <span className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20"> */}

          <div className="bg-gradient-to-r from-black/60 to-transparent rounded-full p-[1px]">
            <span
              className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full 
    bg-black/40 backdrop-blur-md text-white"
            >
              {project.category}
            </span>
          </div>
          {/* <span className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full 
bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md">
            {project.category}
          </span> */}
        </div>

        {/* Arrow Icon — top right */}
        <div className="absolute top-5 right-5 z-20">
          <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight className="w-5 h-5" />
          </span>
        </div>

        {/* Content Overlay — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h3
            className={`font-heading font-bold text-white mb-2 ${
              featured ? "text-2xl md:text-3xl" : "text-lg"
            }`}
          >
            {project.title}
          </h3>

          <DescriptionTypography
            className={`mb-4 max-h-0 group-hover:max-h-[120px] opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out text-white/70 ${
              featured ? "text-sm md:text-base" : "text-sm"
            }`}
          >
            {project.description}
          </DescriptionTypography>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 max-h-0 group-hover:max-h-[60px] opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 delay-75 ease-out">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-md bg-white/10 text-white/80 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white max-h-0 group-hover:max-h-[40px] opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 delay-100 ease-out hover:text-primary"
          >
            View Project
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function OurWorkSection() {
  return (
    <ContainerLayout
      id="our-work"
      className="relative overflow-hidden bg-background"
    >
      {/* Large Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[12vw] font-heading font-black uppercase text-foreground/[0.03] tracking-widest whitespace-nowrap">
          Portfolio
        </span>
      </div>

      {/* Subtle Ambient Glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 relative z-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-primary rounded-full" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                  Our Work
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                Projects that <span className="text-primary">define</span>
                <br className="hidden md:block" /> the future of insurance
              </h2>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-md"
          >
            <DescriptionTypography>
              Explore how we have transformed insurance organizations with
              cutting-edge software ecosystems and digital platforms.
            </DescriptionTypography>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-auto">
          {/* Featured Project — Large */}
          <ProjectCard project={projects[0]} featured index={0} />

          {/* Right Column — Stacked */}
          <ProjectCard project={projects[1]} index={1} />
          <ProjectCard project={projects[2]} index={2} />

          {/* Bottom Full Width */}
          <div className="md:col-span-3">
            <ProjectCard project={projects[3]} index={3} />
          </div>
        </div>
    </ContainerLayout>
  );
}
