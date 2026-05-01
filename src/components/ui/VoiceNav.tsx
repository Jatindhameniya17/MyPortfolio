"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

const COMMANDS = [
  { keywords: ["about", "profile", "jatin", "who are you", "introduce"],    section: "#about",    label: "About Me"  },
  { keywords: ["skill", "tech", "technology", "stack", "language", "tools"], section: "#skills",   label: "Skills"    },
  { keywords: ["project", "work", "built", "build", "made", "created"],      section: "#projects", label: "Projects"  },
  { keywords: ["journey", "experience", "timeline", "career", "intern"],     section: "#journey",  label: "Journey"   },
  { keywords: ["contact", "reach", "hire", "email", "connect", "touch"],     section: "#contact",  label: "Contact"   },
  { keywords: ["home", "top", "start", "beginning", "back"],                 section: "top",       label: "Home"      },
];

function matchCommand(t: string) {
  const lower = t.toLowerCase();
  for (const cmd of COMMANDS) {
    if (cmd.keywords.some((kw) => lower.includes(kw))) return cmd;
  }
  return null;
}

function doScroll(section: string) {
  if (section === "top") window.scrollTo({ top: 0, behavior: "smooth" });
  else document.querySelector(section)?.scrollIntoView({ behavior: "smooth" });
}

function WaveBars({ active }: { active: boolean }) {
  const heights = active
    ? ["4px","16px","8px","14px","6px","18px","5px"]
    : ["3px","7px","4px","9px","3px"];
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 18 }}>
      {heights.map((_, i) => (
        <motion.span
          key={i}
          className="rounded-full"
          style={{ width: 2.5, background: "currentColor" }}
          animate={{ height: active ? heights : ["3px","7px","3px"], opacity: active ? 1 : 0.5 }}
          transition={{
            duration: active ? 0.35 + i * 0.04 : 1 + i * 0.14,
            repeat: Infinity, repeatType: "mirror", ease: "easeInOut",
            delay: i * (active ? 0.05 : 0.11),
          }}
        />
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SR = any;

export function VoiceNav() {
  const [supported,   setSupported]   = useState(false);
  const [listening,   setListening]   = useState(false);
  const [transcript,  setTranscript]  = useState("");
  const [toast,       setToast]       = useState<{ label: string } | null>(null);
  const [noMatch,     setNoMatch]     = useState(false);
  const recRef     = useRef<SR | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) setSupported(true);
  }, []);

  const stopListening = useCallback(() => {
    recRef.current?.stop(); recRef.current = null;
    setListening(false); setTranscript("");
  }, []);

  const showToast = useCallback((cmd: { label: string; section: string }) => {
    setToast({ label: cmd.label });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    recRef.current = rec;
    rec.lang = "en-US"; rec.continuous = false;
    rec.interimResults = true; rec.maxAlternatives = 3;

    rec.onstart = () => { setListening(true); setNoMatch(false); setTranscript(""); };
    rec.onresult = (e: any) => {
      const interim = Array.from(e.results).map((r: any) => r[0].transcript).join(" ");
      setTranscript(interim);
      if (e.results[e.results.length - 1].isFinal) {
        const matched = matchCommand(interim);
        if (matched) { stopListening(); showToast(matched); setTimeout(() => doScroll(matched.section), 400); }
        else { stopListening(); setNoMatch(true); setTimeout(() => setNoMatch(false), 3500); }
      }
    };
    rec.onerror = (e: any) => {
      if (e.error !== "no-speech") { setNoMatch(true); setTimeout(() => setNoMatch(false), 3000); }
      stopListening();
    };
    rec.onend = () => { setListening(false); setTranscript(""); };
    rec.start();
  }, [stopListening, showToast]);

  const toggle = useCallback(() => {
    listening ? stopListening() : startListening();
  }, [listening, startListening, stopListening]);

  if (!supported) return null;

  return (
    <>
      {/* Navigation toast — pops up above pill */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-20 left-6 z-[960] flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-[var(--accent)]/30 bg-[var(--bg-surface)] backdrop-blur-xl shadow-xl"
          >
            <span className="text-base">🎙️</span>
            <div>
              <p className="text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-widest">going to</p>
              <p className="text-sm font-bold text-[var(--text-primary)]">{toast.label} →</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No-match hint */}
      <AnimatePresence>
        {noMatch && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-20 left-6 z-[960] px-4 py-2.5 rounded-2xl border border-orange-500/25 bg-[var(--bg-surface)] backdrop-blur-xl shadow-xl"
          >
            <p className="text-[9px] font-mono text-orange-400 mb-1 uppercase tracking-widest">try saying</p>
            <p className="text-xs font-mono text-[var(--text-secondary)]">about · skills · projects · contact</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main pill — bottom-left, desktop only ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.55, ease: "easeOut" }}
        className="fixed z-[950]"
        style={{ bottom: "1.5rem", left: "1.5rem" }}
      >
        {/* Floating label above pill */}
        <AnimatePresence>
          {!listening && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-6 left-0 right-0 flex justify-center pointer-events-none"
            >
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase"
                style={{ color: "rgba(124,58,237,0.6)" }}>
                voice nav
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Breathing glow */}
        <motion.div
          animate={{
            opacity: listening ? [0.6, 0.9, 0.6] : [0.15, 0.35, 0.15],
            scale:   listening ? [1, 1.1, 1]      : [1, 1.04, 1],
          }}
          transition={{ duration: listening ? 0.9 : 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full blur-xl pointer-events-none"
          style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
        />

        {/* Spinning conic border */}
        <div className="relative rounded-full overflow-hidden" style={{ padding: "1.5px" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: listening ? 1.0 : 3.5, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "300%", aspectRatio: "1",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              background: listening
                ? "conic-gradient(from 0deg, #7c3aed, #3b82f6, #a855f7, #ec4899, #7c3aed)"
                : "conic-gradient(from 0deg, transparent 50%, #7c3aed 72%, #3b82f6 88%, transparent 100%)",
            }}
          />

          {/* Button inner */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Voice navigation"
            title="Click and say: about, skills, projects, journey, contact, home"
            className="relative flex items-center gap-2.5 rounded-full cursor-pointer select-none"
            style={{
              padding: "10px 18px",
              background: listening
                ? "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(59,130,246,0.22))"
                : "rgba(9,9,11,0.93)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Icon / bars */}
            <span className={`relative z-10 flex items-center ${listening ? "text-white" : "text-[var(--accent)]"}`}>
              {listening
                ? <WaveBars active={true} />
                : <span className="flex items-center gap-2"><Mic className="w-3.5 h-3.5 shrink-0" /><WaveBars active={false} /></span>
              }
            </span>

            {/* Divider */}
            <span className="w-px self-stretch rounded-full opacity-20"
              style={{ background: listening ? "#fff" : "var(--accent)" }} />

            {/* Text */}
            <span className={`relative z-10 font-mono tracking-wide whitespace-nowrap ${listening ? "text-white text-[11px]" : "text-white/75 text-[11px]"}`}>
              {listening ? (
                <span className="flex items-center gap-1 max-w-[120px]">
                  <span className="truncate">{transcript || "listening"}</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.65, repeat: Infinity }}
                    className="inline-block w-[1.5px] h-3 bg-white rounded-full"
                  />
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span>navigate</span>
                  <span className="opacity-40">·</span>
                  <span className="text-[var(--accent)] opacity-80">voice</span>
                </span>
              )}
            </span>

            {/* Stop icon when listening */}
            {listening && (
              <span className="relative z-10 ml-0.5 text-white/60">
                <MicOff className="w-3 h-3" />
              </span>
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
