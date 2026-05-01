"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const TECH_TAGS = [
  { text: "</>",  x: "12%", y: "18%" },
  { text: "AI",   x: "82%", y: "14%" },
  { text: "{ }",  x: "8%",  y: "72%" },
  { text: "ML",   x: "86%", y: "74%" },
  { text: "λ",    x: "50%", y: "8%"  },
  { text: "∞",    x: "18%", y: "88%" },
  { text: "→",    x: "78%", y: "44%" },
  { text: "01",   x: "88%", y: "38%" },
];

function useTypewriter(text: string, active: boolean, speed = 52) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    if (!active) { setDisplay(""); return; }
    setDisplay("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [active, text, speed]);
  return display;
}

const RADIUS = 54;
const CIRC   = 2 * Math.PI * RADIUS;

export function PageLoader() {
  const [isLoading,    setIsLoading]    = useState(true);
  const [phase,        setPhase]        = useState(0);
  const [showCTA,      setShowCTA]      = useState(false);
  const [entering,     setEntering]     = useState(false);
  const [burstOrigin,  setBurstOrigin]  = useState({ x: 50, y: 40 }); // % of viewport
  const logoRef = useRef<HTMLDivElement>(null);

  /* Phase timeline — no auto-close; user must click Enter */
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 350),
      setTimeout(() => setPhase(2), 950),
      setTimeout(() => setPhase(3),  2300),
      // CTA appears after typewriter finishes (~3.6 s)
      setTimeout(() => setShowCTA(true), 3600),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  /* User clicks Enter → burst animation + voice → close after speech ends */
  const handleEnter = useCallback(() => {
    if (entering) return;

    // Capture JD logo center as % of viewport so burst originates from it
    if (logoRef.current) {
      const r = logoRef.current.getBoundingClientRect();
      setBurstOrigin({
        x: ((r.left + r.width  / 2) / window.innerWidth)  * 100,
        y: ((r.top  + r.height / 2) / window.innerHeight) * 100,
      });
    }

    setEntering(true);

    const doClose = () => {
      setPhase(4);
      setIsLoading(false);
      window.dispatchEvent(new CustomEvent("portfolio:entered"));
    };

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      // Small delay so the burst animation renders first
      setTimeout(() => {
        const utter     = new SpeechSynthesisUtterance("Hello! I'm Jatin Dhameniya.");
        utter.rate      = 0.92;
        utter.pitch     = 1.05;
        utter.volume    = 1;
        const voices    = speechSynthesis.getVoices();
        const preferred = voices.find(v => v.lang.startsWith("en") && v.name.includes("Google"))
                       || voices.find(v => v.lang.startsWith("en"));
        if (preferred) utter.voice = preferred;

        // Close 600ms after speech finishes
        utter.onend = () => setTimeout(doClose, 600);

        // Fallback: if speech never fires onend, close after 4.5s
        const fallback = setTimeout(doClose, 4500);
        utter.onstart  = () => clearTimeout(fallback);

        window.speechSynthesis.speak(utter);

        // If browser silently ignores speech (no onstart in 1s) → close anyway
        setTimeout(() => {
          if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) doClose();
        }, 1000);
      }, 250);
    } else {
      setTimeout(doClose, 2500);
    }
  }, [entering]);

  const line1        = useTypewriter("Hello, I'm Jatin",        phase >= 2, 55);
  const line2        = useTypewriter("Full-Stack & AI Engineer", phase >= 3, 48);
  const ringProgress = phase >= 3 ? 1 : phase >= 2 ? 0.55 : phase >= 1 ? 0.18 : 0;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#09090b] overflow-hidden"
        >
          {/* ── Background orbs ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.14, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[var(--accent)] blur-[200px] pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.09, scale: 1 }}
            transition={{ duration: 2, delay: 0.4 }}
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--accent-blue)] blur-[180px] pointer-events-none"
          />

          {/* ── Floating tech tags ── */}
          {TECH_TAGS.map((tag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: phase >= 1 ? 0.13 : 0,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.3 + i * 0.08 },
                scale:   { duration: 0.4, delay: 0.3 + i * 0.08 },
                y: { duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 },
              }}
              className="absolute font-mono font-bold text-base text-[var(--accent)] select-none pointer-events-none"
              style={{ left: tag.x, top: tag.y }}
            >
              {tag.text}
            </motion.span>
          ))}

          {/* ── Entry burst: ripple shockwaves from center ── */}
          <AnimatePresence>
            {entering && (
              <>
                {/* Purple radial flash — centred on logo */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.22, 0] }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  style={{
                    background: `radial-gradient(circle at ${burstOrigin.x}% ${burstOrigin.y}%, rgba(124,58,237,0.85) 0%, rgba(59,130,246,0.3) 40%, transparent 70%)`,
                  }}
                />

                {/* Expanding shockwave rings from logo */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      border: `${2 - i * 0.3}px solid rgba(124,58,237,${0.8 - i * 0.15})`,
                      top:  `${burstOrigin.y}%`,
                      left: `${burstOrigin.x}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ width: 88, height: 88, opacity: 0.9 }}
                    animate={{ width: "220vw", height: "220vw", opacity: 0 }}
                    transition={{ duration: 1.4, delay: i * 0.18, ease: "easeOut" }}
                  />
                ))}

                {/* Blue secondary ring from logo */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    border: "1px solid rgba(59,130,246,0.6)",
                    top:  `${burstOrigin.y}%`,
                    left: `${burstOrigin.x}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ width: 60, height: 60, opacity: 0.7 }}
                  animate={{ width: "180vw", height: "180vw", opacity: 0 }}
                  transition={{ duration: 1.1, delay: 0.08, ease: "easeOut" }}
                />

                {/* Particle sparks flying out from logo */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i / 12) * 360;
                  const dist  = 180 + i * 15;
                  const rad   = (angle * Math.PI) / 180;
                  return (
                    <motion.span
                      key={i}
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width:  i % 3 === 0 ? 5 : 3,
                        height: i % 3 === 0 ? 5 : 3,
                        background: i % 2 === 0 ? "#7c3aed" : "#3b82f6",
                        top:  `${burstOrigin.y}%`,
                        left: `${burstOrigin.x}%`,
                      }}
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos(rad) * dist,
                        y: Math.sin(rad) * dist,
                        opacity: 0,
                        scale: [1, 1.5, 0],
                      }}
                      transition={{ duration: 0.9, delay: 0.1 + i * 0.03, ease: "easeOut" }}
                    />
                  );
                })}
              </>
            )}
          </AnimatePresence>

          {/* ── Scan line ── */}
          {phase >= 1 && (
            <motion.div
              initial={{ top: "-2px", opacity: 0.7 }}
              animate={{ top: "102%", opacity: 0 }}
              transition={{ duration: 1.6, ease: "linear", delay: 0.1 }}
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.7) 30%, rgba(59,130,246,0.7) 70%, transparent 100%)",
              }}
            />
          )}

          {/* ── Centre content ── */}
          <div className="relative flex flex-col items-center gap-8">

            {/* Logo + ring */}
            <motion.div
              ref={logoRef}
              initial={{ opacity: 0, scale: 0.2, rotateY: -180 }}
              animate={{ opacity: phase >= 1 ? 1 : 0, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.75, ease: "backOut" }}
              className="relative flex items-center justify-center"
              style={{ perspective: 900 }}
            >
              <svg width="148" height="148" className="absolute" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="74" cy="74" r={RADIUS} fill="none" stroke="rgba(124,58,237,0.10)" strokeWidth="2.5" />
                <motion.circle
                  cx="74" cy="74" r={RADIUS}
                  fill="none" stroke="url(#pg)" strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={CIRC}
                  animate={{ strokeDashoffset: CIRC * (1 - ringProgress) }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>

              {phase >= 1 && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[156px] h-[156px] rounded-full pointer-events-none"
                  style={{
                    background: "conic-gradient(from 0deg, rgba(124,58,237,0.65) 0deg, rgba(59,130,246,0.45) 90deg, transparent 170deg)",
                  }}
                />
              )}

              <motion.div
                animate={{
                  boxShadow: entering
                    ? "0 0 80px rgba(124,58,237,0.95), 0 0 160px rgba(124,58,237,0.5), 0 0 240px rgba(59,130,246,0.3)"
                    : phase >= 3
                    ? "0 0 50px rgba(124,58,237,0.55), 0 0 100px rgba(124,58,237,0.2)"
                    : "0 0 24px rgba(124,58,237,0.25)",
                  scale: entering ? [1, 1.18, 1.05] : 1,
                }}
                transition={{ duration: entering ? 0.5 : 0.8 }}
                className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-blue)] flex items-center justify-center"
              >
                <span className="text-3xl font-bold text-white font-[family-name:var(--font-clash)]">JD</span>
                {phase >= 3 && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.55 }}
                    animate={{ scale: 2.8, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 rounded-2xl border-2 border-[var(--accent)]"
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Typewriter text */}
            <div className="flex flex-col items-center gap-2 min-h-[72px]">
              {phase >= 2 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-clash)] tracking-tight"
                >
                  {line1}
                  {line1.length < "Hello, I'm Jatin".length && (
                    <span className="inline-block w-[2px] h-5 bg-[var(--accent)] ml-1 align-middle animate-pulse" />
                  )}
                </motion.p>
              )}
              {phase >= 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-sm sm:text-base font-semibold font-[family-name:var(--font-clash)] gradient-text-purple"
                >
                  {line2}
                  {line2.length < "Full-Stack & AI Engineer".length && (
                    <span className="inline-block w-[2px] h-4 bg-[var(--accent)] ml-1 align-middle animate-pulse" />
                  )}
                </motion.p>
              )}
            </div>

            {/* ── Enter CTA ── */}
            <AnimatePresence>
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.55, ease: "backOut" }}
                  className="flex flex-col items-center gap-3"
                >
                  {/* Particle dots floating up */}
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-1 h-1 rounded-full pointer-events-none"
                      style={{
                        background: i % 2 === 0 ? "var(--accent)" : "var(--accent-blue)",
                        left: `${30 + i * 8}%`,
                      }}
                      animate={{ y: [-4, -28, -4], opacity: [0, 0.7, 0] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                  {/* Rotating gradient border pill */}
                  <div className="relative">
                    {/* Outer breathing glow */}
                    <motion.div
                      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.06, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full blur-xl pointer-events-none"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
                    />

                    {/* Spinning border wrapper */}
                    <div className="relative rounded-full overflow-hidden" style={{ padding: "1.5px" }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: entering ? 0.6 : 2.5, repeat: Infinity, ease: "linear" }}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          width: "300%", aspectRatio: "1",
                          top: "50%", left: "50%",
                          transform: "translate(-50%,-50%)",
                          background: "conic-gradient(from 0deg, #7c3aed, #3b82f6, #a855f7, #ec4899, #7c3aed)",
                        }}
                      />

                      {/* The button */}
                      <motion.button
                        onClick={handleEnter}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        disabled={entering}
                        className="relative flex items-center gap-3 px-8 py-3.5 rounded-full cursor-pointer"
                        style={{
                          background: "rgba(9,9,11,0.92)",
                          backdropFilter: "blur(20px)",
                        }}
                      >
                        <motion.span
                          animate={{ rotate: entering ? 360 : [0, 15, -15, 0] }}
                          transition={entering
                            ? { duration: 0.5, repeat: Infinity, ease: "linear" }
                            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                          }
                        >
                          <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                        </motion.span>

                        <span className="font-[family-name:var(--font-clash)] font-bold text-base text-white tracking-wide">
                          {entering ? "Entering…" : "Enter Portfolio"}
                        </span>

                        <motion.span
                          animate={entering ? { x: [0, 6, 0] } : { x: [0, 5, 0] }}
                          transition={{ duration: entering ? 0.4 : 1.4, repeat: Infinity, ease: "easeInOut" }}
                          className="text-[var(--accent)] font-bold"
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
