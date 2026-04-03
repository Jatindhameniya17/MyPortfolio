import { NextRequest, NextResponse } from "next/server";
import { RESUME_SYSTEM_PROMPT } from "@/data/resume-context";

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
  if (lower.includes("skill") || lower.includes("tech")) return FAQ_RESPONSES.skills;
  if (lower.includes("experience") || lower.includes("intern") || lower.includes("work")) return FAQ_RESPONSES.experience;
  if (lower.includes("project") || lower.includes("built") || lower.includes("build")) return FAQ_RESPONSES.projects;
  if (lower.includes("education") || lower.includes("college") || lower.includes("degree")) return FAQ_RESPONSES.education;
  if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("reach")) return FAQ_RESPONSES.contact;
  return "I can tell you about Jatin's skills, experience, projects, education, or contact info. What would you like to know?";
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ response: getFallbackResponse(message), fallback: true });
    }

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
        return NextResponse.json({ response: data.content[0].text });
      }
    }

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
        return NextResponse.json({ response: data.choices[0].message.content });
      }
    }

    return NextResponse.json({ response: getFallbackResponse(message), fallback: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
