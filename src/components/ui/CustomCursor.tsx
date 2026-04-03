"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const size = useMotionValue(8);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const springSize = useSpring(size, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        size.set(40);
      }
    };

    const handleOut = () => size.set(8);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY, size]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full bg-[var(--accent)] mix-blend-difference pointer-events-none z-[99999] hidden md:block"
      style={{
        x: springX,
        y: springY,
        width: springSize,
        height: springSize,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}
