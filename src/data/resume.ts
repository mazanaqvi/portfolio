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
  name: "Ali Hamza",
  title: "Full-Stack Engineer",
  technologies: "React Native · Django · Flutter · NestJS",
  email: "alihumza.dev@gmail.com",
  phone: "+92 303 3999512",
  website: "alihumza.com",
  websiteUrl: "https://alihumza.com",
  location: "Lahore, Pakistan",

  summary:
    "Full-stack engineer with 3 years of shipping web and cross-platform mobile applications using React, Flutter, and React Native, backed by scalable Node.js, NestJS, and Django backends. Deployed 10+ live apps on Google Play and the App Store. Hands-on experience with LLM code generation model training, crypto trading automation, and healthcare app development.",

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

  experience: [
    {
      title: "Full-Stack Software Engineer",
      company: "Breeze Labs",
      location: "Singapore (Remote)",
      dates: "Feb 2024 – Present",
      description:
        "Breeze Labs is a Singapore based software studio building SaaS products and custom solutions across web, mobile, and AI. The team delivers CRM platforms, mobile apps, and AI-powered automation tools for clients in the US and GCC markets.",
      bullets: [
        "Built and maintained scalable web applications using React and Next.js, owning features from design handoff to production release.",
        "Led mobile development using Flutter and React Native; managed full App Store and Play Store release cycles for 3 production apps.",
        "Contributed to LLM code generation model training, designing prompts, and evaluating outputs against code quality benchmarks.",
        "Developed a Django based automated crypto trading bot integrating Binance APIs for real-time signal processing, order execution, and portfolio tracking.",
        "Integrated Twilio and FullEnrich REST APIs for real-time communication and automated lead enrichment in a CRM platform.",
      ],
    },
    {
      title: "Mobile Application Developer",
      company: "FrontRow",
      location: "USA (Remote)",
      dates: "Jun 2022 – Jan 2024",
      description:
        "FrontRow is a US-based entertainment platform delivering premium music video content to audiences on iOS and Apple TV. The product focuses on high-quality streaming experiences across Apple devices, with content managed via a flexible Airtable-powered backend.",
      bullets: [
        "Built and owned iOS and tvOS UI in Swift (UIKit) for a music video streaming platform, taking features from design specs to production independently.",
        "Integrated YouTube iFrame API for in-app video playback with smooth performance across iPhone and Apple TV form factors.",
        "Consumed Airtable REST APIs to manage and render content metadata for 500+ media assets, enabling the content team to publish without engineering involvement.",
      ],
    },
  ],

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

  education: [
    {
      degree: "BS Computer Science",
      institution: "FAST NUCES Lahore",
      dates: "2018 – 2022",
      details: "CGPA 3.3 / 4.0 · Dean's List, Spring 2021",
    },
  ],
};
