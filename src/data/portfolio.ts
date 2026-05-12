export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  description?: string;
  techStack?: string[];
  links: PortfolioLink[];
  /**
   * Live Apps page lists any item that has **both** App Store and Play Store links.
   * Set this to `true` to also show on Live Apps when you do not have both (e.g. iOS-only, Play + web).
   */
  includeOnLiveApps?: boolean;
}

export interface PortfolioLink {
  type: "appstore" | "playstore" | "web" | "youtube" | "android" | "github";
  url: string;
  label?: string;
}

/** True if the item links to both App Store and Google Play. */
export function hasBothStorefrontLinks(item: PortfolioItem): boolean {
  const types = new Set(item.links.map((l) => l.type));
  return types.has("appstore") && types.has("playstore");
}

/** Live Apps: both storefronts, or `includeOnLiveApps` (see `mobileProjects`). */
export function appearsOnLiveApps(item: PortfolioItem): boolean {
  if (item.includeOnLiveApps) return true;
  return hasBothStorefrontLinks(item);
}

export const websiteProjects: PortfolioItem[] = [
  {
    id: "crm-website",
    title: "CRM Website",
    image: "/img/port0.png",
    links: [{ type: "web", url: "https://app.salesbuckets.com/" }],
  },
  {
    id: "bache-erp",
    title: "Bache ERP",
    image: "/img/bache.png",
    links: [{ type: "web", url: "https://bachegateway.web.app/#/minified:ps" }],
  },
  {
    id: "cars-bazaar",
    title: "Cars Bazaar",
    image: "/img/carbazaar.png",
    links: [{ type: "web", url: "https://carsbazzaar.web.app/" }],
  },
  {
    id: "xrossapps",
    title: "XrossApps",
    image: "/img/xrossapps.png",
    links: [{ type: "web", url: "https://www.xrossapps.com/" }],
  },
  {
    id: "crossresume",
    title: "CrossResume",
    image: "/img/crossresume.png",
    links: [{ type: "web", url: "https://crossresume.web.app/" }],
  },
];

/** Canonical list for the Mobile Apps page. Live Apps is derived via `appearsOnLiveApps`. */
export const mobileProjects: PortfolioItem[] = [
  {
    id: "wallets-friend",
    title: "Wallets Friend",
    image: "/img/wallets-friend.png",
    includeOnLiveApps: true,
    links: [
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.xrossapps.walletsfriend",
      },
      { type: "web", url: "https://walletsfriend.web.app/" },
    ],
  },
  {
    id: "baker-baby",
    title: "Baker Baby",
    image: "/img/bakerbaby.png",
    links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/us/app/baker-baby/id6747993789",
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
    id: "kindshare",
    title: "KindShare",
    image: "/img/kindshare.png",
    links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/pk/app/kindshare-app/id6752961693",
      },
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.kindshare.app",
      },
    ],
  },
  {
    id: "hit-rewind",
    title: "Hit Rewind (iOS & Apple TV)",
    image: "/img/hitrewind.png",
    includeOnLiveApps: true,
    links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/us/app/music-videos-hit-rewind/id6479374259",
      },
    ],
  },
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
    includeOnLiveApps: true,
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
];

/** Derived from `mobileProjects`: both storefronts, or `includeOnLiveApps`. */
export const liveApps: PortfolioItem[] = mobileProjects.filter(appearsOnLiveApps);
