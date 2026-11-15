import { projectShareImage, projects, type Project } from "./projects";

export const SITE_URL = "https://alihumza.com";
export const PERSON_ID = `${SITE_URL}/#person`;

export interface PageSeo {
  /** Route path with a trailing slash (pages are published as folders). */
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  /** Site-relative 1200x630 JPEG for link previews; defaults to /og.jpg. */
  image?: string;
  imageAlt?: string;
}

export const DEFAULT_SHARE = {
  image: "/og.jpg",
  alt: "Ali Humza, software engineer: builds apps people open",
};

export const pageSeo = {
  home: {
    path: "/",
    title: "Ali Humza (Ali Hamza) — Software Engineer in Lahore",
    description:
      "Ali Humza, also spelled Ali Hamza, is a software engineer in Lahore, Pakistan. Full-stack and mobile: Flutter, React Native, Next.js. 10+ apps in the stores.",
  },
  work: {
    path: "/work/",
    title: "Work — Apps and Products by Ali Humza, Software Engineer",
    description:
      "15 shipped projects by software engineer Ali Humza: Flutter and React Native apps on the App Store and Google Play, Next.js products and SaaS tools.",
  },
  about: {
    path: "/about/",
    title: "About Ali Humza (Ali Hamza) — Software Engineer, Lahore",
    description:
      "Who Ali Humza is: a software engineer from Lahore, FAST NUCES graduate, engineer at Breeze Labs and founder of XrossApps. Experience, toolkit and how he works.",
  },
  reviews: {
    path: "/reviews/",
    title: "Client Reviews — Ali Humza, Top Rated Software Engineer",
    description:
      "Verified Upwork reviews for software engineer Ali Humza (Ali Hamza): 5.0 average rating, 100% job success, Top Rated since 2020.",
  },
  resume: {
    path: "/resume/",
    title: "Resume — Ali Hamza (Ali Humza), Full-Stack Software Engineer",
    description:
      "Resume of Ali Hamza, full-stack software engineer: React, Next.js, Flutter, React Native, NestJS and Django. Read online or download as PDF or DOCX.",
  },
  contact: {
    path: "/contact/",
    title: "Contact Ali Humza — Hire a Software Engineer in Lahore",
    description:
      "Hire Ali Humza for mobile apps, web products and backends. Email, WhatsApp and social links. Based in Lahore (UTC+5), working remotely worldwide.",
  },
  game: {
    path: "/game/",
    title: "Play 2048 — Ali Humza",
    description: "A quick game of 2048 on Ali Humza's portfolio.",
    noindex: true,
  },
  payment: {
    path: "/payment-method/",
    title: "Payment Methods — Ali Humza",
    description: "Official payment details for Ali Humza.",
    noindex: true,
  },
  paymentInternational: {
    path: "/payment-method/international/",
    title: "International Payment — Ali Humza",
    description: "Official international payment details for Ali Humza.",
    noindex: true,
  },
} satisfies Record<string, PageSeo>;

const kindLabel = (p: Project) =>
  p.kind.includes("mobile") ? "Mobile App" : p.kind.includes("web") ? "Web App" : "Product";

export const projectPath = (id: string) => `/work/${id}/`;

export function projectSeo(p: Project): PageSeo {
  const base = `${p.tagline} ${p.description}`;
  return {
    path: projectPath(p.id),
    title: `${p.title} — ${kindLabel(p)} by Ali Humza`,
    description: base.length > 158 ? `${base.slice(0, 155).trimEnd()}…` : base,
    image: projectShareImage(p.id),
    imageAlt: `${p.title}: ${p.tagline}`,
  };
}

export function projectJsonLd(p: Project) {
  const url = `${SITE_URL}${projectPath(p.id)}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#work`,
      name: p.title,
      headline: p.tagline,
      description: p.description,
      url,
      image: `${SITE_URL}/img/projects/${p.id}.webp`,
      dateCreated: p.year,
      keywords: p.stack.join(", "),
      creator: { "@id": PERSON_ID },
      sameAs: p.links.map((l) => l.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ali Humza", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work/` },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    },
  ];
}

/** Every indexable route, used by the prerender script to build the sitemap. */
export const allProjectIds = projects.map((p) => p.id);
