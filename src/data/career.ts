/**
 * Single source for career facts. The site (Experience section, About page,
 * hero numbers) and the resume (page + DOCX download) both read from here,
 * so dates, titles, bullets and headline numbers can't drift apart.
 */

/** Years of professional experience, counted from the first full-time role (Jun 2022). */
export const YEARS_EXPERIENCE = 4;

/** Total apps ever shipped to the App Store / Google Play, including ones since delisted. */
export const APPS_SHIPPED = 10;

export interface Job {
  company: string;
  role: string;
  start: string;
  /** Omit for the current role. */
  end?: string;
  location: string;
  remote: boolean;
  /** Short first-person line shown on the site. */
  summary: string;
  /** Third-person description of the company, used on the resume. */
  companyBlurb?: string;
  bullets: string[];
  stack: string[];
  /** Freelance work shows on the site but isn't listed as a resume job. */
  onResume: boolean;
}

export const jobs: Job[] = [
  {
    company: "Breeze Labs",
    role: "Full-Stack Software Engineer",
    start: "Feb 2024",
    location: "Singapore",
    remote: true,
    summary:
      "Product studio building SaaS and AI tools for clients in the US and GCC. I own features from design hand-off to release across web and mobile.",
    companyBlurb:
      "Breeze Labs is a Singapore based software studio building SaaS products and custom solutions across web, mobile, and AI. The team delivers CRM platforms, mobile apps, and AI-powered automation tools for clients in the US and GCC markets.",
    bullets: [
      "Built and maintained scalable web applications using React and Next.js, owning features from design handoff to production release.",
      "Led mobile development using Flutter and React Native; managed full App Store and Play Store release cycles for 3 production apps.",
      "Contributed to LLM code generation model training, designing prompts, and evaluating outputs against code quality benchmarks.",
      "Developed a Django based automated crypto trading bot integrating Binance APIs for real-time signal processing, order execution, and portfolio tracking.",
      "Integrated Twilio and FullEnrich REST APIs for real-time communication and automated lead enrichment in a CRM platform.",
    ],
    stack: ["Next.js", "Flutter", "React Native", "NestJS", "Django", "LLMs"],
    onResume: true,
  },
  {
    company: "FrontRow",
    role: "Mobile Application Developer",
    start: "Jun 2022",
    end: "Jan 2024",
    location: "USA",
    remote: true,
    summary: "Entertainment platform streaming premium music video content on iPhone and Apple TV.",
    companyBlurb:
      "FrontRow is a US-based entertainment platform delivering premium music video content to audiences on iOS and Apple TV. The product focuses on high-quality streaming experiences across Apple devices, with content managed via a flexible Airtable-powered backend.",
    bullets: [
      "Built and owned iOS and tvOS UI in Swift (UIKit) for a music video streaming platform, taking features from design specs to production independently.",
      "Integrated YouTube iFrame API for in-app video playback with smooth performance across iPhone and Apple TV form factors.",
      "Consumed Airtable REST APIs to manage and render content metadata for 500+ media assets, enabling the content team to publish without engineering involvement.",
    ],
    stack: ["Swift", "UIKit", "tvOS", "Airtable"],
    onResume: true,
  },
  {
    company: "Upwork · XrossApps",
    role: "Freelance Engineer · Top Rated",
    start: "2020",
    location: "Worldwide",
    remote: true,
    summary:
      "Independent work for startups and founders, now under my studio XrossApps. 100% job success across fintech, healthcare, logistics and e-commerce.",
    bullets: [
      `Shipped ${APPS_SHIPPED}+ apps to the App Store and Google Play for clients in the US, UK, Singapore and Kuwait.`,
      "Specialised in Flutter, FlutterFlow and Firebase builds with fast turnaround.",
      "Maintained a 5.0 average rating across every contract.",
    ],
    stack: ["Flutter", "Firebase", "FlutterFlow", "Node.js"],
    onResume: false,
  },
];

export interface Education {
  degree: string;
  school: string;
  start: string;
  end: string;
  details: string;
}

export const educationHistory: Education[] = [
  {
    degree: "BS Computer Science",
    school: "FAST NUCES, Lahore",
    start: "2018",
    end: "2022",
    details: "CGPA 3.3 / 4.0 · Dean's List, Spring 2021",
  },
];

export const period = (start: string, end: string | undefined, dash = "—") =>
  `${start} ${dash} ${end ?? "Present"}`;
