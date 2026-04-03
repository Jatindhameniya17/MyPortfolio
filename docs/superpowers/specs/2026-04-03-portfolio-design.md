# Jatin Dhameniya — Personal Portfolio Website Design Spec

**Date:** 2026-04-03
**Status:** Approved
**Approach:** The Cinematic Scroller — scroll-driven storytelling + 3D hero + bento grid + AI chatbot

---

## Context

Jatin Dhameniya is a final-year B.Tech CSE (AI & ML) student at ABES Engineering College (2022-2026) looking to build a personal portfolio website that serves recruiters, startup founders, and the tech community. The portfolio needs to stand out with modern animation techniques (GSAP, Framer Motion, Three.js), a bold & creative visual style with bento grid layouts, and advanced features like an AI chatbot and 3D interactive elements. This is Jatin's primary online presence for job hunting, freelance opportunities, and personal brand building.

---

## Personal Data

| Field | Value |
|-------|-------|
| **Name** | Jatin Dhameniya |
| **Phone** | +91-8707684171 |
| **Email** | jatindhameniya13@gmail.com |
| **LinkedIn** | https://www.linkedin.com/in/jatin-dhameniya-044417264/ |
| **GitHub** | https://github.com/Jatindhameniya17 |
| **Photo** | Available (to be added to `/public/images/`) |
| **Resume PDF** | To be placed at `/public/Jatin_Dhameniya_Resume.pdf` |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 15 (App Router) | SSR/SSG, routing, SEO, API routes |
| Styling | Tailwind CSS v4 | Utility-first responsive design |
| Timeline Animation | GSAP + ScrollTrigger | Scroll-driven animations, pinned sections |
| React Animation | Framer Motion | Component mount/unmount, layout animations, hover effects |
| 3D | React Three Fiber + Drei | 3D photo card in hero |
| Smooth Scroll | Lenis | Buttery smooth scrolling |
| Contact Form | Resend or EmailJS | Email delivery |
| AI Chatbot | Claude API (via Next.js API route) | Resume-aware chatbot |
| Fonts | Clash Display (headings) + Inter/Space Grotesk (body) | Bold creative typography |
| Deployment | Vercel (free tier) | Edge deployment |

---

## Visual Style

- **Theme:** Bold & Creative
- **Color palette (dark mode default):**
  - Background: `#0f0f14` (deep dark)
  - Surface/cards: `#1a1a24` with subtle border `#2a2a3a`
  - Primary accent: `#ff6b35` (bold orange)
  - Secondary accent: `#6c5ce7` (purple)
  - Text primary: `#f5f5f5`
  - Text secondary: `#a0a0b0`
- **Color palette (light mode):**
  - Background: `#fafafa`
  - Surface/cards: `#ffffff` with border `#e5e5e5`
  - Accents: same as dark
  - Text primary: `#111111`
  - Text secondary: `#666666`
- **Typography:** Oversized headings (80-120px hero), Clash Display bold
- **Texture:** CSS grain/noise overlay on backgrounds
- **Effects:** Custom cursor (dot + expand), magnetic hover on buttons, glassmorphism navbar

---

## Sections

### 1. Page Loader
- Animated "JD" monogram logo centered on screen
- Fades out after 1.5-2s, reveals hero section
- Uses Framer Motion for the exit animation

### 2. Navigation Bar (fixed)
- **Left:** "JD" logo monogram (accent color, links to top)
- **Center/Right:** About | Skills | Experience | Projects | Contact
- **Far Right:** Dark/Light toggle icon + "Resume" download button
- **Behavior:** Glassmorphism blur background (`backdrop-filter: blur(10px)`), shrinks slightly on scroll
- **Mobile:** Hamburger menu with slide-in drawer

