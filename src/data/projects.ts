/**
 * Every project card uses the same image resolution so the grid stays even:
 *   public/img/projects/<id>.webp  —  1600 x 1000 (16:10)
 * Regenerate with `npm run build:images` (see scripts/project-images.json).
 */
export const PROJECT_IMAGE = { width: 1600, height: 1000 } as const;

export type ProjectKind = "mobile" | "web" | "product";

export interface ProjectLink {
  type: "appstore" | "playstore" | "web" | "github";
  url: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  kind: ProjectKind[];
  stack: string[];
  year: string;
  role: string;
  client?: string;
  /** Brand colour used for the card glow and modal accents. */
  accent: string;
  featured?: boolean;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "wallets-friend",
    title: "Wallets Friend",
    tagline: "Smarter money, better life.",
    description:
      "A personal finance companion I built and run under XrossApps. It tracks expenses, budgets, loans and reminders, then turns the data into clear spending insights so people actually understand where their money goes.",
    highlights: [
      "Budget ring with daily safe-to-spend amount",
      "Loans ledger that tracks who owes whom",
      "Category insights with charts and trends",
      "Offline-first with cloud sync",
    ],
    kind: ["product", "mobile"],
    stack: ["Flutter", "Firebase", "Cloud Firestore"],
    year: "2025",
    role: "Founder · Design · Engineering",
    accent: "#22c55e",
    featured: true,
    links: [
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.xrossapps.walletsfriend" },
      { type: "web", url: "https://walletsfriend.web.app/" },
    ],
  },
  {
    id: "docings",
    title: "Docings",
    tagline: "Resumes, invoices and documents, done properly.",
    description:
      "My SaaS for documents people send to other people (formerly ResumeAssists). A resume builder with a live preview that updates as you type, an invoice generator that gets freelancers paid, and a converter that turns plain Markdown into polished Word and PDF files.",
    highlights: [
      "Three tools, one account: resumes, invoices, converter",
      "Real-time preview while editing, ATS-friendly templates",
      "PDF and DOCX export in seconds",
      "Documents are converted on the spot and never stored",
    ],
    kind: ["product", "web"],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    year: "2026",
    role: "Founder · Full-stack",
    accent: "#6366f1",
    featured: true,
    links: [{ type: "web", url: "https://resumeassists.com/" }],
  },
  {
    id: "glory-global-driver",
    title: "Glory Global Driver",
    tagline: "Logistics. Simplified. Delivered.",
    description:
      "Driver-side app for a US logistics company. Drivers receive dispatched orders, accept or reject them, follow the route, chat with the admin and confirm each pickup and drop-off while the office watches live location.",
    highlights: [
      "Live location tracking with background updates",
      "Order lifecycle: dispatched → heading → loaded → delivered",
      "Realtime chat with photo sharing",
      "Route details with Google Maps hand-off",
    ],
    kind: ["mobile"],
    stack: ["Flutter", "Firebase", "Google Maps", "Push Notifications"],
    year: "2025",
    role: "Lead mobile engineer",
    client: "Glory Global",
    accent: "#f5c518",
    featured: true,
    links: [
      { type: "appstore", url: "https://apps.apple.com/pk/app/glory-global-driver/id6777124421" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.gloryglobal.driver" },
    ],
  },
  {
    id: "baker-baby",
    title: "Baker Baby",
    tagline: "Your parenting co-pilot.",
    description:
      "A healthcare app for expecting and new parents. Week-by-week baby growth, a hospital bag checklist and 24/7 chat with real pediatricians, backed by AWS infrastructure and secure single sign-on.",
    highlights: [
      "24/7 pediatrician chat with push alerts",
      "Week-by-week development tracker",
      "Auth0 SSO and secure health data handling",
      "OneSignal reminders for appointments",
    ],
    kind: ["mobile"],
    stack: ["React Native", "AWS", "Auth0", "OneSignal"],
    year: "2025",
    role: "Mobile engineer",
    client: "Baker Baby LLC",
    accent: "#a78bfa",
    featured: true,
    links: [{ type: "appstore", url: "https://apps.apple.com/us/app/baker-baby/id6747993789" }],
  },
  {
    id: "salesbuckets",
    title: "SalesBuckets CRM",
    tagline: "Bucket your leads, close more deals.",
    description:
      "A web CRM for sales teams. Leads move through buckets, opportunities are tracked by stage and value, calls run through Twilio and contacts get enriched automatically. A Chrome extension brings the CRM into the browser.",
    highlights: [
      "Twilio calling and messaging inside the CRM",
      "Automated lead enrichment via FullEnrich",
      "Opportunity pipeline with monthly reporting",
      "Chrome extension for in-browser access",
    ],
    kind: ["web"],
    stack: ["Flutter Web", "Firebase", "Node.js", "Twilio"],
    year: "2024",
    role: "Full-stack engineer",
    client: "SalesBuckets",
    accent: "#3b4fe4",
    featured: true,
    links: [{ type: "web", url: "https://app.salesbuckets.com/" }],
  },
  {
    id: "hit-rewind",
    title: "Hit Rewind",
    tagline: "Full live concerts on iPhone and Apple TV.",
    description:
      "A native music video streaming app for iOS and tvOS. I owned the UIKit interface end to end, integrated YouTube playback and wired content to Airtable so the editorial team publishes without an engineer.",
    highlights: [
      "Native Swift UIKit for iPhone and Apple TV",
      "YouTube iFrame playback tuned for tvOS focus",
      "500+ media assets managed through Airtable",
      "Genre browsing, top 100 and live shows",
    ],
    kind: ["mobile"],
    stack: ["Swift", "UIKit", "tvOS", "Airtable API"],
    year: "2024",
    role: "iOS & tvOS engineer",
    client: "FrontRow",
    accent: "#8b5cf6",
    featured: true,
    links: [{ type: "appstore", url: "https://apps.apple.com/us/app/music-videos-hit-rewind/id6479374259" }],
  },
  {
    id: "kindshare",
    title: "KindShare",
    tagline: "A new way to share costs.",
    description:
      "A social expense-splitting app. Enter what was paid, choose even, equity or custom splits and settle up without the awkward conversation. Includes a stories feed about the psychology of spending.",
    highlights: ["Even, equity and custom split types", "One-tap settle up", "Stories feed with curated reads"],
    kind: ["mobile"],
    stack: ["Flutter", "Firebase"],
    year: "2025",
    role: "Mobile engineer",
    accent: "#2f80ed",
    links: [
      { type: "appstore", url: "https://apps.apple.com/pk/app/kindshare-app/id6752961693" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.kindshare.app" },
    ],
  },
  {
    id: "eclaim",
    title: "eClaim",
    tagline: "Expense claims without the paperwork.",
    description:
      "An enterprise claims app for EngageNova. Employees file petty cash, transport and overseas claims with receipt images or PDFs, managers approve in-app and finance sees totals at a glance.",
    highlights: ["Multi-level approval workflow", "Image and PDF receipt verification", "Monthly claim status charts"],
    kind: ["mobile"],
    stack: ["Flutter", "REST APIs"],
    year: "2023",
    role: "Mobile engineer",
    client: "EngageNova / Fujitec",
    accent: "#ef4444",
    links: [
      { type: "appstore", url: "https://apps.apple.com/pk/app/engagenova-eclaims/id1556445883" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.fujitec.fujitec_eclaim" },
    ],
  },
  {
    id: "moshaf",
    title: "Moshaf · Kuwait Quran",
    tagline: "The Holy Quran, page-perfect on any screen.",
    description:
      "Official Quran app for the State of Kuwait. High-resolution vector pages, full-text search, ayah-by-ayah audio, tafseer and translation, built to feel like the printed mushaf.",
    highlights: ["Vector page rendering at any zoom", "Ayah-by-ayah audio and tafseer", "Full-text search across the Quran"],
    kind: ["mobile"],
    stack: ["Flutter", "SQLite", "Audio streaming"],
    year: "2023",
    role: "Mobile engineer",
    client: "Government of Kuwait",
    accent: "#b08968",
    links: [
      { type: "appstore", url: "https://apps.apple.com/us/app/kuwait-quran-%D9%85%D8%B5%D8%AD%D9%81-%D8%AF%D9%88%D9%84%D8%A9-%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA/id1661634739" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=kw.gov.qsa.quranapp&hl=ur" },
    ],
  },
  {
    id: "matchark",
    title: "Matchark",
    tagline: "Find a club. Recruit players.",
    description:
      "A football community app for the UK. Players discover clubs looking for their position on a map, and clubs recruit from a pool of actively searching players.",
    highlights: ["Map search filtered by position and level", "Club recruiting profiles", "In-app messaging"],
    kind: ["mobile"],
    stack: ["Flutter", "Google Maps", "Firebase"],
    year: "2023",
    role: "Mobile engineer",
    accent: "#22c55e",
    links: [{ type: "appstore", url: "https://apps.apple.com/pk/app/matchark/id1671819584" }],
  },
  {
    id: "my-black-market",
    title: "My Black Market",
    tagline: "Live crypto rates and OTC vendors.",
    description:
      "A crypto rates app for the Nigerian market: live USDT and BTC rates, parallel market FX, verified OTC vendors and a curated news feed.",
    highlights: ["Live rates with change indicators", "Verified OTC vendor directory", "Crypto news feed"],
    kind: ["mobile"],
    stack: ["Flutter", "Firebase", "REST APIs"],
    year: "2023",
    role: "Mobile engineer",
    accent: "#f59e0b",
    links: [
      { type: "appstore", url: "https://apps.apple.com/pk/app/my-black-market/id6446054554" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.myblackmarkete.cypto_app" },
    ],
  },
  {
    id: "mashrab-e-naab",
    title: "Mashrab e Naab",
    tagline: "A monthly Urdu magazine, in your pocket.",
    description:
      "Digital edition of a monthly Urdu publication. Readers browse issues, search articles and read offline with a right-to-left layout designed for Urdu typography.",
    highlights: ["Issue archive with search", "Right-to-left reading layout", "Offline downloads"],
    kind: ["mobile"],
    stack: ["Flutter", "Firebase"],
    year: "2022",
    role: "Mobile engineer",
    accent: "#ea580c",
    links: [
      { type: "appstore", url: "https://apps.apple.com/pk/app/mashrab-e-naab/id6443939739" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.azaan.mashrabenaab" },
    ],
  },
  {
    id: "xrossapps",
    title: "XrossApps",
    tagline: "Transforming ideas into digital reality.",
    description:
      "The website for my software studio. Services, portfolio, articles and a quote flow for clients who want a cross-platform app built from concept to App Store.",
    highlights: ["Service and case-study pages", "Quote request flow", "Articles and SEO"],
    kind: ["web"],
    stack: ["Next.js", "React", "Tailwind CSS"],
    year: "2025",
    role: "Founder · Full-stack",
    accent: "#0ea5e9",
    links: [{ type: "web", url: "https://www.xrossapps.com/" }],
  },
  {
    id: "cars-bazaar",
    title: "Cars Bazaar",
    tagline: "Browse thousands of used cars.",
    description:
      "A used-car marketplace for the web. Buyers search by make, model, city and budget, chat with sellers and post their own listings in minutes.",
    highlights: ["Faceted search by make, city and budget", "Buyer and seller chat", "Sell-now listing flow"],
    kind: ["web"],
    stack: ["Flutter Web", "Firebase"],
    year: "2024",
    role: "Full-stack engineer",
    accent: "#f97316",
    links: [{ type: "web", url: "https://carsbazzaar.web.app/" }],
  },
  {
    id: "bache-erp",
    title: "Bache DMS",
    tagline: "Corporate records, organised.",
    description:
      "A document management system for companies. Governance, compliance, HR and finance records live in structured categories with uploads, search and audit trails.",
    highlights: ["Hierarchical document categories", "Upload with metadata and search", "Role-based access"],
    kind: ["web"],
    stack: ["Flutter Web", "Firebase"],
    year: "2024",
    role: "Full-stack engineer",
    accent: "#64748b",
    links: [{ type: "web", url: "https://bachegateway.web.app/" }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const projectById = (id: string) => projects.find((p) => p.id === id);
export const projectImage = (id: string) => `/img/projects/${id}.webp`;

export const hasStoreLink = (p: Project) =>
  p.links.some((l) => l.type === "appstore" || l.type === "playstore");
