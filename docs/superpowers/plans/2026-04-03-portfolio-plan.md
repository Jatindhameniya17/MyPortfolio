# Jatin Dhameniya Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bold, creative personal portfolio website for Jatin Dhameniya with 3D interactive hero, GSAP scroll animations, bento grid layouts, AI chatbot, and contact form.

**Architecture:** Single-page Next.js 15 App Router site. All content sections render on `page.tsx`. Two API routes handle AI chat (`/api/chat`) and contact form (`/api/contact`). 3D elements lazy-loaded via dynamic imports. Theme state managed via CSS variables + localStorage. Smooth scroll via Lenis integrated with GSAP ScrollTrigger.

**Tech Stack:** Next.js 15, Tailwind CSS v4, GSAP + ScrollTrigger, Framer Motion, React Three Fiber + Drei, Lenis, Resend (email), Claude/OpenAI API (chatbot)

**Spec:** `docs/superpowers/specs/2026-04-03-portfolio-design.md`

---

## Phase 1: Project Scaffolding & Global Setup

### Task 1: Scaffold Next.js project and install dependencies

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create Next.js project**

```bash
cd "C:/Users/jaiprakash dhameniya/Desktop"
npx create-next-app@latest jatin-portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Expected: Project created at `Desktop/jatin-portfolio` with Next.js 15, Tailwind v4, TypeScript.

- [ ] **Step 2: Install animation and 3D dependencies**

```bash
cd "C:/Users/jaiprakash dhameniya/Desktop/jatin-portfolio"
npm install gsap @gsap/react lenis framer-motion @react-three/fiber @react-three/drei three
npm install -D @types/three
```

- [ ] **Step 3: Install utility dependencies**

```bash
npm install clsx tailwind-merge lucide-react
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000`, default Next.js page renders.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 project with animation and 3D deps"
```

---

### Task 2: Configure fonts, theme CSS variables, and globals

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create utility helper**

Create `src/lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Set up globals.css with theme variables and grain texture**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --bg: #fafafa;
  --bg-surface: #ffffff;
  --border: #e5e5e5;
  --accent: #ff6b35;
  --accent-secondary: #6c5ce7;
  --text-primary: #111111;
  --text-secondary: #666666;
}

.dark {
  --bg: #0f0f14;
  --bg-surface: #1a1a24;
  --border: #2a2a3a;
  --accent: #ff6b35;
  --accent-secondary: #6c5ce7;
  --text-primary: #f5f5f5;
  --text-secondary: #a0a0b0;
}

body {
  background-color: var(--bg);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Grain texture overlay */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--bg);
}
::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 4px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Selection color */
::selection {
  background-color: var(--accent);
  color: white;
}
```

- [ ] **Step 3: Set up layout.tsx with fonts and metadata**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-clash",
});