### 3. Hero Section (100vh)
- **Left side (60%):**
  - Small label: "Hi, I'm" (fade-in, 0.3s delay)
  - Giant name: "JATIN DHAMENIYA" — Clash Display, 100-120px, staggered per-letter animation (GSAP)
  - Typed subtitle: Typewriter effect cycling through:
    - "Full-Stack Developer"
    - "AI/ML Enthusiast"
    - "AWS Certified"
    - "Open Source Contributor"
  - CTA buttons: "View My Work" (scroll to projects, accent bg) + "Download Resume" (outline style)
  - Social icons row: GitHub, LinkedIn, Email — magnetic hover effect (GSAP)
- **Right side (40%):**
  - **3D Photo Card:** Jatin's portrait on a 3D card using React Three Fiber
    - Card tilts/rotates following mouse position (parallax depth)
    - Glowing accent-colored border
    - Soft particle effects orbiting around the card (Drei Points)
    - On mobile: static photo with CSS tilt on device gyroscope or simple hover
- **Background:** `#0f0f14` base + grain texture overlay + 2-3 gradient mesh blobs (accent colors, blurred, low opacity)
- **Custom cursor:** Small dot, expands to circle on hover over interactive elements

### 4. About Me Section
- **Scroll trigger:** Fade-up animation as section enters viewport
- **Layout:** Split — text (60%) left, bento stats (40%) right
- **Left — Bio:**
  - Heading: "About Me" (large, accent underline)
  - 2-3 paragraphs covering:
    - B.Tech CSE (AI & ML) student at ABES Engineering College
    - Passion for full-stack development and cloud technologies
    - Internship at Skillmind Software Limited
    - Volunteering at HUHC NGO — teaching underprivileged children
    - Member of Ardema — The Autocrat Society
- **Right — Bento mini-grid (2x2):**
  - Card 1: "2+ Projects" — folder icon
  - Card 2: "1 Internship" — briefcase icon
  - Card 3: "AWS Certified" — badge/cloud icon
  - Card 4: "HUHC Volunteer" — heart icon
  - Each card: subtle hover scale (1.05) + glow effect, stagger-animated entry

### 5. Skills / Tech Stack Section
- **Heading:** "Tech Stack" — scroll-triggered slide-in from left
- **Layout:** Bento grid of categorized skill cards (responsive: 4 cols desktop, 2 cols tablet, 1 col mobile)
- **Cards:**
  - **Languages:** C++, Python, JavaScript, SQL, HTML, CSS — each with devicon + label
  - **Frameworks:** ReactJS, Node.js, MongoDB — with colored brand icons
  - **Cloud & DevOps:** AWS (EC2, S3), Docker, CI/CD — with logos
  - **Tools:** Git, GitHub, VS Code, Linux, IntelliJ IDEA — with icons
- **Interactions:** Hover tooltip on each icon showing context. Cards stagger-animate on scroll entry
- **Background variation:** Slightly different surface color to distinguish from adjacent sections

### 6. Experience & Education Timeline
- **Heading:** "Journey" — scroll-triggered reveal
- **Layout:** Vertical timeline (left-aligned line with animated nodes)
- **Timeline entries (top to bottom, newest first):**

  **1. Skillmind Software Limited — Software Developer Intern (Jun 2025 - Aug 2025)**
  - Developed responsive UI components in ReactJS
  - Contributed to ML modules for predictive analytics
  - Integrated REST APIs for frontend-backend data flow
  - Agile workflows, code reviews, Git version control
  - Tech tags: `React` `REST APIs` `ML` `Git` `Agile`

  **2. ABES Engineering College (2022-2026)**
  - B.Tech CSE (AI & ML) — 75.92%

  **3. Jawahar Navodaya Vidyalaya (2020-2021)**
  - Class XII (PCM) — 90%

  **4. St. Mary's School (2018-2019)**
  - Class X — 85.5%

- **Animation:** Each node pulses/glows as it enters viewport. Entries slide in from alternating sides (left/right). The timeline line draws itself with a scroll-linked animation.

