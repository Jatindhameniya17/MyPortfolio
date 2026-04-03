"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { projects } from "@/data/projects";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { motion } from "framer-motion";

export function Projects() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ animation: "fadeUp" });

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-clash)] mb-4 text-center"
        >
          Featured <span className="gradient-text-purple">Projects</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-14 max-w-md mx-auto">
          Things I&apos;ve built that I&apos;m proud of
        </p>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="spotlight-card group"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
              }}
            >
              <div className="relative z-10 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Project number */}
                  <div className="text-6xl font-bold text-[var(--border)] font-[family-name:var(--font-clash)] shrink-0 leading-none">
                    0{i + 1}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 shrink-0">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                            aria-label="Source code"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                            aria-label="Live demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-[var(--text-secondary)] text-sm mb-4">
                      {project.description}
                    </p>

                    <ul className="space-y-1.5 mb-5">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-sm text-[var(--text-secondary)]">
                          <span className="text-[var(--accent)] mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[var(--accent)]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Coming soon */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="shine-border"
          >
            <div className="rounded-2xl bg-[var(--bg-surface)] p-10 text-center">
              <p className="text-[var(--text-secondary)]">
                More projects coming soon...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
