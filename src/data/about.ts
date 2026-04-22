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
    icon: "fas fa-code",
    duration: "Feb 2024 – Present",
    title: "Full-Stack Software Engineer",
    company: "Breeze Labs · Singapore (Remote)",
    description:
      "Breeze Labs is a Singapore based software studio building SaaS, web, mobile, and AI products for the US and GCC markets. Shipped React and Next.js web apps, led Flutter and React Native to the App and Play stores for 3 production apps, contributed to LLM code generation training, built a Django-based trading bot with Binance APIs, and integrated Twilio and FullEnrich for a CRM platform.",
  },
  {
    icon: "fas fa-tv",
    duration: "Jun 2022 – Jan 2024",
    title: "Mobile Application Developer",
    company: "FrontRow · USA (Remote)",
    description:
      "FrontRow is a US-based entertainment platform for premium music video on iOS and Apple TV. Built iOS and tvOS UI in Swift (UIKit) from spec to production, integrated YouTube iFrame playback, and used Airtable to manage metadata for 500+ media assets so the content team could ship without code changes.",
  },
];

export const RESUME_DOWNLOAD_LINK = "https://docs.google.com/document/d/1nEcvLGT7tnhtc58uXBfDc9HeeVokgswilXW4vx-5jM0/export?format=pdf";
