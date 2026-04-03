"use client";

import { Award, Heart, Users } from "lucide-react";
import { motion } from "framer-motion";

export function Certifications() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* AWS */}
          <div
            className="spotlight-card p-6"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
            }}
          >
            <div className="relative z-10 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[var(--accent-warm)]/10">
                <Award className="w-6 h-6 text-[var(--accent-warm)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">Certification</p>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  AWS Cloud Practitioner Essentials
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  AWS Training &amp; Certification
                </p>
              </div>
            </div>
          </div>

          {/* Volunteering */}
          <div
            className="spotlight-card p-6"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
            }}
          >
            <div className="relative z-10 space-y-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--text-primary)] text-sm">Ardema — The Autocrat Society</p>
                  <p className="text-xs text-[var(--text-secondary)]">Technical discussions & workshops</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-pink-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--text-primary)] text-sm">HUHC — NGO</p>
                  <p className="text-xs text-[var(--text-secondary)]">Teaching underprivileged children weekly</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
