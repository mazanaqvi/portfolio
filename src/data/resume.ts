import { APPS_SHIPPED, YEARS_EXPERIENCE, educationHistory, jobs, period } from "./career";

export interface ResumeSkill {
  category: string;
  items: string;
}

export interface ResumeJob {
  title: string;
  company: string;
  location: string;
  dates: string;
  description: string;
  bullets: string[];
}

export interface ResumeProject {
  name: string;
  tech: string;
  description: string;
  link?: string;
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  dates: string;
  details: string;
}

export interface ResumeData {
  name: string;
  title: string;
  /** Omitted on page / DOCX while hidden; set to show a tech line under the title. */
  technologies?: string;
  email: string;
  phone: string;
  website: string;
  websiteUrl: string;
  location: string;
  summary: string;
  skills: ResumeSkill[];
  experience: ResumeJob[];
  projects: ResumeProject[];
  education: ResumeEducation[];
}

export const resumeData: ResumeData = {
  name: "Ali Humza",
  title: "Full-Stack Engineer",
  technologies: "React Native · Django · Flutter · NestJS",
  email: "alihumza.dev@gmail.com",
  phone: "+92 303 3999512",
  website: "alihumza.com",
  websiteUrl: "https://alihumza.com",
  location: "Lahore, Pakistan",

  summary:
    `Full-stack engineer with ${YEARS_EXPERIENCE}+ years of shipping web and cross-platform mobile applications using React, Flutter, and React Native, backed by scalable Node.js, NestJS, and Django backends. Shipped ${APPS_SHIPPED}+ apps to Google Play and the App Store. Hands-on experience with LLM code generation model training, crypto trading automation, and healthcare app development.`,

  skills: [
    {
      category: "Frontend",
      items:
        "React.js · Next.js · JavaScript (ES6+) · HTML5 · CSS3 · Responsive Design · Material UI",
    },
    {
      category: "Mobile",
      items: "Flutter · React Native · Swift (iOS/tvOS) · FlutterFlow · Cordova",
    },
    {
      category: "Backend",
      items:
        "NestJS · Node.js · Django · REST APIs · Firebase · MongoDB · PostgreSQL",
    },
    {
      category: "AI / ML",
      items:
        "LangChain · LLM Code Generation Training · OpenAI API · Vector Search",
    },
    {
      category: "Infrastructure",
      items:
        "AWS · Google Cloud · Docker · Auth0 · OneSignal · APNs · iOS/Android App Store deployment",
    },
    {
      category: "Tools",
      items: "Git · GitHub · Bitbucket · Jira · Notion · Airtable",
    },
  ],

  // Jobs come from data/career.ts, shared with the site.
  experience: jobs
    .filter((j) => j.onResume)
    .map((j) => ({
      title: j.role,
      company: j.company,
      location: j.remote ? `${j.location} (Remote)` : j.location,
      dates: period(j.start, j.end, "–"),
      description: j.companyBlurb ?? j.summary,
      bullets: j.bullets,
    })),

  projects: [
    {
      name: "Hit Rewind — Music Videos iOS & tvOS App",
      tech: "Swift · UIKit · Airtable API · YouTube iFrame · Apple TV",
      description:
        "Native iOS and tvOS music video streaming app built in Swift with UIKit. Integrated YouTube iFrame API for in-app playback across iPhone and Apple TV, with all content and metadata managed through Airtable REST APIs — allowing the content team to publish and update videos without any code changes. Available on the Apple App Store.",
      link: "https://apps.apple.com/us/app/music-videos-hit-rewind/id6479374259",
    },
    {
      name: "SalesBuckets — CRM Web Platform",
      tech: "Flutter Web · Firebase · Twilio · Node.js · Chrome Extension",
      description:
        "Web-based CRM with real-time communication via Twilio, automated lead enrichment via FullEnrich REST API, and a JavaScript Chrome extension for browser-native CRM access. Live in production.",
      link: "https://app.salesbuckets.com",
    },
    {
      name: "BakerBaby — Baby Healthcare App",
      tech: "React Native · AWS · Auth0 · OneSignal",
      description:
        "Healthcare mobile application for infant care management. Built in React Native with AWS backend infrastructure, Auth0 SSO authentication, and OneSignal push notifications for health alerts and appointment reminders to parents. Available on the Apple App Store.",
      link: "https://apps.apple.com/us/app/baker-baby/id6747993789",
    },
    {
      name: "Crypto Trading Bot",
      tech: "Django · KuCoin API · Python · REST APIs",
      description:
        "Automated trading bot integrating real-time KuCoin market data for signal detection, order execution, and portfolio management. Configurable trading strategies with live P&L tracking and alert notifications.",
    },
  ],

  education: educationHistory.map((e) => ({
    degree: e.degree,
    institution: e.school,
    dates: period(e.start, e.end, "–"),
    details: e.details,
  })),
};