export const metadata: Metadata = {
  title: "Jatin Dhameniya | Full-Stack Developer",
  description:
    "Portfolio of Jatin Dhameniya — Full-Stack Developer, AI/ML Enthusiast, AWS Certified. B.Tech CSE student at ABES Engineering College.",
  keywords: [
    "Jatin Dhameniya",
    "portfolio",
    "full-stack developer",
    "React",
    "Next.js",
    "AI ML",
  ],
  authors: [{ name: "Jatin Dhameniya" }],
  openGraph: {
    title: "Jatin Dhameniya | Full-Stack Developer",
    description:
      "Full-Stack Developer, AI/ML Enthusiast, AWS Certified.",
    url: "https://jatindhameniya.vercel.app",
    siteName: "Jatin Dhameniya",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${clashDisplay.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Download Clash Display font files**

Download Clash Display from https://www.fontshare.com/fonts/clash-display and place these files:

```bash
mkdir -p public/fonts
# Place ClashDisplay-Bold.woff2, ClashDisplay-Semibold.woff2, ClashDisplay-Medium.woff2
# in public/fonts/
```

Note: The agent should download these from Fontshare (free, open license). If unavailable, use Space Grotesk from Google Fonts as fallback:

```tsx
// Fallback in layout.tsx if Clash Display unavailable:
import { Space_Grotesk } from "next/font/google";
const clashDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-clash",
  weight: ["500", "600", "700"],
});
```

- [ ] **Step 5: Create a minimal page.tsx**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-6xl font-bold font-[family-name:var(--font-clash)] text-[var(--accent)]">
          JATIN DHAMENIYA
        </h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 6: Verify fonts and theme render correctly**

Run `npm run dev`, open `http://localhost:3000`. Verify:
- Dark background (`#0f0f14`)
- "JATIN DHAMENIYA" in bold accent orange
- Grain texture overlay barely visible
- Custom scrollbar (if page is tall enough)

- [ ] **Step 7: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/app/page.tsx src/lib/utils.ts public/fonts/
git commit -m "feat: configure fonts, theme variables, grain texture, and utility helpers"
```

---

### Task 3: Set up data files

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/timeline.ts`
- Create: `src/data/resume-context.ts`

- [ ] **Step 1: Create projects data**

Create `src/data/projects.ts`:

```typescript
export interface Project {
  title: string;
  description: string;
  bullets: string[];
  tech: string[];
  github?: string;
  live?: string;
  image: string;
}

export const projects: Project[] = [
  {
    title: "AAE Exercise Web App",
    description:
      "A production-grade fitness exercise application with intelligent API caching and responsive design.",
    bullets: [
      "Built with centralized API layer, cache-first strategy, and automatic rate-limit handling using exponential backoff retry logic",
      "Integrated ExerciseDB API with intelligent caching, response normalization, and zero duplicate API calls",
      "Created responsive UI with Material UI and React Router enabling seamless multi-page experience",
    ],
    tech: ["ReactJS", "React Router", "Material UI", "ExerciseDB API", "YouTube API"],
    github: "https://github.com/Jatindhameniya17/AAE-Exercise-web-app",
    image: "/images/projects/aae-exercise.png",
  },
  {
    title: "Contact Manager Website",
    description:
      "A fully responsive CRUD contact management application with persistent storage and real-time search.",
    bullets: [
      "Built a fully responsive CRUD application with add, edit, delete, and search functionality using React controlled components",
      "Implemented persistent data storage using LocalStorage ensuring contacts remain saved across browser sessions",
      "Designed responsive UI using Bootstrap and CSS3 that works seamlessly across all devices with real-time search filtering",
    ],
    tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    github: "https://github.com/Jatindhameniya17/Contact-Manager",
    image: "/images/projects/contact-manager.png",
  },
];
```

- [ ] **Step 2: Create skills data**

Create `src/data/skills.ts`:

```typescript
export interface Skill {
  name: string;
  icon: string; // lucide icon name or devicon class
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "C++", icon: "cplusplus" },
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "javascript" },
      { name: "SQL", icon: "database" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "ReactJS", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS (EC2, S3)", icon: "aws" },
      { name: "Docker", icon: "docker" },
      { name: "CI/CD", icon: "git-branch" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "code" },
      { name: "Linux", icon: "terminal" },
      { name: "IntelliJ IDEA", icon: "code-2" },
    ],
  },
];
```

- [ ] **Step 3: Create timeline data**

Create `src/data/timeline.ts`:

```typescript
export interface TimelineEntry {
  type: "experience" | "education";
  title: string;
  organization: string;
  period: string;
  description?: string;
  bullets?: string[];
  tags?: string[];
  grade?: string;
}

export const timelineEntries: TimelineEntry[] = [
  {
    type: "experience",
    title: "Software Developer Intern",
    organization: "Skillmind Software Limited",
    period: "Jun 2025 - Aug 2025",
    bullets: [
      "Developed responsive UI components in ReactJS improving performance and user experience",
      "Contributed to ML modules for predictive analytics and automation",
      "Integrated REST APIs ensuring seamless data flow between frontend and backend",
      "Collaborated with cross-functional team using Git and agile workflows",
      "Participated in code reviews and testing procedures for high-quality applications",
    ],
    tags: ["React", "REST APIs", "ML", "Git", "Agile"],
  },
  {
    type: "education",
    title: "B.Tech in CSE (AI & ML)",
    organization: "ABES Engineering College",
    period: "2022 - 2026",
    grade: "75.92%",
  },
  {
    type: "education",
    title: "Class XII (PCM)",
    organization: "Jawahar Navodaya Vidyalaya",
    period: "2020 - 2021",
    grade: "90%",
  },
  {
    type: "education",
    title: "Class X",
    organization: "St. Mary's School",
    period: "2018 - 2019",
    grade: "85.5%",
  },
];
```

- [ ] **Step 4: Create resume context for AI chatbot**

Create `src/data/resume-context.ts`:

```typescript
export const RESUME_SYSTEM_PROMPT = `You are an AI assistant embedded in Jatin Dhameniya's portfolio website. Answer questions about Jatin in a friendly, conversational, and factual tone. Only answer based on the information below. If you don't know something, say so honestly.

## About Jatin Dhameniya
- Final-year B.Tech student in Computer Science & Engineering (AI & ML) at ABES Engineering College (2022-2026), scoring 75.92%
- Phone: +91-8707684171
- Email: jatindhameniya13@gmail.com
- LinkedIn: linkedin.com/in/jatin-dhameniya-044417264
- GitHub: github.com/Jatindhameniya17

## Education
- ABES Engineering College (2022-2026): B.Tech CSE (AI & ML) — 75.92%
- Jawahar Navodaya Vidyalaya (2020-2021): Class XII (PCM) — 90%
- St. Mary's School (2018-2019): Class X — 85.5%

## Experience
- Software Developer Intern at Skillmind Software Limited (Jun 2025 - Aug 2025)
  - Developed responsive UI components in ReactJS
  - Contributed to ML modules for predictive analytics and automation
  - Integrated REST APIs for seamless frontend-backend data flow
  - Used Git for version control and followed agile workflows
  - Participated in code reviews and testing procedures

## Projects
1. AAE Exercise Web App: Production-grade React app with centralized API layer, cache-first strategy, ExerciseDB + YouTube API integration, Material UI, React Router
2. Contact Manager Website: Full CRUD React app with LocalStorage persistence, Bootstrap responsive UI, real-time search filtering

## Skills
- Languages: C++, Python, HTML, CSS, JavaScript, SQL
- Frameworks: ReactJS, NodeJS, MongoDB
- Cloud & DevOps: AWS (EC2, S3), Docker, CI/CD concepts
- Tools: Git, GitHub, VS Code, IntelliJ IDEA, Linux
- Coursework: DSA, DBMS, OS, OOPS, Web Development
- Soft Skills: Team Leadership, Cross-functional Collaboration, Agile Development

## Certifications
- AWS Cloud Practitioner Essentials (AWS Training & Certification)

## Volunteering
- Ardema (The Autocrat Society): Member, contributed to technical discussions and events
- HUHC (NGO): Volunteer, taught underprivileged children weekly focusing on education and personal development

Keep responses concise (2-4 sentences). Be enthusiastic but professional.`;
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add portfolio data files (projects, skills, timeline, resume context)"
```

---

## Phase 2: UI Primitives & Hooks

### Task 4: Theme toggle hook and component

**Files:**
- Create: `src/hooks/useTheme.ts`
- Create: `src/components/ui/ThemeToggle.tsx`

- [ ] **Step 1: Create useTheme hook**

Create `src/hooks/useTheme.ts`:

```typescript
"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = stored || "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return { theme, toggleTheme };
}
```

- [ ] **Step 2: Create ThemeToggle component**

Create `src/components/ui/ThemeToggle.tsx`:

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full hover:bg-[var(--bg-surface)] transition-colors"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <Moon className="w-5 h-5 text-[var(--text-primary)]" />
        ) : (
          <Sun className="w-5 h-5 text-[var(--text-primary)]" />
        )}
      </motion.div>
    </button>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useTheme.ts src/components/ui/ThemeToggle.tsx
git commit -m "feat: add dark/light theme toggle with localStorage persistence"
```

---

### Task 5: Reusable UI primitives (BentoCard, MagneticButton, TypeWriter, TiltCard)

**Files:**
- Create: `src/components/ui/BentoCard.tsx`
- Create: `src/components/ui/MagneticButton.tsx`
- Create: `src/components/ui/TypeWriter.tsx`
- Create: `src/components/ui/TiltCard.tsx`

- [ ] **Step 1: Create BentoCard**

Create `src/components/ui/BentoCard.tsx`:

```tsx
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
```

- [ ] **Step 2: Create MagneticButton**

Create `src/components/ui/MagneticButton.tsx`:

```tsx
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: boolean;
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const Component = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <Component
        href={href}
        download={download || undefined}
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all",
          className
        )}
      >
        {children}
      </Component>
    </motion.div>
  );
}
```

- [ ] **Step 3: Create TypeWriter**

Create `src/components/ui/TypeWriter.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";

