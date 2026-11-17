export const site = {
  name: "Ali Humza",
  handle: "alihumza",
  url: "https://alihumza.com",
  title: "Full-stack & mobile engineer",
  location: "Lahore, Pakistan",
  timezone: "Asia/Karachi",
  email: "alihumza.dev@gmail.com",
  phone: "+92 303 3999512",
  phoneHref: "+923033999512",
  company: { name: "XrossApps", url: "https://www.xrossapps.com/" },
  availability: "Open to freelance and full-time roles",
};

export const hero = {
  eyebrow: "Software engineer",
  roles: ["Flutter apps", "React Native apps", "Next.js products", "NestJS & Django APIs", "iOS & tvOS in Swift"],
  intro: `I design and ship cross-platform apps and the backends behind them. ${YEARS_EXPERIENCE}+ years in, ${APPS_SHIPPED}+ apps shipped to the App Store and Google Play, and a Top Rated record on Upwork.`,
  stats: [
    { value: 25, suffix: "+", label: "Projects shipped" },
    { value: liveAppCount, suffix: "", label: "Apps live in stores" },
    { value: YEARS_EXPERIENCE, suffix: "+", label: "Years building" },
    { value: 100, suffix: "%", label: "Job success" },
  ],
};

export const techStack: { name: string; group: string }[] = [
  { name: "Flutter", group: "Mobile" },
  { name: "React Native", group: "Mobile" },
  { name: "Swift", group: "Mobile" },
  { name: "Dart", group: "Mobile" },
  { name: "Next.js", group: "Web" },
  { name: "React", group: "Web" },
  { name: "TypeScript", group: "Web" },
  { name: "Tailwind", group: "Web" },
  { name: "NestJS", group: "Backend" },
  { name: "Node.js", group: "Backend" },
  { name: "Django", group: "Backend" },
  { name: "PostgreSQL", group: "Backend" },
  { name: "MongoDB", group: "Backend" },
  { name: "Firebase", group: "Cloud" },
  { name: "AWS", group: "Cloud" },
  { name: "Google Cloud", group: "Cloud" },
  { name: "Docker", group: "Cloud" },
  { name: "LangChain", group: "AI" },
  { name: "OpenAI API", group: "AI" },
  { name: "Twilio", group: "Integrations" },
  { name: "Auth0", group: "Integrations" },
  { name: "OneSignal", group: "Integrations" },
];

export interface SkillGroup {
  title: string;
  blurb: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Mobile",
    blurb: "Cross-platform first, native when it matters.",
    items: ["Flutter", "React Native", "Swift / UIKit", "tvOS", "FlutterFlow", "App Store & Play release"],
  },
  {
    title: "Web",
    blurb: "Fast, accessible product UIs.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Material UI", "Flutter Web"],
  },
  {
    title: "Backend",
    blurb: "APIs that stay simple under load.",
    items: ["NestJS", "Node.js", "Django", "REST", "PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    title: "AI & automation",
    blurb: "LLM features and bots that do real work.",
    items: ["LangChain", "OpenAI API", "Vector search", "LLM eval & training", "Trading bots"],
  },
  {
    title: "Cloud & tooling",
    blurb: "Ship it, watch it, keep it running.",
    items: ["AWS", "Google Cloud", "Docker", "CI/CD", "Auth0", "OneSignal", "Git"],
  },
];

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  stack: string[];
  current?: boolean;
}

/** Derived from data/career.ts, the same records the resume uses. */
export const experience: ExperienceItem[] = jobs.map((j) => ({
  company: j.company,
  role: j.role,
  period: period(j.start, j.end),
  location: j.remote ? `${j.location} · Remote` : j.location,
  summary: j.summary,
  bullets: j.bullets,
  stack: j.stack,
  current: !j.end,
}));

const edu = educationHistory[0];
export const education = {
  degree: edu.degree,
  school: edu.school,
  period: period(edu.start, edu.end),
  details: edu.details,
};

