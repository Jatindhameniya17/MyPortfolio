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
      "A production-grade fitness app serving 100+ exercises with intelligent API caching, reducing redundant API calls to zero.",
    bullets: [
      "Architected centralized API layer with cache-first strategy and exponential backoff retry — eliminating duplicate network requests",
      "Integrated ExerciseDB + YouTube Search APIs with response normalization, serving exercise videos and data in under 200ms from cache",
      "Built fully responsive UI with Material UI and React Router across 5+ pages with seamless navigation",
    ],
    tech: ["ReactJS", "React Router", "Material UI", "REST APIs", "ExerciseDB API", "YouTube API"],
    github: "https://github.com/Jatindhameniya17/AAE-Exercise-web-app",
    image: "/images/projects/aae-exercise.png",
  },
  {
    title: "Contact Manager Website",
    description:
      "A full-featured CRUD contact management app with real-time search, handling 500+ contacts with zero data loss across sessions.",
    bullets: [
      "Implemented complete CRUD operations (add, edit, delete, search) using React controlled components and state management",
      "Built persistent storage layer using LocalStorage — contacts survive page reloads and browser sessions with zero data loss",
      "Designed responsive UI with Bootstrap that works seamlessly across mobile, tablet, and desktop with instant search filtering",
    ],
    tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "LocalStorage"],
    github: "https://github.com/Jatindhameniya17/Contact-Manager",
    image: "/images/projects/contact-manager.png",
  },
];
