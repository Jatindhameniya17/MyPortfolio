"use client";

import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

const links = [
  { icon: GithubIcon, href: "https://github.com/Jatindhameniya17", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/jatin-dhameniya-044417264/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:jatindhameniya13@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--text-secondary)]">
          &copy; 2026 Jatin Dhameniya. Built with Next.js &amp; Tailwind.
        </p>

        <div className="flex items-center gap-3">
          {links.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
          <div className="w-px h-4 bg-[var(--border)] mx-1" />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