export interface NowItem {
  tag: string;
  icon: "building" | "rocket" | "flask";
  title: string;
  text: string;
  learning?: boolean;
  chips?: string[];
  projects?: { label: string; id: string }[];
}

/** What I'm doing right now. The "lab" item is work in progress and says so. */
export const nowItems: NowItem[] = [
  {
    tag: "Day job",
    icon: "building",
    title: "Engineering at Breeze Labs",
    text: "Full-stack work for a Singapore product studio: web apps in Next.js, mobile in Flutter and React Native, and LLM tooling for clients in the US and GCC.",
    chips: ["Next.js", "Flutter", "React Native", "LLMs"],
  },
  {
    tag: "My products",
    icon: "rocket",
    title: "Growing Docings and Wallets Friend",
    text: "Two products I design, build and run under XrossApps. Docings makes resumes, invoices and documents. Wallets Friend tracks budgets, expenses and loans.",
    projects: [
      { label: "Docings", id: "docings" },
      { label: "Wallets Friend", id: "wallets-friend" },
    ],
  },
  {
    tag: "In the lab",
    icon: "flask",
    learning: true,
    title: "AI voice agents and n8n automations",
    text: "Learning to put voice agents and workflow automation on top of the apps and APIs I already ship. The first builds will land on this page.",
    chips: ["Voice agents", "n8n", "LLM tooling"],
  },
];

export const about = {
  headline: "Engineer, founder, and the person who answers your messages.",
  paragraphs: [
    "I'm Ali Humza (you'll also see it spelled Ali Hamza), a software engineer from Lahore. I started on Upwork in 2020 building Flutter apps for founders who needed something in stores fast, and I never stopped shipping. Today I split my time between Breeze Labs, where I build web, mobile and AI products, and XrossApps, my own studio.",
    "I care about the parts people feel: the screen that loads instantly, the gesture that lands, the API that doesn't flake at 2am. I like owning a feature from the Figma file to the store listing, and I'm happiest when a client ships something their users actually open every day.",
    "Off the clock I'm usually poking at a side product, reading about how other teams ship, or losing to my own 2048 board.",
  ],
  principles: [
    { title: "Own the whole thing", text: "Design hand-off, data model, API, store release. One person who understands every layer makes fewer hand-off bugs." },
    { title: "Fast, then faster", text: "First useful build within days. Then tighten performance, polish and edge cases with real feedback." },
    { title: "Over-communicate", text: "Clear scope, daily updates, no surprises. My Upwork reviews say it better than I can." },
  ],
};

import type { BrandName } from "../components/ui/brandIcons";
import { APPS_SHIPPED, YEARS_EXPERIENCE, educationHistory, jobs, period } from "./career";
import { liveAppCount } from "./projects";

export interface SocialLink {
  name: string;
  url: string;
  icon: BrandName;
  handle: string;
}

export const socials: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/mazanaqvi", icon: "github", handle: "@mazanaqvi" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mazanaqvi/", icon: "linkedin-in", handle: "in/mazanaqvi" },
  { name: "Upwork", url: "https://www.upwork.com/freelancers/~01aea3e66df60ee009", icon: "upwork", handle: "Top Rated" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/users/13111347/ali-hamza", icon: "stack-overflow", handle: "ali-hamza" },
  { name: "X", url: "https://twitter.com/mazaanaqvi", icon: "x-twitter", handle: "@mazaanaqvi" },
  { name: "YouTube", url: "https://www.youtube.com/channel/UCfqP1OsD9GJE7BoeZV53AsA", icon: "youtube", handle: "Ali Humza" },
];

export interface NavItem {
  label: string;
  path: string;
  short?: string;
}

export const navItems: NavItem[] = [
  { label: "Work", path: "/work/" },
  { label: "About", path: "/about/" },
  { label: "Reviews", path: "/reviews/" },
  { label: "Resume", path: "/resume/" },
  { label: "Contact", path: "/contact/" },
];

export const RESUME_PDF_URL =
  "https://docs.google.com/document/d/1nEcvLGT7tnhtc58uXBfDc9HeeVokgswilXW4vx-5jM0/export?format=pdf";
