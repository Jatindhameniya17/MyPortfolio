"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Sparkles, Bot, User, Volume2, VolumeX } from "lucide-react";
import { ChatButton } from "./ChatButton";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  { label: "Skills & Tech Stack", query: "What technologies does Jatin know?" },
  { label: "Work Experience", query: "Tell me about his internship experience" },
  { label: "DSA & Problem Solving", query: "How many DSA problems has he solved?" },
  { label: "Why Hire Jatin?", query: "Why should I hire Jatin?" },
  { label: "Availability", query: "Is Jatin available for immediate joining?" },
  { label: "Projects Built", query: "What projects has Jatin built?" },
];

const MAX_MESSAGES = 20;

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-blue)] flex items-center justify-center shrink-0">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-[var(--bg)] px-4 py-3 rounded-2xl rounded-bl-md">
        <span className="flex gap-1 items-center">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 bg-[var(--accent)] rounded-full"
          />
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 bg-[var(--accent)] rounded-full"
          />
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 bg-[var(--accent)] rounded-full"
          />
        </span>
      </div>
    </div>
  );
}

function MessageBubble({ msg, index }: { msg: Message; index: number }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
        isUser
          ? "bg-[var(--bg)] border border-[var(--border)]"
          : "bg-gradient-to-br from-[var(--accent)] to-[var(--accent-blue)]"
      }`}>
        {isUser ? (
          <User className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-white" />
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed ${
        isUser
          ? "bg-[var(--accent)] text-white rounded-2xl rounded-br-md"
          : "bg-[var(--bg)] text-[var(--text-primary)] rounded-2xl rounded-bl-md border border-[var(--border)]"
      }`}>
        {msg.content}
      </div>
    </motion.div>
  );
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageCount = useRef(0);

  const speak = useCallback((text: string) => {
    if (!voiceOn || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();

    const doSpeak = () => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate   = 1;
      utter.pitch  = 1;
      utter.volume = 1;
      const voices    = speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith("en") && v.name.includes("Google"))
                     || voices.find(v => v.lang.startsWith("en"));
      if (preferred) utter.voice = preferred;
      speechSynthesis.speak(utter);
    };

    // Chrome loads voices asynchronously — wait if not ready yet
    if (speechSynthesis.getVoices().length > 0) {
      setTimeout(doSpeak, 80);
    } else {
      speechSynthesis.addEventListener("voiceschanged", doSpeak, { once: true });
    }
  }, [voiceOn]);

  // Auto-type welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content: "Hey there! I'm Jatin's AI-powered assistant. I know everything about his skills, projects, experience, and availability. What would you like to know?",
            timestamp: new Date(),
          },
        ]);
        setShowWelcome(false);
        speak("Hey there! I'm Jatin's AI-powered assistant. What would you like to know?");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    if (messageCount.current >= MAX_MESSAGES) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "You've reached the message limit. Feel free to reach out directly at jatindhameniya13@gmail.com or use the contact form!",
          timestamp: new Date(),
        },
      ]);
      return;
    }

    setShowWelcome(false);
    const userMsg: Message = { role: "user", content: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    messageCount.current++;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });

      const data = await res.json();
      const reply = data.response || data.error || "Sorry, I couldn't process that.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, timestamp: new Date() },
      ]);
      speak(reply);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, speak]);

  return (
    <>
      {!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-[950] w-[92vw] max-w-[360px] rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-2xl shadow-black/30 flex flex-col overflow-hidden"
            style={{ height: "min(500px, calc(100vh - 6rem))" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--bg-surface)]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-blue)] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[var(--bg-surface)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Jatin&apos;s AI Assistant</p>
                  <p className="text-[10px] text-green-400">Online &bull; Powered by AI</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setVoiceOn(!voiceOn);
                    if (voiceOn) speechSynthesis.cancel();
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${voiceOn ? "text-[var(--accent)] bg-[var(--accent)]/10" : "text-[var(--text-secondary)] hover:bg-[var(--bg)]"}`}
                  aria-label={voiceOn ? "Mute voice" : "Enable voice"}
                  title={voiceOn ? "Voice on — click to mute" : "Voice off — click to enable"}
                >
                  {voiceOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    speechSynthesis.cancel();
                    setIsOpen(false);
                  }}
                  className="p-1.5 hover:bg-[var(--bg)] rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-[var(--text-secondary)]" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Welcome animation */}
              {showWelcome && messages.length === 0 && (
                <TypingIndicator />
              )}

              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} index={i} />
              ))}

              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            {messages.length <= 1 && !isLoading && (
              <div className="px-4 pb-3">
                <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-2">Quick questions</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map(({ label, query }) => (
                    <button
                      key={label}
                      onClick={() => sendMessage(query)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="p-3 border-t border-[var(--border)] bg-[var(--bg-surface)]"
            >
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects, hiring..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-[var(--accent)] text-white disabled:opacity-30 transition-opacity hover:opacity-90"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-[var(--text-secondary)]/50 text-center mt-2">
                AI-powered &bull; Responses based on Jatin&apos;s resume
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
