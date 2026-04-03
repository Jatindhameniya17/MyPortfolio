"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, Cloud, Heart, GraduationCap } from "lucide-react";
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
    <div onMouseMove={handleMouse} className={`spotlight-card p-6 ${className}`}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function About() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ animation: "fadeUp" });

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-clash)] mb-14 text-center"
        >
          About <span className="gradient-text-purple">Me</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]"
        >
          {/* Photo card - spans 2 rows */}
          <motion.div variants={item} className="col-span-2 row-span-2">
            <SpotlightCard className="h-full flex flex-col justify-end">
              <div className="flex items-end gap-5 h-full">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border border-[var(--border)] shrink-0">
                  <img
                    src="/images/jatin-photo.png"
                    alt="Jatin Dhameniya"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                    Jatin Dhameniya
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Final-year B.Tech CSE (AI &amp; ML) student at ABES Engineering College.
                    Passionate about building fast, responsive web apps that solve real problems.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Location */}
          <motion.div variants={item}>
            <SpotlightCard className="h-full flex flex-col justify-between">
              <MapPin className="w-5 h-5 text-[var(--accent)]" />
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Located in</p>
                <p className="font-semibold text-[var(--text-primary)]">India</p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Experience */}
          <motion.div variants={item}>
            <SpotlightCard className="h-full flex flex-col justify-between">
              <Briefcase className="w-5 h-5 text-[var(--accent-blue)]" />
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">1</p>
                <p className="text-sm text-[var(--text-secondary)]">Internship</p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Education */}
          <motion.div variants={item}>
            <SpotlightCard className="h-full flex flex-col justify-between">
              <GraduationCap className="w-5 h-5 text-[var(--accent)]" />
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">75.92%</p>
                <p className="text-sm text-[var(--text-secondary)]">B.Tech CSE</p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* AWS */}
          <motion.div variants={item}>
            <SpotlightCard className="h-full flex flex-col justify-between">
              <Cloud className="w-5 h-5 text-[var(--accent-warm)]" />
              <div>
                <p className="font-semibold text-[var(--text-primary)]">AWS</p>
                <p className="text-sm text-[var(--text-secondary)]">Certified</p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Volunteer - spans 2 columns */}
          <motion.div variants={item} className="col-span-2">
            <SpotlightCard className="h-full flex items-center gap-4">
              <Heart className="w-6 h-6 text-pink-500 shrink-0" />
              <div>
                <p className="font-semibold text-[var(--text-primary)]">HUHC NGO Volunteer</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Teaching underprivileged children weekly &bull; Ardema Society Member
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
