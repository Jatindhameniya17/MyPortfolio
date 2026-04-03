export interface Skill {
  name: string;
  icon: string;
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
      { name: "TypeScript", icon: "typescript" },
      { name: "SQL", icon: "database" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "ReactJS", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Material UI", icon: "mui" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS (EC2, S3)", icon: "aws" },
      { name: "Docker", icon: "docker" },
      { name: "CI/CD", icon: "git-branch" },
      { name: "REST APIs", icon: "api" },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    title: "Tools & Practices",
    skills: [
      { name: "Git & GitHub", icon: "git" },
      { name: "VS Code", icon: "code" },
      { name: "Linux CLI", icon: "terminal" },
      { name: "Agile/Scrum", icon: "agile" },
      { name: "DSA (400+)", icon: "dsa" },
    ],
  },
];
