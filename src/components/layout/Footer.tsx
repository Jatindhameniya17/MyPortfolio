"use client";

import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/Jatindhameniya17", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/jatin-dhameniya-044417264/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:jatindhameniya13@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-secondary)]">
          Designed & Built by{" "}
          <span className="text-[var(--accent)] font-semibold">Jatin Dhameniya</span>
        </p>

        <p className="text-xs text-[var(--text-secondary)]">
          Made with Next.js, Tailwind CSS, GSAP & Three.js
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="p-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text-secondary)] transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
