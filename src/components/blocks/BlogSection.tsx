"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ContainerLayout from "../layout/ContainerLayout";

export function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "The Future of Micro Insurance in Developing Nations",
      category: "Industry Trends",
      date: "April 15, 2026",
    },
    {
      id: 2,
      title: "How Automation is Reducing Claims Processing Time by 40%",
      category: "Technology",
      date: "March 28, 2026",
    },
    {
      id: 3,
      title: "IEnsure General: A Comprehensive Look at Capabilities",
      category: "Product Update",
      date: "March 10, 2026",
    },
  ];

  return (
    <section id="blog" className="py-24 bg-background relative">
      <ContainerLayout>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-widest text-primary uppercase mb-3"
            >
              Blog & Articles
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-heading font-bold text-foreground max-w-xl"
            >
              Insights into the Insurance Ecosystem
            </motion.h3>
          </div>
          <button className="text-foreground hover:text-primary font-medium flex items-center gap-2 transition-colors group">
            View All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="h-48 rounded-2xl bg-foreground/5 border border-foreground/10 mb-6 overflow-hidden relative">
                {/* Dummy Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                  {blog.category}
                </div>
              </div>
              <p className="text-foreground/50 text-sm mb-3">{blog.date}</p>
              <h4 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-4 line-clamp-2">
                {blog.title}
              </h4>
            </motion.article>
          ))}
        </div>
      </ContainerLayout>
    </section>
  );
}

