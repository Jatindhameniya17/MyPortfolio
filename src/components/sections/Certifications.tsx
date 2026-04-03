"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import { Award, Heart, Users } from "lucide-react";

export function Certifications() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <BentoCard delay={0}>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[var(--accent)]/10">
              <Award className="w-8 h-8 text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                Certifications
              </h3>
              <div className="mt-4 p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                <p className="font-semibold text-[var(--text-primary)]">
                  AWS Cloud Practitioner Essentials
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  AWS Training &amp; Certification
                </p>
                <a href="#" className="inline-block mt-2 text-sm text-[var(--accent)] hover:underline">
                  View Certificate &rarr;
                </a>
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard delay={0.15}>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[var(--accent-secondary)]/10">
              <Heart className="w-8 h-8 text-[var(--accent-secondary)]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                Volunteering & PORs
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex gap-3 items-start">
                  <Users className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">
                      Ardema — The Autocrat Society
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Member — Contributed to technical discussions, events, and workshops.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Heart className="w-5 h-5 text-pink-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">
                      HUHC — NGO
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Volunteer — Taught underprivileged children weekly, focusing on education and personal development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
