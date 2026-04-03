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
  "Full-Stack Developer | React & Node.js",
  "400+ DSA Problems Solved",
  "AWS Certified | Cloud & DevOps",
  "2025 B.Tech Graduate | Immediate Joiner",
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--accent)] rounded-full opacity-[0.07] blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent-blue)] rounded-full opacity-[0.05] blur-[120px]" />

      <div ref={containerRef} className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-[1fr_auto] gap-12 items-center">
        {/* Left — Text content */}
        <div className="text-center md:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="hero-fade inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open to Internships &amp; Full-Time Roles
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden mb-2">
            <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-clash)] tracking-tight">
              Hi, I&apos;m Jatin
            </h1>
          </div>
          <div className="overflow-hidden mb-6">
            <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-clash)] tracking-tight">
              I turn ideas into{" "}
              <span className="gradient-text-purple">code</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="hero-fade text-lg sm:text-xl text-[var(--text-secondary)] mb-10 h-7">
            <TypeWriter words={subtitles} />
          </div>

          {/* CTAs */}
          <div className="hero-fade flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
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
          <div className="hero-fade flex items-center justify-center md:justify-start gap-4">
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

        {/* Right — Animated Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
          className="hidden md:flex justify-center"
        >
          <div className="relative w-64 h-64 lg:w-72 lg:h-72">
            {/* Animated gradient background blob */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[var(--accent)] via-[var(--accent-blue)] to-[var(--accent-warm)] opacity-60 blur-xl"
            />

            {/* Secondary rotating blob */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-3xl bg-gradient-to-l from-[var(--accent-blue)] via-[var(--accent)] to-pink-500 opacity-30 blur-lg"
            />

            {/* Photo with rounded-square frame */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotateX: [0, -2, 2, 0],
                rotateY: [0, 3, -3, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
              style={{ perspective: 800, transformStyle: "preserve-3d" }}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <img
                  src="/images/jatin-photo.png"
                  alt="Jatin Dhameniya"
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay at bottom for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              animate={{ y: [-5, 5, -5], x: [0, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-[var(--accent)]/30"
            >
              &lt;/&gt;
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5], x: [0, -3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-2 -left-2 w-7 h-7 rounded-lg bg-[var(--accent-blue)] flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-[var(--accent-blue)]/30"
            >
              JS
            </motion.div>

            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -left-4 w-6 h-6 rounded-full bg-[var(--accent-warm)] flex items-center justify-center text-white text-[10px] font-bold shadow-lg shadow-[var(--accent-warm)]/30"
            >
              AI
            </motion.div>

            {/* Green status indicator */}
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg)]/80 backdrop-blur-sm border border-[var(--border)]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-green-400 font-medium">Open to work</span>
            </div>
          </div>
        </motion.div>
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
