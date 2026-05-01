"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-4 left-0 right-0 z-[1000] flex justify-center px-4"
      >
        <nav
          className={cn(
            "flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300",
            scrolled
              ? "bg-white/75 dark:bg-[var(--bg)]/80 backdrop-blur-xl border-[var(--border)] shadow-lg shadow-purple-200/30 dark:shadow-black/10"
              : "bg-white/55 dark:bg-[var(--bg)]/40 backdrop-blur-md border-[var(--border)]"
          )}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-4 py-2 text-lg font-bold font-[family-name:var(--font-clash)] gradient-text"
          >
            JD
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-full transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a
              href="/Jatin_Dhameniya_Resume.pdf"
              download
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
            <button
              className="md:hidden p-2 rounded-full hover:bg-[var(--bg-surface)] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-[var(--text-primary)]" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--text-primary)]" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] bg-[var(--bg)]/95 backdrop-blur-xl pt-28 px-8 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleClick(link.href)}
                  className="text-2xl font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors text-left py-2"
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href="/Jatin_Dhameniya_Resume.pdf"
                download
                className="inline-flex items-center gap-2 text-lg text-[var(--accent)] mt-4"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
