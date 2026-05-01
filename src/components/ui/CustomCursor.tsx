"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX   = useMotionValue(-100);
  const cursorY   = useMotionValue(-100);
  const size      = useMotionValue(8);
  const [ready, setReady] = useState(false);

  const springX    = useSpring(cursorX,  { stiffness: 500, damping: 28 });
  const springY    = useSpring(cursorY,  { stiffness: 500, damping: 28 });
  const springSize = useSpring(size,     { stiffness: 300, damping: 20 });

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!ready) setReady(true);
    };

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "A" || t.tagName === "BUTTON" || t.closest("a") || t.closest("button") || t.dataset.cursor === "pointer") {
        size.set(40);
      }
    };

    const handleOut = () => size.set(8);

    window.addEventListener("mousemove",  moveCursor);
    window.addEventListener("mouseover",  handleOver);
    window.addEventListener("mouseout",   handleOut);

    return () => {
      window.removeEventListener("mousemove",  moveCursor);
      window.removeEventListener("mouseover",  handleOver);
      window.removeEventListener("mouseout",   handleOut);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 left-0 rounded-full bg-[var(--accent)] mix-blend-difference pointer-events-none z-[99999] hidden md:block"
      style={{
        x: springX,
        y: springY,
        width:      springSize,
        height:     springSize,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}