interface TypeWriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function TypeWriter({
  words,
  className,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseTime = 2000,
}: TypeWriterProps) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.substring(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setText(currentWord.substring(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse text-[var(--accent)]">|</span>
    </span>
  );
}
```

- [ ] **Step 4: Create TiltCard**

Create `src/components/ui/TiltCard.tsx`:

```tsx
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
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
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI primitives (BentoCard, MagneticButton, TypeWriter, TiltCard)"
```

---

### Task 6: Custom cursor and smooth scroll hooks

**Files:**
- Create: `src/components/ui/CustomCursor.tsx`
- Create: `src/hooks/useSmoothScroll.ts`
- Create: `src/hooks/useScrollAnimation.ts`

- [ ] **Step 1: Create CustomCursor**

Create `src/components/ui/CustomCursor.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const size = useMotionValue(8);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const springSize = useSpring(size, { stiffness: 300, damping: 20 });

  const isTouch = useRef(false);

  useEffect(() => {
    // Detect touch device
    isTouch.current = "ontouchstart" in window;
    if (isTouch.current) return;

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

  // Don't render on touch devices (SSR safe)
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

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
```

- [ ] **Step 2: Create useSmoothScroll hook**

Create `src/hooks/useSmoothScroll.ts`:

```typescript
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
```

- [ ] **Step 3: Create useScrollAnimation hook**

Create `src/hooks/useScrollAnimation.ts`:

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight";
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const { animation = "fadeUp", delay = 0, duration = 0.8 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { opacity: 0, y: 60 },
      fadeIn: { opacity: 0 },
      slideLeft: { opacity: 0, x: -80 },
      slideRight: { opacity: 0, x: 80 },
    };

    gsap.set(el, animations[animation]);

    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [animation, delay, duration]);

  return ref;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/CustomCursor.tsx src/hooks/
git commit -m "feat: add custom cursor, smooth scroll (Lenis), and GSAP scroll animation hook"
```

---

## Phase 3: Layout Components

### Task 7: Page Loader

**Files:**
- Create: `src/components/layout/PageLoader.tsx`

- [ ] **Step 1: Create PageLoader component**

Create `src/components/layout/PageLoader.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show loader on first visit
    if (sessionStorage.getItem("loaded")) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("loaded", "true");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-[var(--bg)]"
        >
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--accent)"
              fontSize="36"
              fontWeight="700"
              fontFamily="var(--font-clash), sans-serif"
              initial={{ strokeDasharray: 200, strokeDashoffset: 200 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              stroke="var(--accent)"
              strokeWidth="1"
            >
              JD
            </motion.text>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/PageLoader.tsx
git commit -m "feat: add animated page loader with session-based skip"
```

---

### Task 8: Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Create Navbar component**

Create `src/components/layout/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300",
          scrolled
            ? "py-3 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]"
            : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-2xl font-bold font-[family-name:var(--font-clash)] text-[var(--accent)]"
          >
            JD
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/Jatin_Dhameniya_Resume.pdf"
              download
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-[var(--text-primary)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--text-primary)]" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-[var(--bg)] pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="text-2xl font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/Jatin_Dhameniya_Resume.pdf"
                download
                className="inline-flex items-center gap-2 text-xl text-[var(--accent)]"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add glassmorphism navbar with mobile drawer and resume download"
```

---

### Task 9: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer component**

Create `src/components/layout/Footer.tsx`:

```tsx
"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Jatindhameniya17", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jatin-dhameniya-044417264/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:jatindhameniya13@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-secondary)]">
          Designed & Built by{" "}
          <span className="text-[var(--accent)] font-semibold">
            Jatin Dhameniya
          </span>
        </p>

        <p className="text-xs text-[var(--text-secondary)]">
          Made with Next.js, Tailwind CSS, GSAP & Three.js
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="p-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text-secondary)] transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add footer with social links and back-to-top button"
```

---

## Phase 4: Content Sections

### Task 10: Hero Section with 3D Photo Card

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/three/PhotoCard3D.tsx`
- Create: `src/components/three/Particles.tsx`

- [ ] **Step 1: Create Particles component**

Create `src/components/three/Particles.tsx`:

```tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Particles({ count = 50 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.05;
      mesh.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ff6b35"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
```

- [ ] **Step 2: Create PhotoCard3D component**

Create `src/components/three/PhotoCard3D.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Particles } from "./Particles";

function PhotoPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/images/jatin-photo.jpg");
  const { pointer } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * 0.3,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -pointer.y * 0.2,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.4, 3, 1, 1]} />
      <meshStandardMaterial map={texture} />
      {/* Glowing border effect */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.55, 3.15, 1, 1]} />
        <meshStandardMaterial
          color="#ff6b35"
          emissive="#ff6b35"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </mesh>
  );
}

