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

export const skills: Skill[] = [
  { name: "Flutter", percentage: 80, cssClass: "html" },
  { name: "C++", percentage: 95, cssClass: "css" },
  { name: "Unity C#", percentage: 65, cssClass: "js" },
  { name: "Assembly Language", percentage: 70, cssClass: "react" },
  { name: "JAVA", percentage: 87, cssClass: "node" },
  { name: "Python", percentage: 70, cssClass: "python" },
];

export const stats: StatItem[] = [
  { value: "20+", label: "Projects\nCompleted" },
  { value: "5+", label: "Years of\nProgramming experience" },
  { value: "2+", label: "Years of\nSoftware Industry" },
  { value: "5+", label: "Development\nFrameworks" },
];

export const education: TimelineItem[] = [
  {
    icon: "fas fa-graduation-cap",
    duration: "2018 - 2022",
    title: "BS Computer Science",
    company: "FAST NUCES",
    description:
      "Studied programming, Software engineering, NLP and mobile app development.",
  },
];

export const career: TimelineItem[] = [
  {
    icon: "fas fa-laptop-code",
    duration: "2020 - Present",
    title: "Freelance Developer",
    company: "Upwork",
    description:
      "Completed more than 20 mobile apps and websites in these 5 years. Specialized in Flutter development and full-stack web solutions.",
  },
  {
    icon: "fas fa-briefcase",
    duration: "Jan 2022 - May 2023",
    title: "Software Engineer",
    company: "Innovage.io",
    description:
      "Worked on different projects in Flutter and developed many cross-platform applications for various clients and industries.",
  },
  {
    icon: "fas fa-globe-americas",
    duration: "May 2023 - Feb 2024",
    title: "Remote Software Engineer",
    company: "Wave USA",
    description:
      "Developed Flutter applications for US-based clients, focusing on scalable mobile solutions and cross-platform development.",
  },
  {
    icon: "fas fa-code",
    duration: "Feb 2024 - Present",
    title: "Senior Developer",
    company: "Breezelab Singapore",
    description:
      "Currently working remotely with Singapore-based team, developing advanced mobile applications and leading Flutter development projects.",
  },
];

export const RESUME_DOWNLOAD_LINK = "/resume/august_2025.pdf";