### 7. Projects Showcase
- **Heading:** "Projects" — large, bold, centered
- **Layout:** Stacked featured project cards (full-width, alternating image left/right)
- **Each card:**
  - Project screenshot/mockup (one side)
  - Project name, description bullets, tech tags (other side)
  - Buttons: "Live Demo" (if available) + "Source Code" (GitHub)
  - 3D tilt hover effect on the entire card (vanilla-tilt or custom)
  - Slide-in animation on scroll

  **Project 1: AAE Exercise Web App**
  - Production-grade React app with centralized API layer, cache-first strategy, exponential backoff retry
  - ExerciseDB API with intelligent caching, response normalization, zero duplicate calls
  - Responsive UI with Material UI and React Router
  - Tech: `ReactJS` `React Router` `Material UI` `ExerciseDB API` `YouTube API`
  - Links: GitHub repo

  **Project 2: Contact Manager Website**
  - Full CRUD: add, edit, delete, search with React controlled components
  - LocalStorage persistence across sessions
  - Responsive Bootstrap UI with real-time search filtering
  - Tech: `React.js` `JavaScript` `HTML5` `CSS3` `Bootstrap`
  - Links: GitHub repo

  **"More Coming Soon" card:**
  - Placeholder with animated gradient border
  - Text: "More projects in the pipeline..."
  - Subtle pulse animation

### 8. Certifications & Volunteering
- **Layout:** Two-column bento row (stacks on mobile)
- **Left — Certifications card:**
  - AWS Cloud Practitioner Essentials badge icon
  - "AWS Training & Certification" label
  - "View Certificate" link
  - Shimmer/glow animation on badge
- **Right — Volunteering card:**
  - **Ardema — The Autocrat Society:** Member, technical discussions & events (community icon)
  - **HUHC — NGO:** Volunteer, weekly teaching of underprivileged children (heart icon)
- Cards animate in with stagger delay on scroll

### 9. AI Chatbot
- **Trigger:** Floating button (bottom-right), always visible, pulsing glow
- **Icon:** AI sparkle / chat bubble icon
- **On click:** Slide-up chat panel (400px wide, 500px tall on desktop; full-width sheet on mobile)
- **Chat panel:**
  - Header: "Ask about Jatin" + close button
  - Message area with chat bubbles (left = bot, right = user)
  - Input field + send button
  - Suggested questions as chips: "What are his skills?", "Tell me about his experience", "How to contact him?"
- **Backend:** Next.js API route (`/api/chat`)
  - Uses Claude API (or OpenAI) with system prompt containing full resume data
  - Responses: conversational, friendly, factual
  - Rate limit: 20 messages per session (stored in sessionStorage)
- **Fallback:** If API unavailable, serve pre-written FAQ responses for common questions
- **Cost control:** Use claude-haiku or gpt-4o-mini for cheap, fast responses

### 10. Contact Section
- **Heading:** "Let's Connect" — large, centered, with accent highlight
- **Layout:** Split (stacks on mobile)
- **Left — Contact form:**
  - Fields: Name, Email, Message (textarea)
  - Submit button with loading state
  - Success/error toast notification
  - Backend: Next.js API route using Resend (or EmailJS) to send to jatindhameniya13@gmail.com
  - Basic validation + honeypot spam protection
- **Right — Social links:**
  - Large hoverable icons with magnetic effect:
    - GitHub: github.com/Jatindhameniya17
    - LinkedIn: linkedin.com/in/jatin-dhameniya-044417264
    - Email: jatindhameniya13@gmail.com
    - Phone: +91-8707684171
  - Each icon scales + glows on hover

### 11. Footer
- "Designed & Built by Jatin Dhameniya"
- "Made with Next.js, Tailwind CSS, GSAP, Three.js"
- Back-to-top smooth scroll button
- Small social icon row (compact)

---

## Cross-Cutting Features

### Dark / Light Mode
- Toggle button in navbar (sun/moon icon with rotation animation)
- Persisted in `localStorage`
- Smooth CSS transition (0.3s) on theme switch
- Default: dark mode

### Custom Cursor
- Small accent-colored dot following mouse
- Expands to larger circle on hover over links/buttons/cards
- Text label appears inside cursor on project cards ("View")
- Hidden on mobile/touch devices
- Uses GSAP for smooth interpolation