export function PhotoCard3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <PhotoPlane />
        <Particles count={40} />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 3: Create Hero section**

Create `src/components/sections/Hero.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { Github, Linkedin, Mail } from "lucide-react";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Lazy load 3D to improve initial load
const PhotoCard3D = dynamic(
  () => import("@/components/three/PhotoCard3D").then((m) => ({ default: m.PhotoCard3D })),
  { ssr: false, loading: () => <div className="w-full h-[500px] bg-[var(--bg-surface)] rounded-2xl animate-pulse" /> }
);

const subtitles = [
  "Full-Stack Developer",
  "AI/ML Enthusiast",
  "AWS Certified",
  "Open Source Contributor",
];

const socials = [
  { icon: Github, href: "https://github.com/Jatindhameniya17", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jatin-dhameniya-044417264/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:jatindhameniya13@gmail.com", label: "Email" },
];

export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
      });

      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll(".char");
        gsap.from(chars, {
          opacity: 0,
          y: 80,
          rotateX: -90,
          stagger: 0.04,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(1.7)",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const nameText = "JATIN DHAMENIYA";

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent)] rounded-full opacity-10 blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent-secondary)] rounded-full opacity-10 blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        {/* Left — Text */}
        <div>
          <p
            ref={labelRef}
            className="text-lg text-[var(--text-secondary)] mb-2"
          >
            Hi, I&apos;m
          </p>

          <h1
            ref={nameRef}
            className="text-5xl sm:text-6xl lg:text-[100px] font-bold font-[family-name:var(--font-clash)] leading-none mb-4"
          >
            {nameText.split("").map((char, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <div className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-8 h-8">
            <TypeWriter words={subtitles} />
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <MagneticButton
              href="#projects"
              className="bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              href="/Jatin_Dhameniya_Resume.pdf"
              download
              className="border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
            >
              Download Resume
            </MagneticButton>
          </div>

          <div className="flex gap-5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                data-cursor="pointer"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Right — 3D Photo */}
        <div className="hidden md:block">
          <PhotoCard3D />
        </div>

        {/* Mobile fallback photo */}
        <div className="md:hidden flex justify-center">
          <div className="relative w-48 h-60 rounded-2xl overflow-hidden border-2 border-[var(--accent)]">
            <img
              src="/images/jatin-photo.jpg"
              alt="Jatin Dhameniya"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify hero renders**

Run `npm run dev`. Temporarily update `page.tsx` to include the Hero:

```tsx
import { Hero } from "@/components/sections/Hero";
export default function Home() {
  return <main><Hero /></main>;
}
```

Verify: Name animates in, typewriter works, 3D photo card renders and tilts with mouse, gradient blobs visible.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/three/
git commit -m "feat: add hero section with 3D photo card, GSAP name animation, and typewriter"
```

---

### Task 11: About Section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create About component**

Create `src/components/sections/About.tsx`:

