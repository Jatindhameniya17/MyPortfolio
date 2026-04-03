"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ children, className, delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,107,53,0.15)" }}
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 transition-colors",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
