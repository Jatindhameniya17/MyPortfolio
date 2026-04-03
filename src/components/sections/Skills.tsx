"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { skillCategories } from "@/data/skills";
import { motion } from "framer-motion";

// All skills flattened for marquee
const allSkills = skillCategories.flatMap((c) => c.skills);

function SkillBadge({ name }: { name: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200 whitespace-nowrap shrink-0">
      {name}
    </div>
  );
}

function Marquee({ children, reverse = false }: { children: React.ReactNode; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <div className={`flex gap-4 pr-4 ${reverse ? "animate-marquee direction-reverse" : "animate-marquee"}`} style={reverse ? { animationDirection: "reverse" } : {}}>
        {children}
        {children}
      </div>
    </div>
  );
}

export function Skills() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ animation: "fadeUp" });

  const firstRow = allSkills.slice(0, Math.ceil(allSkills.length / 2));
  const secondRow = allSkills.slice(Math.ceil(allSkills.length / 2));

  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-clash)] mb-4 text-center"
        >
          Tech <span className="gradient-text-purple">Stack</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-14 max-w-lg mx-auto">
          Technologies and tools I work with to bring ideas to life
        </p>

        <div className="space-y-4">
          <Marquee>
            {firstRow.map((skill) => (
              <SkillBadge key={skill.name} name={skill.name} />
            ))}
          </Marquee>
          <Marquee reverse>
            {secondRow.map((skill) => (
              <SkillBadge key={skill.name} name={skill.name} />
            ))}
          </Marquee>
        </div>

        {/* Category cards below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14"
        >
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="spotlight-card p-5"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
              }}
            >
              <div className="relative z-10">
                <h3 className="text-sm font-semibold text-[var(--accent)] mb-3 uppercase tracking-wider">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="text-xs px-2.5 py-1 rounded-md bg-[var(--bg)] text-[var(--text-secondary)]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