```tsx
"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase, Cloud, FolderOpen, Heart } from "lucide-react";

const stats = [
  { icon: FolderOpen, label: "2+ Projects", color: "text-blue-400" },
  { icon: Briefcase, label: "1 Internship", color: "text-green-400" },
  { icon: Cloud, label: "AWS Certified", color: "text-yellow-400" },
  { icon: Heart, label: "HUHC Volunteer", color: "text-pink-400" },
];

export function About() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ animation: "fadeUp" });
  const textRef = useScrollAnimation<HTMLDivElement>({ animation: "fadeUp", delay: 0.2 });

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-12 items-start">
        {/* Left — Bio */}
        <div>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-clash)] mb-6"
          >
            About{" "}
            <span className="text-[var(--accent)]">Me</span>
          </h2>

          <div ref={textRef} className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              I&apos;m a final-year B.Tech student in Computer Science &
              Engineering (AI &amp; ML) at ABES Engineering College. I love
              building full-stack web applications that are fast, responsive, and
              solve real problems.
            </p>
            <p>
              During my internship at Skillmind Software Limited, I developed
              production-ready ReactJS components, integrated REST APIs, and
              contributed to ML modules for predictive analytics — all while
              working in an agile team environment.
            </p>
            <p>
              Beyond code, I volunteer at HUHC NGO, teaching underprivileged
              children weekly. I&apos;m also an active member of Ardema — The
              Autocrat Society, contributing to technical discussions and
              workshops at my college.
            </p>
          </div>
        </div>

        {/* Right — Bento Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <BentoCard key={stat.label} delay={i * 0.1}>
              <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
              <p className="font-semibold text-[var(--text-primary)]">
                {stat.label}
              </p>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: add About section with bio and bento stat cards"
```

---

### Task 12: Skills Section

**Files:**
- Create: `src/components/sections/Skills.tsx`

- [ ] **Step 1: Create Skills component**

Create `src/components/sections/Skills.tsx`:

```tsx
"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { skillCategories } from "@/data/skills";
import {
  Code2,
  Database,
  Cloud,
  Terminal,
  GitBranch,
  Github,
  Braces,
  FileCode,
  Cpu,
  Server,
  Container,
  MonitorSmartphone,
} from "lucide-react";

// Map icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  cplusplus: Code2,
  python: FileCode,
  javascript: Braces,
  database: Database,
  html5: MonitorSmartphone,
  css3: MonitorSmartphone,
  react: Cpu,
  nodejs: Server,
  mongodb: Database,
  aws: Cloud,
  docker: Container,
  "git-branch": GitBranch,
  git: GitBranch,
  github: Github,
  code: Code2,
  terminal: Terminal,
  "code-2": Code2,
};

export function Skills() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({
    animation: "slideLeft",
  });

  return (
    <section id="skills" className="py-24 px-6 bg-[var(--bg-surface)]/50">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-clash)] mb-12"
        >
          Tech{" "}
          <span className="text-[var(--accent)]">Stack</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIdx) => (
            <BentoCard key={category.title} delay={catIdx * 0.1}>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-4">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.icon] || Code2;
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center gap-3 group"
                    >
                      <Icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                      <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Skills.tsx
git commit -m "feat: add Skills section with bento grid category cards"
```

---

### Task 13: Experience & Education Timeline

**Files:**
- Create: `src/components/sections/Timeline.tsx`

- [ ] **Step 1: Create Timeline component**

Create `src/components/sections/Timeline.tsx`:

```tsx
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { timelineEntries } from "@/data/timeline";
import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export function Timeline() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({
    animation: "fadeUp",
  });

  return (
    <section id="journey" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-clash)] mb-12 text-center"
        >
          My{" "}
          <span className="text-[var(--accent)]">Journey</span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)] md:-translate-x-px" />

          {timelineEntries.map((entry, i) => {
            const isLeft = i % 2 === 0;
            const Icon =
              entry.type === "experience" ? Briefcase : GraduationCap;

            return (
              <motion.div
                key={`${entry.organization}-${entry.period}`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-start mb-12 md:mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Node */}
                <motion.div
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent)] flex items-center justify-center z-10"
                >
                  <Icon className="w-5 h-5 text-[var(--accent)]" />
                </motion.div>

                {/* Content */}
                <div
                  className={`ml-20 md:ml-0 ${
                    isLeft ? "md:pr-20 md:text-right md:w-1/2" : "md:pl-20 md:w-1/2 md:ml-auto"
                  }`}
                >
                  <span className="text-sm text-[var(--accent)] font-semibold">
                    {entry.period}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1">
                    {entry.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm">
                    {entry.organization}
                    {entry.grade && ` — ${entry.grade}`}
                  </p>

                  {entry.bullets && (
                    <ul className="mt-3 space-y-1 text-sm text-[var(--text-secondary)]">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="text-[var(--accent)] mt-1 shrink-0">
                            &bull;
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Timeline.tsx
git commit -m "feat: add animated experience/education timeline with alternating layout"
```

---

### Task 14: Projects Section

**Files:**
- Create: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Create Projects component**

Create `src/components/sections/Projects.tsx`:

