"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { motion } from "framer-motion";

const socials = [
  { icon: GithubIcon, href: "https://github.com/Jatindhameniya17", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/jatin-dhameniya-044417264/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:jatindhameniya13@gmail.com", label: "Email" },
];

const subtitles = [
  "Full-Stack Developer",
  "AI/ML Enthusiast",
  "AWS Certified Cloud Practitioner",
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3,
      });
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        delay: 1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--accent)] rounded-full opacity-[0.07] blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent-blue)] rounded-full opacity-[0.05] blur-[120px]" />

      <div ref={containerRef} className="max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="hero-fade inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for opportunities
        </motion.div>

        {/* Main heading */}
        <div className="overflow-hidden mb-2">
          <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-clash)] tracking-tight">
            Hi, I&apos;m Jatin
          </h1>
        </div>
        <div className="overflow-hidden mb-6">
          <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-clash)] tracking-tight">
            I build{" "}
            <span className="gradient-text-purple">
              digital experiences
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="hero-fade text-lg sm:text-xl text-[var(--text-secondary)] mb-10 h-7">
          <TypeWriter words={subtitles} />
        </div>

        {/* CTAs */}
        <div className="hero-fade flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            View My Work
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="/Jatin_Dhameniya_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-surface)] transition-colors"
          >
            Download Resume
          </a>
        </div>

        {/* Social links */}
        <div className="hero-fade flex items-center justify-center gap-5">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
              data-cursor="pointer"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[var(--border)] flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
