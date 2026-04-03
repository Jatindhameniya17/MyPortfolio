"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase, Cloud, FolderOpen, Heart } from "lucide-react";

const stats = [
  { icon: FolderOpen, label: "2+ Projects", color: "text-blue-400" },
  { icon: Briefcase, label: "1 Internship", color: "text-green-400" },
  { icon: Cloud, label: "AWS Certified", color: "text-yellow-400" },
  { icon: Heart, label: "HUHC Volunteer", color: "text-pink-400" },
];

export function About() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ animation: "fadeUp" });
  const textRef = useScrollAnimation<HTMLDivElement>({ animation: "fadeUp", delay: 0.2 });

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-12 items-start">
        <div>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-clash)] mb-6"
          >
            About <span className="text-[var(--accent)]">Me</span>
          </h2>

          <div ref={textRef} className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              I&apos;m a final-year B.Tech student in Computer Science &amp;
              Engineering (AI &amp; ML) at ABES Engineering College. I love
              building full-stack web applications that are fast, responsive, and
              solve real problems.
            </p>
            <p>
              During my internship at Skillmind Software Limited, I developed
              production-ready ReactJS components, integrated REST APIs, and
              contributed to ML modules for predictive analytics — all while
              working in an agile team environment.
            </p>
            <p>
              Beyond code, I volunteer at HUHC NGO, teaching underprivileged
              children weekly. I&apos;m also an active member of Ardema — The
              Autocrat Society, contributing to technical discussions and
              workshops at my college.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <BentoCard key={stat.label} delay={i * 0.1}>
              <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
              <p className="font-semibold text-[var(--text-primary)]">{stat.label}</p>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
