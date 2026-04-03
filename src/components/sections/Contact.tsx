"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, Phone, Send, CheckCircle2, XCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

const socials = [
  { icon: GithubIcon, href: "https://github.com/Jatindhameniya17", label: "GitHub", text: "Jatindhameniya17" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/jatin-dhameniya-044417264/", label: "LinkedIn", text: "jatin-dhameniya" },
  { icon: Mail, href: "mailto:jatindhameniya13@gmail.com", label: "Email", text: "jatindhameniya13@gmail.com" },
  { icon: Phone, href: "tel:+918707684171", label: "Phone", text: "+91-8707684171" },
];

export function Contact() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ animation: "fadeUp" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          honeypot: formData.get("_hp"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-clash)] mb-12 text-center"
        >
          Let&apos;s <span className="text-[var(--accent)]">Connect</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" name="_hp" className="hidden" tabIndex={-1} autoComplete="off" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Name</label>
              <input
                id="name" name="name" type="text" required
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email</label>
              <input
                id="email" name="email" type="email" required
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Message</label>
              <textarea
                id="message" name="message" required rows={5}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent)]/90 transition-all disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-red-400 text-sm">
                <XCircle className="w-4 h-4" /> Failed to send. Please try again.
              </p>
            )}
          </form>

          <div className="space-y-6">
            <p className="text-[var(--text-secondary)]">
              Feel free to reach out through any of these channels. I&apos;m
              always open to discussing new opportunities, collaborations, or
              just a friendly chat about tech!
            </p>
            <div className="space-y-4">
              {socials.map(({ icon: Icon, href, label, text }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg-surface)] transition-all group"
                  data-cursor="pointer"
                >
                  <Icon className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">{label}</p>
                    <p className="text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
