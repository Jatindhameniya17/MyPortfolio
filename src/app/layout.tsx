import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ClientShell } from "@/components/layout/ClientShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const clashDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-clash",
  weight: ["500", "600", "700"],
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
    description: "Full-Stack Developer, AI/ML Enthusiast, AWS Certified.",
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
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
