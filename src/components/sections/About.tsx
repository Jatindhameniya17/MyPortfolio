"use client";

import { motion } from "framer-motion";
import { Briefcase, Cloud, Heart, Code2, GraduationCap, MapPin, Users, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div onMouseMove={handleMouse} className={`spotlight-card ${className}`}>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
};

export function About() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ animation: "fadeUp" });

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-clash)] mb-4 text-center"
        >
          About <span className="gradient-text-purple">Me</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-16 max-w-lg mx-auto">
          A quick overview of my skills, experience, and what drives me
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-6 gap-3"
        >
          {/* Bio card — wide */}
          <motion.div variants={item} className="col-span-6 md:col-span-4">
            <SpotlightCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[var(--accent)]/10 shrink-0">
                  <Zap className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                    Jatin Dhameniya
                    <span className="ml-2 text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Immediate Joiner</span>
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    2026 B.Tech CSE (AI &amp; ML) graduate from ABES Engineering College.
                    Full-stack developer with hands-on internship experience building React apps,
                    REST APIs, and ML modules. Solved 400+ DSA problems, AWS certified, and
                    passionate about writing clean, production-ready code. Looking for
                    <span className="text-[var(--accent)]"> SDE / Full-Stack / Frontend roles</span>.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Location */}
          <motion.div variants={item} className="col-span-3 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex flex-col justify-between h-full gap-3">
                <MapPin className="w-5 h-5 text-[var(--accent)]" />
                <div>
                  <p className="font-bold text-[var(--text-primary)]">India</p>
                  <p className="text-xs text-[var(--text-secondary)]">Ghaziabad, UP</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* DSA — hero stat */}
          <motion.div variants={item} className="col-span-3 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex flex-col justify-between h-full gap-3">
                <div className="p-2 rounded-lg bg-[var(--accent)]/10 w-fit">
                  <Code2 className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text-purple leading-none">400+</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">DSA Problems Solved</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Internship */}
          <motion.div variants={item} className="col-span-3 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex flex-col justify-between h-full gap-3">
                <div className="p-2 rounded-lg bg-[var(--accent-blue)]/10 w-fit">
                  <Briefcase className="w-5 h-5 text-[var(--accent-blue)]" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm">Skillmind Software</p>
                  <p className="text-xs text-[var(--text-secondary)]">SDE Intern &bull; Summer 2025</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Education */}
          <motion.div variants={item} className="col-span-6 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[var(--accent)]/10 shrink-0">
                  <GraduationCap className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm">ABES Engineering College</p>
                  <p className="text-xs text-[var(--text-secondary)]">B.Tech CSE (AI &amp; ML) &bull; 75.92%</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* AWS */}
          <motion.div variants={item} className="col-span-3 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--accent-warm)]/10 shrink-0">
                  <Cloud className="w-5 h-5 text-[var(--accent-warm)]" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm">AWS Certified</p>
                  <p className="text-xs text-[var(--text-secondary)]">Cloud Practitioner</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Volunteering */}
          <motion.div variants={item} className="col-span-3 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-pink-500/10 shrink-0">
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm">HUHC NGO</p>
                  <p className="text-xs text-[var(--text-secondary)]">Volunteer Teacher</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Ardema */}
          <motion.div variants={item} className="col-span-6 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--accent-blue)]/10 shrink-0">
                  <Users className="w-5 h-5 text-[var(--accent-blue)]" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm">Ardema Society</p>
                  <p className="text-xs text-[var(--text-secondary)]">Technical Events &amp; Workshops</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