```tsx
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { projects } from "@/data/projects";
import { TiltCard } from "@/components/ui/TiltCard";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

export function Projects() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({
    animation: "fadeUp",
  });

  return (
    <section id="projects" className="py-24 px-6 bg-[var(--bg-surface)]/50">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-clash)] mb-12 text-center"
        >
          My{" "}
          <span className="text-[var(--accent)]">Projects</span>
        </h2>

        <div className="space-y-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <TiltCard>
                <div
                  className={`grid md:grid-cols-2 gap-8 items-center rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 md:p-8 ${
                    i % 2 === 1 ? "md:direction-rtl" : ""
                  }`}
                >
                  {/* Project Image */}
                  <div
                    className={`rounded-xl overflow-hidden bg-[var(--bg)] aspect-video flex items-center justify-center ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <div className="text-6xl text-[var(--accent)]/20 font-bold font-[family-name:var(--font-clash)]">
                      {project.title.split(" ").map((w) => w[0]).join("")}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className={i % 2 === 1 ? "md:order-1 md:text-left" : ""}>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-4">
                      {project.description}
                    </p>

                    <ul className="space-y-2 mb-4 text-sm text-[var(--text-secondary)]">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="text-[var(--accent)] mt-0.5 shrink-0">
                            &rarr;
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        >
                          <Github className="w-5 h-5" />
                          Source Code
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl border border-dashed border-[var(--accent)]/40 bg-[var(--bg-surface)] p-12 text-center"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg text-[var(--accent)] font-semibold"
            >
              More projects in the pipeline...
            </motion.div>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Stay tuned for upcoming projects
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: add projects showcase with tilt cards and coming-soon placeholder"
```

---

### Task 15: Certifications & Volunteering Section

**Files:**
- Create: `src/components/sections/Certifications.tsx`

- [ ] **Step 1: Create Certifications component**

Create `src/components/sections/Certifications.tsx`:

```tsx
"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import { Award, Heart, Users } from "lucide-react";

export function Certifications() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Certifications */}
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
                <a
                  href="#"
                  className="inline-block mt-2 text-sm text-[var(--accent)] hover:underline"
                >
                  View Certificate &rarr;
                </a>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Volunteering */}
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
                      Member — Contributed to technical discussions, events, and
                      workshops.
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
                      Volunteer — Taught underprivileged children weekly,
                      focusing on education and personal development.
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Certifications.tsx
git commit -m "feat: add certifications and volunteering bento cards"
```

---

### Task 16: Contact Section with API Route

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create contact API route**

Create `src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, honeypot } = await req.json();

    // Honeypot spam check
    if (honeypot) {
      return NextResponse.json({ success: true }); // Silently ignore bots
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email via Resend (or log for now)
    // When Resend is configured, replace this block:
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: "jatindhameniya13@gmail.com",
          subject: `Portfolio Contact: ${name}`,
          html: `<h2>New message from portfolio</h2>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Message:</strong> ${message}</p>`,
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    } else {
      // Dev mode: log to console
      console.log("Contact form submission:", { name, email, message });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Create Contact section component**

Create `src/components/sections/Contact.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const socials = [
  {
    icon: Github,
    href: "https://github.com/Jatindhameniya17",
    label: "GitHub",
    text: "Jatindhameniya17",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/jatin-dhameniya-044417264/",
    label: "LinkedIn",
    text: "jatin-dhameniya",
  },
  {
    icon: Mail,
    href: "mailto:jatindhameniya13@gmail.com",
    label: "Email",
    text: "jatindhameniya13@gmail.com",
  },
  {
    icon: Phone,
    href: "tel:+918707684171",
    label: "Phone",
    text: "+91-8707684171",
  },
];

export function Contact() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({
    animation: "fadeUp",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          honeypot: formData.get("_hp"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-clash)] mb-12 text-center"
        >
          Let&apos;s{" "}
          <span className="text-[var(--accent)]">Connect</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot */}
            <input type="text" name="_hp" className="hidden" tabIndex={-1} autoComplete="off" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent)]/90 transition-all disabled:opacity-50"
            >
              {status === "loading" ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-red-400 text-sm">
                <XCircle className="w-4 h-4" /> Failed to send. Please try again.
              </p>
            )}
          </form>

          {/* Social Links */}
          <div className="space-y-6">
            <p className="text-[var(--text-secondary)]">
              Feel free to reach out through any of these channels. I&apos;m
              always open to discussing new opportunities, collaborations, or
              just a friendly chat about tech!
            </p>
            <div className="space-y-4">
              {socials.map(({ icon: Icon, href, label, text }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg-surface)] transition-all group"
                  data-cursor="pointer"
                >
                  <Icon className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {label}
                    </p>
                    <p className="text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {text}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Contact.tsx src/app/api/contact/route.ts
git commit -m "feat: add contact section with form, API route, and social links"
```

---

## Phase 5: AI Chatbot

### Task 17: AI Chatbot UI and API

**Files:**
- Create: `src/components/chat/ChatButton.tsx`
- Create: `src/components/chat/ChatBot.tsx`
- Create: `src/app/api/chat/route.ts`

- [ ] **Step 1: Create chat API route**

Create `src/app/api/chat/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { RESUME_SYSTEM_PROMPT } from "@/data/resume-context";

// Pre-written FAQ responses as fallback
const FAQ_RESPONSES: Record<string, string> = {
  skills:
    "Jatin is skilled in C++, Python, JavaScript, SQL, ReactJS, Node.js, MongoDB, AWS (EC2, S3), Docker, and CI/CD. He's also proficient with Git, Linux, and VS Code.",
  experience:
    "Jatin interned at Skillmind Software Limited (Jun-Aug 2025) as a Software Developer, where he built ReactJS UI components, integrated REST APIs, and contributed to ML modules for predictive analytics.",
  projects:
    "Jatin has built the AAE Exercise Web App (React + ExerciseDB API + YouTube API) and a Contact Manager Website (React CRUD app with LocalStorage). More projects are in the pipeline!",
  education:
    "Jatin is a final-year B.Tech student in CSE (AI & ML) at ABES Engineering College (75.92%). He scored 90% in Class XII and 85.5% in Class X.",
  contact:
    "You can reach Jatin at jatindhameniya13@gmail.com, +91-8707684171, or connect on LinkedIn (jatin-dhameniya-044417264) and GitHub (Jatindhameniya17).",
};

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("skill") || lower.includes("tech"))
    return FAQ_RESPONSES.skills;
  if (lower.includes("experience") || lower.includes("intern") || lower.includes("work"))
    return FAQ_RESPONSES.experience;
  if (lower.includes("project") || lower.includes("built") || lower.includes("build"))
    return FAQ_RESPONSES.projects;
  if (lower.includes("education") || lower.includes("college") || lower.includes("degree"))
    return FAQ_RESPONSES.education;
  if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("reach"))
    return FAQ_RESPONSES.contact;
  return "I can tell you about Jatin's skills, experience, projects, education, or contact info. What would you like to know?";
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Fallback to FAQ responses
      return NextResponse.json({
        response: getFallbackResponse(message),
        fallback: true,
      });
    }

    // Try Claude API first
    if (process.env.ANTHROPIC_API_KEY) {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: RESUME_SYSTEM_PROMPT,
          messages: [{ role: "user", content: message }],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({
          response: data.content[0].text,
        });
      }
    }

    // Fallback to OpenAI if Claude fails
    if (process.env.OPENAI_API_KEY) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 300,
          messages: [
            { role: "system", content: RESUME_SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({
          response: data.choices[0].message.content,
        });
      }
    }

    // All APIs failed, use fallback
    return NextResponse.json({
      response: getFallbackResponse(message),
      fallback: true,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Create ChatButton (floating trigger)**

Create `src/components/chat/ChatButton.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
}

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[900] w-14 h-14 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-lg shadow-[var(--accent)]/25"
      aria-label="Open AI chat"
    >
      <MessageCircle className="w-6 h-6" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-ping opacity-20" />
    </motion.button>
  );
}
```

- [ ] **Step 3: Create ChatBot panel**

Create `src/components/chat/ChatBot.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import { ChatButton } from "./ChatButton";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are his skills?",
  "Tell me about his experience",
  "How to contact him?",
];

