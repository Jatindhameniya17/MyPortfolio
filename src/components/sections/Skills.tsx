"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { skillCategories } from "@/data/skills";
import {
  Code2, Database, Cloud, Terminal, GitBranch,
  Braces, FileCode, Cpu, Server, Container, MonitorSmartphone,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.ComponentType<any>> = {
  cplusplus: Code2,
  python: FileCode,
  javascript: Braces,
  database: Database,
  html5: MonitorSmartphone,
  css3: MonitorSmartphone,
  react: Cpu,
  nodejs: Server,
  mongodb: Database,
  aws: Cloud,
  docker: Container,
  "git-branch": GitBranch,
  git: GitBranch,
  github: GithubIcon,
  code: Code2,
  terminal: Terminal,
  "code-2": Code2,
};

export function Skills() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ animation: "slideLeft" });

  return (
    <section id="skills" className="py-24 px-6 bg-[var(--bg-surface)]/50">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-clash)] mb-12"
        >
          Tech <span className="text-[var(--accent)]">Stack</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIdx) => (
            <BentoCard key={category.title} delay={catIdx * 0.1}>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-4">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.icon] || Code2;
                  return (
                    <div key={skill.name} className="flex items-center gap-3 group">
                      <Icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                      <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
