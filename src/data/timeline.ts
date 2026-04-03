export interface TimelineEntry {
  type: "experience" | "education";
  title: string;
  organization: string;
  period: string;
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