const MAX_MESSAGES = 20;

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Jatin's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const messageCount = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    if (messageCount.current >= MAX_MESSAGES) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "You've reached the message limit for this session. Feel free to reach out via the contact form below!",
        },
      ]);
      return;
    }

    const userMsg: Message = { role: "user", content: text.trim() };
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
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response || data.error || "Sorry, I couldn't process that." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[950] w-[90vw] max-w-[400px] h-[500px] rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--accent)]" />
                <span className="font-semibold text-[var(--text-primary)]">
                  Ask about Jatin
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[var(--bg)] rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-[var(--accent)] text-white rounded-br-md"
                        : "bg-[var(--bg)] text-[var(--text-primary)] rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg)] px-4 py-2 rounded-2xl rounded-bl-md">
                    <span className="flex gap-1">
                      <span className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce [animation-delay:0.1s]" />
                      <span className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce [animation-delay:0.2s]" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="p-3 border-t border-[var(--border)] flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 px-4 py-2 rounded-full bg-[var(--bg)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-full bg-[var(--accent)] text-white disabled:opacity-50 transition-opacity"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/chat/ src/app/api/chat/route.ts
git commit -m "feat: add AI chatbot with Claude/OpenAI API, fallback FAQ, and rate limiting"
```

---

## Phase 6: Assembly & Polish

### Task 18: Assemble all sections in page.tsx

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update page.tsx with all sections**

Replace `src/app/page.tsx` with:

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Projects />
      <Certifications />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 2: Update layout.tsx with Navbar, Footer, ChatBot, PageLoader, CustomCursor, and SmoothScroll**

Create a client wrapper component at `src/components/layout/ClientShell.tsx`:

```tsx
"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageLoader } from "./PageLoader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ChatBot } from "@/components/chat/ChatBot";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import type { ReactNode } from "react";

export function ClientShell({ children }: { children: ReactNode }) {
  useSmoothScroll();

  return (
    <>
      <PageLoader />
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
      <ChatBot />
    </>
  );
}
```

Then update `src/app/layout.tsx` body to use it:

```tsx
// In the body of layout.tsx, wrap children:
import { ClientShell } from "@/components/layout/ClientShell";

// In the return:
<body className={`${inter.variable} ${clashDisplay.variable} font-sans antialiased`}>
  <ClientShell>{children}</ClientShell>
