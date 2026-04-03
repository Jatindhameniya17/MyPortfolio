"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { timelineEntries } from "@/data/timeline";
import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export function Timeline() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ animation: "fadeUp" });

  return (
    <section id="journey" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-clash)] mb-12 text-center"
        >
          My <span className="text-[var(--accent)]">Journey</span>
        </h2>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)] md:-translate-x-px" />

          {timelineEntries.map((entry, i) => {
            const isLeft = i % 2 === 0;
            const Icon = entry.type === "experience" ? Briefcase : GraduationCap;

            return (
              <motion.div
                key={`${entry.organization}-${entry.period}`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-start mb-12 md:mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                <motion.div
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent)] flex items-center justify-center z-10"
                >
                  <Icon className="w-5 h-5 text-[var(--accent)]" />
                </motion.div>

                <div
                  className={`ml-20 md:ml-0 ${
                    isLeft ? "md:pr-20 md:text-right md:w-1/2" : "md:pl-20 md:w-1/2 md:ml-auto"
                  }`}
                >
                  <span className="text-sm text-[var(--accent)] font-semibold">
                    {entry.period}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1">
                    {entry.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm">
                    {entry.organization}
                    {entry.grade && ` — ${entry.grade}`}
                  </p>

                  {entry.bullets && (
                    <ul className="mt-3 space-y-1 text-sm text-[var(--text-secondary)]">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="text-[var(--accent)] mt-1 shrink-0">&bull;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
