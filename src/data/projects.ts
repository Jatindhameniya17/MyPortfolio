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
