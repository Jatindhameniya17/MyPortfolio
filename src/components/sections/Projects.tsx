"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { projects } from "@/data/projects";
import { TiltCard } from "@/components/ui/TiltCard";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { motion } from "framer-motion";

export function Projects() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ animation: "fadeUp" });

  return (
    <section id="projects" className="py-24 px-6 bg-[var(--bg-surface)]/50">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-clash)] mb-12 text-center"
        >
          My <span className="text-[var(--accent)]">Projects</span>
        </h2>

        <div className="space-y-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <TiltCard>
                <div
                  className={`grid md:grid-cols-2 gap-8 items-center rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 md:p-8 ${
                    i % 2 === 1 ? "md:direction-rtl" : ""
                  }`}
                >
                  <div
                    className={`rounded-xl overflow-hidden bg-[var(--bg)] aspect-video flex items-center justify-center ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <div className="text-6xl text-[var(--accent)]/20 font-bold font-[family-name:var(--font-clash)]">
                      {project.title.split(" ").map((w) => w[0]).join("")}
                    </div>
                  </div>

                  <div className={i % 2 === 1 ? "md:order-1 md:text-left" : ""}>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-4">
                      {project.description}
                    </p>

                    <ul className="space-y-2 mb-4 text-sm text-[var(--text-secondary)]">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="text-[var(--accent)] mt-0.5 shrink-0">&rarr;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        >
                          <GithubIcon className="w-5 h-5" />
                          Source Code
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl border border-dashed border-[var(--accent)]/40 bg-[var(--bg-surface)] p-12 text-center"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg text-[var(--accent)] font-semibold"
            >
              More projects in the pipeline...
            </motion.div>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Stay tuned for upcoming projects
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