</body>
```

- [ ] **Step 3: Verify full page renders**

Run `npm run dev`, open `http://localhost:3000`. Verify:
- Page loader shows "JD" then fades
- Navbar appears with glassmorphism
- Hero with name animation, typewriter, 3D photo card
- All sections render in order when scrolling
- GSAP scroll animations trigger
- Custom cursor visible (desktop)
- AI chatbot button pulsing in bottom-right
- Footer with social links and back-to-top
- Dark/light toggle works

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx src/components/layout/ClientShell.tsx
git commit -m "feat: assemble all sections into complete portfolio page"
```

---

### Task 19: Add static assets (photo, resume PDF, project images)

**Files:**
- Create: `public/images/jatin-photo.jpg`
- Create: `public/Jatin_Dhameniya_Resume.pdf`
- Create: `public/images/projects/` (placeholder images)

- [ ] **Step 1: Copy photo and resume**

```bash
cp "C:/Users/jaiprakash dhameniya/Documents/jatin documents/Placement/piclumen-1744033346326.png" "C:/Users/jaiprakash dhameniya/Desktop/jatin-portfolio/public/images/jatin-photo.jpg"
cp "C:/Users/jaiprakash dhameniya/Documents/jatin documents/Placement/Jatindevopsresume.pdf" "C:/Users/jaiprakash dhameniya/Desktop/jatin-portfolio/public/Jatin_Dhameniya_Resume.pdf"
```

- [ ] **Step 2: Create project image placeholders**

```bash
mkdir -p "C:/Users/jaiprakash dhameniya/Desktop/jatin-portfolio/public/images/projects"
```

Note: Project screenshots should be captured from live projects or created as mockups. For now, the Projects component renders initials as placeholders.

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "feat: add photo, resume PDF, and project image placeholders"
```

---

### Task 20: Add SEO (JSON-LD, sitemap config) and environment setup

**Files:**
- Modify: `src/app/layout.tsx` (add JSON-LD)
- Create: `.env.local` (template)

- [ ] **Step 1: Add JSON-LD structured data to layout.tsx**

Add inside the `<body>` tag in `layout.tsx`, before `<ClientShell>`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Jatin Dhameniya",
      url: "https://jatindhameniya.vercel.app",
      jobTitle: "Full-Stack Developer",
      email: "jatindhameniya13@gmail.com",
      telephone: "+91-8707684171",
      sameAs: [
        "https://github.com/Jatindhameniya17",
        "https://www.linkedin.com/in/jatin-dhameniya-044417264/",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "ABES Engineering College",
      },
    }),
  }}
/>
```

- [ ] **Step 2: Create .env.local template**

Create `.env.local`:

```
# AI Chatbot (optional - falls back to FAQ responses if not set)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=

# Contact form email (optional - logs to console if not set)
RESEND_API_KEY=
```

Add to `.gitignore`:

```
.env.local
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx .gitignore
git commit -m "feat: add JSON-LD structured data and environment template"
```

---

### Task 21: Final build verification and responsive testing

- [ ] **Step 1: Run production build**

```bash
cd "C:/Users/jaiprakash dhameniya/Desktop/jatin-portfolio"
npm run build
```

Expected: Build succeeds with no errors. Fix any TypeScript or build errors.

- [ ] **Step 2: Run production server and test**

```bash
npm start
```

Open `http://localhost:3000` and verify:

1. Page loader animates and disappears
2. Hero: name animation, typewriter, 3D card (mouse interaction), gradient blobs
3. Scroll: all sections animate in with GSAP
4. About: bio text + 4 bento stat cards
5. Skills: 4 category bento cards with icons
6. Timeline: alternating entries with animated nodes
7. Projects: 2 project cards with tilt effect + coming soon card
8. Certifications: AWS badge + volunteering info
9. Contact: form submits (check console for log), social links work
10. AI Chatbot: opens, suggested questions work, responses appear
11. Dark/light toggle: all sections adapt correctly
12. Navbar: glassmorphism on scroll, resume download works
13. Footer: social links, back-to-top button
14. Custom cursor: dot expands on hover (desktop only)

- [ ] **Step 3: Test responsive breakpoints**

Test at these widths (browser DevTools):
- **1440px (desktop):** Full layout, 3D card, side-by-side grids
- **768px (tablet):** 2-column bento, smaller elements
- **375px (mobile):** Single column, hamburger nav, static photo (no 3D), stacked timeline, full-width chat

- [ ] **Step 4: Commit final fixes**

```bash
git add -A
git commit -m "chore: fix build issues and verify responsive layout"
```

---

### Task 22: Deploy to Vercel

- [ ] **Step 1: Initialize git remote (if not already)**

```bash
cd "C:/Users/jaiprakash dhameniya/Desktop/jatin-portfolio"
git remote add origin https://github.com/Jatindhameniya17/jatin-portfolio.git
git push -u origin main
```

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --prod
```

Or connect the GitHub repo to Vercel dashboard at vercel.com.

- [ ] **Step 3: Set environment variables on Vercel**

In Vercel dashboard > Project Settings > Environment Variables, add:
- `ANTHROPIC_API_KEY` (for AI chatbot, optional)
- `RESEND_API_KEY` (for contact form emails, optional)

- [ ] **Step 4: Verify production deployment**

Open the Vercel URL and run through the same verification checklist from Task 21 Step 2.

---

## Summary

| Phase | Tasks | What it delivers |
|-------|-------|------------------|
| 1: Scaffolding | Tasks 1-3 | Working Next.js project with fonts, theme, data |
| 2: UI Primitives | Tasks 4-6 | Reusable animated components and hooks |
| 3: Layout | Tasks 7-9 | Page loader, navbar, footer |
| 4: Content Sections | Tasks 10-16 | Hero (3D), About, Skills, Timeline, Projects, Certs, Contact |
| 5: AI Chatbot | Task 17 | Chat UI + API with fallback FAQ |
| 6: Assembly & Polish | Tasks 18-22 | Full page, assets, SEO, build, deploy |
