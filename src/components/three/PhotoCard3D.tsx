"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function PhotoCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setRotateX((y - 0.5) * -20);
    setRotateY((x - 0.5) * 20);
  };

  const reset = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="w-full flex items-center justify-center" style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-[280px] h-[350px] md:w-[300px] md:h-[380px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glowing border */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] opacity-80 blur-sm" />

        {/* Photo */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[var(--accent)]">
          <img
            src="/images/jatin-photo.png"
            alt="Jatin Dhameniya"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating particles effect with CSS */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[var(--accent)] animate-ping opacity-50" />
        <div className="absolute bottom-8 left-6 w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-ping opacity-40 [animation-delay:0.5s]" />
        <div className="absolute top-1/3 right-8 w-1 h-1 rounded-full bg-[var(--accent)] animate-ping opacity-30 [animation-delay:1s]" />
      </motion.div>
    </div>
  );
}
