"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { MagneticButton } from "@/components/ui/MagneticButton";

const PhotoCard3D = dynamic(
  () => import("@/components/three/PhotoCard3D").then((m) => ({ default: m.PhotoCard3D })),
  { ssr: false, loading: () => <div className="w-full h-[500px] bg-[var(--bg-surface)] rounded-2xl animate-pulse" /> }
);

const subtitles = [
  "Full-Stack Developer",
  "AI/ML Enthusiast",
  "AWS Certified",
  "Open Source Contributor",
];

const socials = [
  { icon: GithubIcon, href: "https://github.com/Jatindhameniya17", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/jatin-dhameniya-044417264/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:jatindhameniya13@gmail.com", label: "Email" },
];

export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
      });

      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll(".char");
        gsap.from(chars, {
          opacity: 0,
          y: 80,
          rotateX: -90,
          stagger: 0.04,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(1.7)",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const nameText = "JATIN DHAMENIYA";

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent)] rounded-full opacity-10 blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent-secondary)] rounded-full opacity-10 blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <p ref={labelRef} className="text-lg text-[var(--text-secondary)] mb-2">
            Hi, I&apos;m
          </p>

          <h1
            ref={nameRef}
            className="text-5xl sm:text-6xl lg:text-[100px] font-bold font-[family-name:var(--font-clash)] leading-none mb-4"
          >
            {nameText.split("").map((char, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <div className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-8 h-8">
            <TypeWriter words={subtitles} />
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <MagneticButton
              href="#projects"
              className="bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              href="/Jatin_Dhameniya_Resume.pdf"
              download
              className="border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
            >
              Download Resume
            </MagneticButton>
          </div>

          <div className="flex gap-5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                data-cursor="pointer"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <PhotoCard3D />
        </div>

        <div className="md:hidden flex justify-center">
          <div className="relative w-48 h-60 rounded-2xl overflow-hidden border-2 border-[var(--accent)]">
            <img
              src="/images/jatin-photo.jpg"
              alt="Jatin Dhameniya"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
