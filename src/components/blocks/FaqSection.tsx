"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const DUMMY_FAQS = [
  {
    question: "Do you offer custom integration for legacy systems?",
    answer: "Yes, our IEnsure suites are built with advanced API architectures allowing seamless integration with your existing legacy systems and databases."
  },
  {
    question: "Is IEnsure Life scalable for millions of policies?",
    answer: "Absolutely. IEnsure Life is engineered for the enterprise. Its robust microservices architecture guarantees optimal performance regardless of the volume of data."
  },
  {
    question: "What is the typical deployment timeframe?",
    answer: "Depending on your specific customization needs, our standard deployment ranges from 6 to 12 weeks, including intensive QA and team training."
  },
  {
    question: "Do you provide post-deployment technical support?",
    answer: "Yes, Arhant Solutions offers 24/7 dedicated support and regular software updates to ensure your operations are never interrupted."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-muted relative border-t border-foreground/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">FAQ</h2>
          <h3 className="text-4xl font-heading font-bold text-foreground">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {DUMMY_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-foreground/5 border border-foreground/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-foreground/[0.08] transition-colors"
                >
                  <span className="font-heading font-bold text-foreground text-lg pr-8">{faq.question}</span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-foreground/50 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-foreground/70 font-sans leading-relaxed pt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