### Grain Texture
- CSS pseudo-element overlay with noise SVG filter
- Low opacity (~5-8%) on dark backgrounds
- Adds analog/premium feel without performance cost

### Smooth Scroll
- Lenis library for smooth, momentum-based scrolling
- Integrated with GSAP ScrollTrigger for scroll-linked animations
- Respects `prefers-reduced-motion` — falls back to native scroll

### Page Loader
- "JD" monogram with draw animation (SVG stroke-dashoffset)
- 1.5s duration, then exit animation revealing hero
- Only on initial visit (sessionStorage flag)

### SEO & Meta
- Next.js `generateMetadata` for all pages
- Open Graph image (auto-generated or static)
- JSON-LD structured data (Person schema)
- Sitemap via `next-sitemap`
- Canonical URL

### Responsive Design
- **Desktop (1024px+):** Full layout as designed
- **Tablet (768-1023px):** 2-column bento grids, smaller 3D element
- **Mobile (< 768px):** Single column, 3D photo becomes static image with CSS perspective tilt, hamburger nav, full-width chat panel, stacked timeline
- 3D elements use reduced geometry/particles on mobile for performance

### Accessibility
- `prefers-reduced-motion`: disables GSAP/Framer animations, uses simple fade-in
- Semantic HTML (`nav`, `main`, `section`, `article`, `footer`)
- Keyboard navigation for all interactive elements
- ARIA labels on icon buttons and custom cursor areas
- Color contrast ratios meet WCAG AA

### Performance
- 3D assets lazy-loaded (dynamic import for React Three Fiber)
- Images optimized via Next.js `<Image>` component
- Fonts: `next/font` for Clash Display + Inter (self-hosted, no CLS)
- Target: Lighthouse 90+ on all metrics

---

## Project Structure

```
jatin-portfolio/
├── public/
│   ├── images/
│   │   └── jatin-photo.jpg
│   ├── Jatin_Dhameniya_Resume.pdf
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   ├── page.tsx            # Home page (all sections)
│   │   ├── globals.css         # Tailwind imports, grain texture, custom cursor
│   │   └── api/
│   │       ├── chat/route.ts   # AI chatbot API
│   │       └── contact/route.ts # Contact form API
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageLoader.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Certifications.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/
│   │   │   ├── BentoCard.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── TypeWriter.tsx
│   │   │   └── TiltCard.tsx
│   │   ├── three/
│   │   │   ├── PhotoCard3D.tsx   # 3D photo card hero element
│   │   │   └── Particles.tsx     # Floating particles
│   │   └── chat/
│   │       ├── ChatBot.tsx       # Chat panel UI
│   │       └── ChatButton.tsx    # Floating trigger button
│   ├── data/
│   │   ├── projects.ts          # Project data
│   │   ├── skills.ts            # Skills data with icons
│   │   ├── timeline.ts          # Experience + education data
│   │   └── resume-context.ts    # AI chatbot system prompt
│   ├── hooks/
│   │   ├── useScrollAnimation.ts # GSAP ScrollTrigger hook
│   │   ├── useTheme.ts          # Dark/light mode
│   │   └── useSmoothScroll.ts   # Lenis integration
│   └── lib/
│       └── utils.ts             # cn() helper, etc.
├── docs/
│   └── superpowers/specs/
│       └── 2026-04-03-portfolio-design.md
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Verification Plan

1. **Visual:** Open in browser, scroll through all sections, verify animations trigger correctly
2. **3D:** Verify photo card renders, tilts with mouse, particles visible
3. **AI Chatbot:** Send test messages, verify responses are resume-accurate
4. **Contact form:** Submit test message, verify email delivery
5. **Dark/Light mode:** Toggle, verify all sections adapt, check persistence on reload
6. **Responsive:** Test at 1440px, 768px, 375px breakpoints
7. **Performance:** Run Lighthouse audit, target 90+ scores
8. **Accessibility:** Test with keyboard-only navigation, check `prefers-reduced-motion`
9. **SEO:** Verify meta tags, Open Graph, JSON-LD in page source
10. **Deploy:** Push to Vercel, verify production build works
