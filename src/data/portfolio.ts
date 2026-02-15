export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  description?: string;
  techStack?: string[];
  links: PortfolioLink[];
}

export interface PortfolioLink {
  type: "appstore" | "playstore" | "web" | "youtube" | "android" | "github";
  url: string;
  label?: string;
}

export const websiteProjects: PortfolioItem[] = [
  {
    id: "crm-website",
    title: "CRM Website",
    image: "/img/port0.png",
    links: [{ type: "web", url: "https://app.salesbuckets.com/" }],
  },
  {
    id: "crypto-website",
    title: "Crypto Website",
    image: "/img/port12.png",
    links: [{ type: "web", url: "https://bitbuddy.ai/" }],
  },
];

export const mobileProjects: PortfolioItem[] = [
  {
    id: "eclaim-mobile",
    title: "Live App",
    image: "/img/port10.png",
    links: [
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.fujitec.fujitec_eclaim",
      },
      {
        type: "appstore",
        url: "https://apps.apple.com/pk/app/engagenova-eclaims/id1556445883",
      },
    ],
  },
  {
    id: "quran-mobile",
    title: "Live App",
    image: "/img/port11.png",
    links: [
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=kw.gov.qsa.quranapp&hl=ur",
      },
      {
        type: "appstore",
        url: "https://apps.apple.com/us/app/kuwait-quran-%D9%85%D8%B5%D8%AD%D9%81-%D8%AF%D9%88%D9%84%D8%A9-%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA/id1661634739",
      },
    ],
  },
  {
    id: "mashrab-mobile",
    title: "Live App",
    image: "/img/port2.png",
    links: [
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.azaan.mashrabenaab",
      },
      {
        type: "appstore",
        url: "https://apps.apple.com/pk/app/mashrab-e-naab/id6443939739",
      },
    ],
  },
  {
    id: "blackmarket-mobile",
    title: "Live App",
    image: "/img/port5.png",
    links: [
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.myblackmarkete.cypto_app",
      },
      {
        type: "appstore",
        url: "https://apps.apple.com/pk/app/my-black-market/id6446054554",
      },
    ],
  },
  {
    id: "ecommerce-demo",
    title: "App Demo",
    image: "/img/port7.png",
    links: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=EBiEi_3AOkc&ab_channel=AliHamza",
      },
    ],
  },
  {
    id: "flutter-material",
    title: "Made With,",
    image: "/img/port4.png",
    techStack: ["Flutter", "Material UI Kit"],
    links: [],
  },
  {
    id: "flutter-firebase",
    title: "Made With,",
    image: "/img/port6.png",
    techStack: ["Flutter", "Firebase"],
    links: [],
  },
  {
    id: "flutter-ml",
    title: "Made With,",
    image: "/img/port1.png",
    techStack: ["Flutter", "Firebase", "Machine Learning API"],
    links: [],
  },
];

export const liveApps: PortfolioItem[] = [
  {
    id: "matchark",
    title: "Matchark",
    image: "/img/port13.png",
    links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/pk/app/matchark/id1671819584",
      },
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.linethree.android.matchark",
      },
    ],
  },
  {
    id: "streetswag",
    title: "StreetSwag",
    image: "/img/port14.png",
    links: [
      {
        type: "android",
        url: "https://drive.google.com/uc?export=download&id=1SLO19cHaWPyBaDGTCAw8Tj570AWQ2HlA",
      },
    ],
  },
  {
    id: "moshaf",
    title: "Moshaf (Book reading app)",
    image: "/img/port11.png",
    links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/us/app/kuwait-quran-%D9%85%D8%B5%D8%AD%D9%81-%D8%AF%D9%88%D9%84%D8%A9-%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA/id1661634739",
      },
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=kw.gov.qsa.quranapp&hl=ur",
      },
    ],
  },
  {
    id: "blackmarket",
    title: "My Black Market",
    image: "/img/port5.png",
    links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/pk/app/my-black-market/id6446054554",
      },
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.myblackmarkete.cypto_app",
      },
    ],
  },
  {
    id: "wave-signals",
    title: "Wave Get Signals",
    image: "/img/port8.png",
    links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/pk/app/wave-get-signals/id1642561925",
      },
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.joinwave.waveinvest",
      },
    ],
  },
  {
    id: "mashrab-naab",
    title: "Mashrab e Naab",
    image: "/img/port2.png",
    links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/pk/app/mashrab-e-naab/id6443939739",
      },
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.azaan.mashrabenaab",
      },
    ],
  },
  {
    id: "eclaim",
    title: "eClaim",
    image: "/img/port10.png",
    links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/pk/app/engagenova-eclaims/id1556445883",
      },
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.fujitec.fujitec_eclaim",
      },
    ],
  },
  {
    id: "salesbucket",
    title: "Salesbucket",
    image: "/img/port0.png",
    links: [{ type: "web", url: "https://app.salesbuckets.com/" }],
  },
  {
    id: "front-row",
    title: "Front Row",
    image: "/img/port4.png",
    links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/pk/app/front-row-live-videos/id6450548577",
      },
    ],
  },
];
