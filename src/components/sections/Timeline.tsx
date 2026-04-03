"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { timelineEntries } from "@/data/timeline";
import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export function Timeline() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ animation: "fadeUp" });

  return (
    <section id="journey" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-clash)] mb-4 text-center"
        >
          My <span className="gradient-text-purple">Journey</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-14 max-w-md mx-auto">
          Experience and education that shaped my path
        </p>

        <div className="relative">
          {/* Line */}
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent" />

          <div className="space-y-10">
            {timelineEntries.map((entry, i) => {
              const Icon = entry.type === "experience" ? Briefcase : GraduationCap;
              const isExperience = entry.type === "experience";

              return (
                <motion.div
                  key={`${entry.organization}-${entry.period}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative flex gap-6 pl-2"
                >
                  {/* Node */}
                  <div className={`relative z-10 w-[46px] h-[46px] shrink-0 rounded-full flex items-center justify-center border-2 ${
                    isExperience
                      ? "border-[var(--accent)] bg-[var(--accent)]/10"
                      : "border-[var(--border)] bg-[var(--bg-surface)]"
                  }`}>
                    <Icon className={`w-4 h-4 ${isExperience ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <span className={`text-xs font-medium uppercase tracking-wider ${
                      isExperience ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
                    }`}>
                      {entry.period}
                    </span>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-1">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {entry.organization}
                      {entry.grade && <span className="text-[var(--accent-warm)]"> — {entry.grade}</span>}
                    </p>

                    {entry.bullets && (
                      <ul className="mt-3 space-y-1.5">
                        {entry.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-[var(--accent)] mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[var(--accent)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-0.5 rounded-md bg-[var(--accent)]/10 text-[var(--accent)]"
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
      </div>
    </section>
  );
}
