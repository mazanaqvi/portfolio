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
  eyebrow: "Full-stack & mobile engineer",
  roles: ["Flutter apps", "React Native apps", "Next.js products", "NestJS & Django APIs", "iOS & tvOS in Swift"],
  intro:
    "I design and ship cross-platform apps and the backends behind them. Four years in, 10+ apps live on the App Store and Google Play, and a Top Rated record on Upwork.",
  stats: [
    { value: 25, suffix: "+", label: "Projects shipped" },
    { value: 10, suffix: "+", label: "Apps in stores" },
    { value: 4, suffix: "+", label: "Years building" },
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

export const experience: ExperienceItem[] = [
  {
    company: "Breeze Labs",
    role: "Full-stack Software Engineer",
    period: "Feb 2024 — Present",
    location: "Singapore · Remote",
    current: true,
    summary:
      "Product studio building SaaS and AI tools for clients in the US and GCC. I own features from design hand-off to release across web and mobile.",
    bullets: [
      "Built and maintained React and Next.js web apps, owning features end to end.",
      "Led Flutter and React Native work and ran App Store and Play Store release cycles for 3 production apps.",
      "Contributed to LLM code-generation training: prompt design and output evaluation against code-quality benchmarks.",
      "Built a Django crypto trading bot on the Binance API for live signals, order execution and portfolio tracking.",
      "Integrated Twilio and FullEnrich into a CRM for calling and automated lead enrichment.",
    ],
    stack: ["Next.js", "Flutter", "React Native", "NestJS", "Django", "LLMs"],
  },
  {
    company: "FrontRow",
    role: "Mobile Application Developer",
    period: "Jun 2022 — Jan 2024",
    location: "USA · Remote",
    summary:
      "Entertainment platform streaming premium music video content on iPhone and Apple TV.",
    bullets: [
      "Owned the iOS and tvOS UI in Swift (UIKit), taking features from spec to production independently.",
      "Integrated YouTube iFrame playback with smooth performance across iPhone and Apple TV.",
      "Drove content for 500+ media assets through Airtable so the editorial team could publish without engineering.",
    ],
    stack: ["Swift", "UIKit", "tvOS", "Airtable"],
  },
  {
    company: "Upwork · XrossApps",
    role: "Freelance Engineer · Top Rated",
    period: "2020 — Present",
    location: "Worldwide · Remote",
    summary:
      "Independent work for startups and founders, now under my studio XrossApps. 100% job success across fintech, healthcare, logistics and e-commerce.",
    bullets: [
      "Shipped 10+ apps to the App Store and Google Play for clients in the US, UK, Singapore and Kuwait.",
      "Specialised in Flutter, FlutterFlow and Firebase builds with fast turnaround.",
      "Maintained a 5.0 average rating across every contract.",
    ],
    stack: ["Flutter", "Firebase", "FlutterFlow", "Node.js"],
  },
];

export const education = {
  degree: "BS Computer Science",
  school: "FAST NUCES, Lahore",
  period: "2018 — 2022",
  details: "CGPA 3.3 / 4.0 · Dean's List, Spring 2021",
};

export const about = {
  headline: "Engineer, founder, and the person who answers your messages.",
  paragraphs: [
    "I'm Ali, a software engineer from Lahore. I started on Upwork in 2020 building Flutter apps for founders who needed something in stores fast, and I never stopped shipping. Today I split my time between Breeze Labs, where I build web, mobile and AI products, and XrossApps, my own studio.",
    "I care about the parts people feel: the screen that loads instantly, the gesture that lands, the API that doesn't flake at 2am. I like owning a feature from the Figma file to the store listing, and I'm happiest when a client ships something their users actually open every day.",
    "Off the clock I'm usually poking at a side product, reading about how other teams ship, or losing to my own 2048 board.",
  ],
  principles: [
    { title: "Own the whole thing", text: "Design hand-off, data model, API, store release. One person who understands every layer makes fewer hand-off bugs." },
    { title: "Fast, then faster", text: "First useful build within days. Then tighten performance, polish and edge cases with real feedback." },
    { title: "Over-communicate", text: "Clear scope, daily updates, no surprises. My Upwork reviews say it better than I can." },
  ],
};

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  handle: string;
}

export const socials: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/mazanaqvi", icon: "fab fa-github", handle: "@mazanaqvi" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mazanaqvi/", icon: "fab fa-linkedin-in", handle: "in/mazanaqvi" },
  { name: "Upwork", url: "https://www.upwork.com/freelancers/~01aea3e66df60ee009", icon: "fab fa-upwork", handle: "Top Rated" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/users/13111347/ali-hamza", icon: "fab fa-stack-overflow", handle: "ali-hamza" },
  { name: "X", url: "https://twitter.com/mazaanaqvi", icon: "fab fa-x-twitter", handle: "@mazaanaqvi" },
  { name: "YouTube", url: "https://www.youtube.com/channel/UCfqP1OsD9GJE7BoeZV53AsA", icon: "fab fa-youtube", handle: "Ali Humza" },
];

export interface NavItem {
  label: string;
  path: string;
  short?: string;
}

export const navItems: NavItem[] = [
  { label: "Work", path: "/work" },
  { label: "About", path: "/about" },
  { label: "Reviews", path: "/reviews" },
  { label: "Resume", path: "/resume" },
  { label: "Contact", path: "/contact" },
];

export const RESUME_PDF_URL =
  "https://docs.google.com/document/d/1nEcvLGT7tnhtc58uXBfDc9HeeVokgswilXW4vx-5jM0/export?format=pdf";
