import { resumeData } from "./resume";

export interface Skill {
  name: string;
  percentage: number;
  cssClass: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface TimelineItem {
  icon: string;
  duration: string;
  title: string;
  company: string;
  description: string;
}

/** Progress bar row per skill category; mirrors `resumeData.skills` order. */
const SKILL_BAR_CSS: Skill["cssClass"][] = [
  "html",
  "css",
  "js",
  "react",
  "node",
  "python",
];

export const skills: Skill[] = resumeData.skills.map((s, i) => ({
  name: s.category,
  percentage: 90 - i * 2,
  cssClass: SKILL_BAR_CSS[i] ?? "html",
}));

/** Stats aligned with the resume summary (3 yrs experience, 10+ live apps, 20+ projects, six skill groups). */
export const stats: StatItem[] = [
  { value: "20+", label: "Projects\nCompleted" },
  { value: "3", label: "Years of\nExperience" },
  { value: "10+", label: "Live apps\nshipped" },
  { value: "6", label: "Core skill\nareas" },
];

const CAREER_ICONS: string[] = ["fas fa-code", "fas fa-tv"];

function careerDescription(job: (typeof resumeData.experience)[number]): string {
  return [job.description, job.bullets[0], job.bullets[1]].filter(Boolean).join(" ");
}

export const education: TimelineItem[] = resumeData.education.map((edu) => ({
  icon: "fas fa-graduation-cap",
  duration: edu.dates,
  title: edu.degree,
  company: edu.institution,
  description: edu.details,
}));

export const career: TimelineItem[] = resumeData.experience.map((job, i) => ({
  icon: CAREER_ICONS[i] ?? "fas fa-briefcase",
  duration: job.dates,
  title: job.title,
  company: `${job.company} · ${job.location}`,
  description: careerDescription(job),
}));

export const RESUME_DOWNLOAD_LINK =
  "https://docs.google.com/document/d/1nEcvLGT7tnhtc58uXBfDc9HeeVokgswilXW4vx-5jM0/export?format=pdf";
