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

const techStack = [
  { label: "React", color: "#61dafb" },
  { label: "Next.js", color: "#a1a1aa" },
  { label: "TypeScript", color: "#3b82f6" },
  { label: "Node.js", color: "#68a063" },
  { label: "Python", color: "#f7c948" },
  { label: "MongoDB", color: "#47a248" },
  { label: "AWS", color: "#f97316" },
  { label: "Docker", color: "#2496ed" },
  { label: "Tailwind CSS", color: "#38bdf8" },
  { label: "C++", color: "#7c3aed" },
  { label: "Express.js", color: "#a1a1aa" },
  { label: "SQL", color: "#3b82f6" },
];

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
          {/* Bio card */}
          <motion.div variants={item} className="col-span-6 md:col-span-4">
            <SpotlightCard className="p-6 h-full">
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-blue)] flex items-center justify-center shadow-lg">
                    <span className="text-lg font-bold text-white font-[family-name:var(--font-clash)]">JD</span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-blue)] opacity-40 blur-lg -z-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] font-[family-name:var(--font-clash)]">
                      Jatin Dhameniya
                    </h3>
                    <span className="text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                      Immediate Joiner
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    2026 B.Tech CSE (AI &amp; ML) grad from ABES Engineering College with hands-on experience
                    across two internships — currently an{" "}
                    <span className="text-[var(--accent-blue)] font-medium">AI Automation &amp; Testing Intern at Vizilare Technology Pvt. Ltd.</span>,
                    and previously a{" "}
                    <span className="text-[var(--accent-blue)] font-medium">Software Developer Intern at Skillmind Software</span>{" "}
                    where I built React UIs &amp; integrated REST APIs. 400+ DSA problems solved, AWS Cloud
                    Practitioner certified — ready to join immediately as an{" "}
                    <span className="text-[var(--accent)] font-medium">SDE / Full-Stack / AI Engineer</span>.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Location */}
          <motion.div variants={item} className="col-span-3 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[var(--accent)]/10">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                  </div>
                  <span className="text-xs text-[var(--text-secondary)]">Location</span>
                </div>
                <div>
                  <div className="text-3xl mb-2">🇮🇳</div>
                  <p className="font-bold text-[var(--text-primary)]">Noida, UP</p>
                  <p className="text-xs text-[var(--text-secondary)] mb-3">India</p>
                  <span className="text-xs font-medium text-[var(--accent-blue)] bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                    Open to Remote &amp; Relocation
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* DSA stat */}
          <motion.div variants={item} className="col-span-3 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex flex-col justify-between h-full gap-3">
                <div className="p-2 rounded-lg bg-[var(--accent)]/10 w-fit">
                  <Code2 className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-4xl font-bold gradient-text-purple leading-none font-[family-name:var(--font-clash)]">
                    400+
                  </p>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-1">DSA Problems Solved</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">LeetCode · GeeksForGeeks</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Current Role */}
          <motion.div variants={item} className="col-span-3 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex flex-col justify-between h-full gap-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-[var(--accent-blue)]/10 w-fit">
                    <Briefcase className="w-5 h-5 text-[var(--accent-blue)]" />
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                    </span>
                    Live
                  </span>
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm">Vizilare Technology</p>
                  <p className="text-xs text-[var(--text-secondary)]">AI Automation &amp; Testing Intern</p>
                  <div className="mt-2 pt-2 border-t border-[var(--border)]">
                    <p className="text-xs text-[var(--text-secondary)]/60">Previously · Skillmind Software</p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Education */}
          <motion.div variants={item} className="col-span-6 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex flex-col justify-between h-full gap-3">
                <div className="p-2 rounded-lg bg-[var(--accent)]/10 w-fit">
                  <GraduationCap className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm">ABES Engineering College</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">B.Tech CSE (AI &amp; ML)</p>
                  <div className="mt-2">
                    <span className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-2 py-0.5 rounded-full">
                      75.92%
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Tech Stack Strip */}
          <motion.div variants={item} className="col-span-6">
            <SpotlightCard className="p-4 overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-widest">
                  Tech Stack
                </span>
              </div>
              <div className="overflow-hidden">
                <div className="flex gap-2 animate-marquee w-max">
                  {[...techStack, ...techStack].map((tech, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-xs font-medium text-[var(--text-secondary)] shrink-0"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: tech.color }}
                      />
                      {tech.label}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* AWS */}
          <motion.div variants={item} className="col-span-3 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--accent-warm)]/10 border border-[var(--accent-warm)]/10 shrink-0">
                  <Cloud className="w-5 h-5 text-[var(--accent-warm)]" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm">AWS Certified</p>
                  <p className="text-xs text-[var(--text-secondary)]">Cloud Practitioner · CLF-C02</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Volunteering */}
          <motion.div variants={item} className="col-span-3 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/10 shrink-0">
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm">HUHC NGO</p>
                  <p className="text-xs text-[var(--text-secondary)]">Volunteer Teacher · Weekly Sessions</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Ardema */}
          <motion.div variants={item} className="col-span-6 md:col-span-2">
            <SpotlightCard className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/10 shrink-0">
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
