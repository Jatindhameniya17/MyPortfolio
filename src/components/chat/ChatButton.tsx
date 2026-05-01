"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
}

const WELCOME_MSG = "Welcome! I'm Jatin's AI assistant. If you want to know about Jatin — his skills, projects, or availability — just ask me! Or feel free to scroll through the site.";

export function ChatButton({ onClick }: ChatButtonProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let timer: ReturnType<typeof setTimeout>;

    const onEntered = () => {
      // Wait 7s after user actually enters the site
      timer = setTimeout(() => {
        if (dismissed) return;
        setToastText(WELCOME_MSG);
        setShowToast(true);

        if ("speechSynthesis" in window) {
          setTimeout(() => {
            speechSynthesis.cancel();
            const doSpeak = () => {
              const utter = new SpeechSynthesisUtterance(
                "Welcome! I'm Jatin's AI assistant. Ask me anything about his skills, projects, or availability!"
              );
              utter.rate   = 1;
              utter.pitch  = 1;
              utter.volume = 1;
              const voices    = speechSynthesis.getVoices();
              const preferred = voices.find(v => v.lang.startsWith("en") && v.name.includes("Google"))
                             || voices.find(v => v.lang.startsWith("en"));
              if (preferred) utter.voice = preferred;
              speechSynthesis.speak(utter);
            };
            if (speechSynthesis.getVoices().length > 0) doSpeak();
            else speechSynthesis.addEventListener("voiceschanged", doSpeak, { once: true });
          }, 600);
        }
      }, 3000);
    };

    window.addEventListener("portfolio:entered", onEntered, { once: true });
    return () => {
      window.removeEventListener("portfolio:entered", onEntered);
      clearTimeout(timer);
    };
  }, [dismissed]);

  // Auto-hide toast after 8 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 12000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleDismissToast = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowToast(false);
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[900] flex flex-row items-end gap-3">
      {/* Greeting toast — sits to the LEFT of the chat button */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={onClick}
            className="w-[min(320px,calc(100vw-6rem))] p-3 rounded-2xl rounded-br-sm bg-[var(--bg-surface)] border border-[var(--border)] shadow-xl shadow-black/20 cursor-pointer group"
          >
            <button
              onClick={handleDismissToast}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3 text-[var(--text-secondary)]" />
            </button>

            {/* AI indicator */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-blue)] flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">AI</span>
              </div>
              <span className="text-xs text-[var(--accent)] font-medium">Jatin&apos;s Assistant</span>
              <span className="flex gap-0.5 ml-auto">
                <span className="w-1 h-1 rounded-full bg-green-500" />
                <span className="w-1 h-1 rounded-full bg-green-500 opacity-60" />
                <span className="w-1 h-1 rounded-full bg-green-500 opacity-30" />
              </span>
            </div>

            <p className="text-xs text-[var(--text-primary)] leading-snug">
              {toastText}
            </p>

            <p className="text-[10px] text-[var(--text-secondary)] mt-1.5">
              Click to chat &rarr;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={onClick}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-blue)] text-white flex items-center justify-center shadow-lg shadow-[var(--accent)]/25"
        aria-label="Open AI chat"
      >
        <MessageCircle className="w-6 h-6" />
        {/* Ping */}
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[var(--bg)]" />
      </motion.button>
    </div>
  );
}
