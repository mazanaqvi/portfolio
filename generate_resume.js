// ─────────────────────────────────────────────────────────────
//  Ali Hamza — Resume Generator
//  Usage:  node generate_resume.js
//  Output: Ali_Hamza_Resume.docx
//
//  Dependencies:
//    npm install docx
// ─────────────────────────────────────────────────────────────

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  LevelFormat,
  BorderStyle,
  TabStopType,
  TabStopPosition,
  ExternalHyperlink,
} = require("docx");
const fs = require("fs");

// ── Colour palette (monochrome — ATS safe, professional) ─────
const BODY = "2D2D2D"; // main body text
const MUTED = "555555"; // dates, locations, secondary text
const DARK = "111111"; // name, section headings

// ── Helper: thin horizontal rule ─────────────────────────────
function rule() {
  return new Paragraph({
    spacing: { before: 0, after: 100 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: "222222", space: 1 },
    },
    children: [],
  });
}

// ── Helper: section heading + rule ───────────────────────────
function sectionHead(text) {
  return [
    new Paragraph({
      spacing: { before: 240, after: 40 },
      children: [
        new TextRun({
          text: text.toUpperCase(),
          bold: true,
          size: 21,
          color: DARK,
          font: "Calibri",
          characterSpacing: 60,
        }),
      ],
    }),
    rule(),
  ];
}

// ── Helper: job title row + company row ──────────────────────
function jobHeader(title, company, location, dates) {
  return [
    new Paragraph({
      spacing: { before: 160, after: 18 },
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 21,
          color: BODY,
          font: "Calibri",
        }),
        new TextRun({ text: "\t", font: "Calibri" }),
        new TextRun({ text: dates, size: 19, color: MUTED, font: "Calibri" }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 20 },
      children: [
        new TextRun({
          text: company,
          size: 20,
          color: BODY,
          font: "Calibri",
          italics: true,
        }),
        new TextRun({
          text: "  ·  " + location,
          size: 19,
          color: MUTED,
          font: "Calibri",
        }),
      ],
    }),
  ];
}

// ── Helper: one-line company context description ──────────────
function companyDesc(text) {
  return new Paragraph({
    spacing: { before: 0, after: 56 },
    children: [new TextRun({ text, size: 19, color: MUTED, font: "Calibri" })],
  });
}

// ── Helper: bullet point ─────────────────────────────────────
function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 36, after: 36 },
    children: [new TextRun({ text, size: 20, color: BODY, font: "Calibri" })],
  });
}

// ── Helper: skill row ─────────────────────────────────────────
function skillRow(category, skills) {
  return new Paragraph({
    spacing: { before: 48, after: 48 },
    children: [
      new TextRun({
        text: category + ":  ",
        bold: true,
        size: 20,
        color: BODY,
        font: "Calibri",
      }),
      new TextRun({ text: skills, size: 20, color: MUTED, font: "Calibri" }),
    ],
  });
}

// ── Helper: project entry ─────────────────────────────────────
// link param: pass full URL string or empty string for no link
function project(name, tech, description, link) {
  const lines = [
    new Paragraph({
      spacing: { before: 140, after: 28 },
      children: [
        new TextRun({
          text: name,
          bold: true,
          size: 20,
          color: BODY,
          font: "Calibri",
        }),
        new TextRun({
          text: "  —  " + tech,
          size: 19,
          italics: true,
          color: MUTED,
          font: "Calibri",
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 36 },
      children: [
        new TextRun({
          text: description,
          size: 20,
          color: BODY,
          font: "Calibri",
        }),
      ],
    }),
  ];
  if (link) {
    lines.push(
      new Paragraph({
        spacing: { before: 0, after: 56 },
        children: [
          new ExternalHyperlink({
            link: link,
            children: [
              new TextRun({
                text: link,
                size: 19,
                color: MUTED,
                underline: {},
                font: "Calibri",
              }),
            ],
          }),
        ],
      }),
    );
  }
  return lines;
}

// ── Document ──────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "-",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 400, hanging: 240 } } },
          },
        ],
      },
    ],
  },
  styles: {
    default: { document: { run: { font: "Calibri", size: 20, color: BODY } } },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 }, // US Letter
          margin: { top: 1000, right: 1200, bottom: 1000, left: 1200 },
        },
      },
      children: [
        // ── NAME ───────────────────────────────────────────────
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 80 },
          children: [
            new TextRun({
              text: "Ali Hamza",
              bold: true,
              size: 56,
              color: DARK,
              font: "Calibri",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 70 },
          children: [
            new TextRun({
              text: "Full-Stack Engineer  ·  React · Flutter · React Native · Node.js",
              size: 22,
              color: MUTED,
              font: "Calibri",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 100 },
          children: [
            new TextRun({
              text: "alihumza.dev@gmail.com",
              size: 19,
              color: MUTED,
              font: "Calibri",
            }),
            new TextRun({
              text: "  ·  +92 303 3999512  ·  ",
              size: 19,
              color: MUTED,
              font: "Calibri",
            }),
            new ExternalHyperlink({
              link: "https://alihumza.com",
              children: [
                new TextRun({
                  text: "alihumza.com",
                  size: 19,
                  color: MUTED,
                  underline: {},
                  font: "Calibri",
                }),
              ],
            }),
            new TextRun({
              text: "  ·  Lahore, Pakistan",
              size: 19,
              color: MUTED,
              font: "Calibri",
            }),
          ],
        }),
        // Full-width rule under header
        new Paragraph({
          spacing: { before: 0, after: 120 },
          border: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 10,
              color: "111111",
              space: 1,
            },
          },
          children: [],
        }),

        // ── SUMMARY ────────────────────────────────────────────
        ...sectionHead("Summary"),
        new Paragraph({
          spacing: { before: 80, after: 100 },
          children: [
            new TextRun({
              text: "Full-stack engineer with 4 years shipping web and cross-platform mobile applications using React, Flutter, and React Native, backed by scalable Node.js, NestJS, and Django backends. Deployed 10+ live apps on Google Play and the App Store. Hands-on experience with LLM code generation model training, crypto trading automation, and healthcare app development. Comfortable owning features end-to-end across the full stack — from frontend UI to API integration, auth, and deployment.",
              size: 20,
              color: BODY,
              font: "Calibri",
            }),
          ],
        }),

        // ── SKILLS ─────────────────────────────────────────────
        ...sectionHead("Skills"),
        skillRow(
          "Frontend",
          "React.js · Next.js · JavaScript (ES6+) · HTML5 · CSS3 · Responsive Design · Material UI",
        ),
        skillRow(
          "Mobile",
          "Flutter · React Native · Swift (iOS/tvOS) · Android Native · FlutterFlow · Cordova",
        ),
        skillRow(
          "Backend",
          "NestJS · Node.js · Django · REST APIs · Firebase · MongoDB · PostgreSQL",
        ),
        skillRow(
          "AI / ML",
          "LangChain · LLM Code Generation Training · OpenAI API · Weaviate · Vector Search",
        ),
        skillRow(
          "Infrastructure",
          "AWS · Google Cloud · Docker · Auth0 · OneSignal · APNs · iOS/Android App Store deployment",
        ),
        skillRow(
          "Tools",
          "Git · GitHub · Bitbucket · Jira · Notion · Airtable",
        ),

        // ── EXPERIENCE ─────────────────────────────────────────
        ...sectionHead("Experience"),

        // Breeze Labs
        ...jobHeader(
          "Full-Stack Software Engineer",
          "Breeze Labs",
          "Singapore (Remote)",
          "Feb 2024 – Present",
        ),
        companyDesc(
          "Breeze Labs is a Singapore-based software studio building SaaS products and custom solutions across web, mobile, and AI. The team delivers CRM platforms, mobile apps, and AI-powered automation tools for clients in the US and GCC markets.",
        ),
        bullet(
          "Built and maintained scalable web applications using React and Next.js, owning features from design handoff to production release.",
        ),
        bullet(
          "Led mobile development using Flutter and React Native; managed full App Store and Play Store release cycles for 3 production apps.",
        ),
        bullet(
          "Contributed to LLM code generation model training — curating datasets, designing prompts, and evaluating outputs against code quality benchmarks.",
        ),
        bullet(
          "Developed a Django-based automated crypto trading bot integrating Binance APIs for real-time signal processing, order execution, and portfolio tracking.",
        ),
        bullet(
          "Integrated Twilio and FullEnrich REST APIs for real-time communication and automated lead enrichment in a CRM platform.",
        ),
        bullet(
          "Managed Node.js backend environments for Flutter and web apps, maintaining 99.8% uptime across production deployments.",
        ),

        // FrontRow
        ...jobHeader(
          "Mobile Application Developer",
          "FrontRow",
          "USA (Remote)",
          "Jun 2023 – Jan 2024",
        ),
        companyDesc(
          "FrontRow is a US-based entertainment platform delivering premium music video content to audiences on iOS and Apple TV. The product focuses on high-quality streaming experiences across Apple devices, with content managed via a flexible Airtable-powered backend.",
        ),
        bullet(
          "Built and owned iOS and tvOS UI in Swift (UIKit) for a music video streaming platform, taking features from design specs to production independently.",
        ),
        bullet(
          "Integrated YouTube iFrame API for in-app video playback with smooth performance across iPhone and Apple TV form factors.",
        ),
        bullet(
          "Consumed Airtable REST APIs to manage and render content metadata for 500+ media assets, enabling the content team to publish without engineering involvement.",
        ),

        // Wave
        ...jobHeader(
          "Full-Stack Software Engineer",
          "Wave",
          "USA (Remote)",
          "Jul 2022 – May 2023",
        ),
        companyDesc(
          "Wave is a US-based fintech and crypto product company building trading signal tools and automation platforms for retail crypto investors, including mobile signal feed apps and backend bots for automated execution.",
        ),
        bullet(
          "Developed a Flutter mobile application delivering real-time crypto trading signals and ticker data to retail users.",
        ),
        bullet(
          "Built the crypto signal bot backend in Django, integrating KuCoin REST APIs for live market data, signal processing, and automated order management.",
        ),
        bullet(
          "Designed the data pipeline for ingesting and normalising multi-exchange price feeds, enabling configurable strategy execution with live P&L tracking.",
        ),

        // ── PROJECTS ───────────────────────────────────────────
        ...sectionHead("Projects"),

        ...project(
          "Hit Rewind — Music Videos iOS & tvOS App",
          "Swift · UIKit · Airtable API · YouTube iFrame · Apple TV",
          "Native iOS and tvOS music video streaming app built in Swift with UIKit. Integrated YouTube iFrame API for in-app playback across iPhone and Apple TV, with all content and metadata managed through Airtable REST APIs — allowing the content team to publish and update videos without any code changes. Available on the Apple App Store.",
          "https://apps.apple.com/us/app/music-videos-hit-rewind/id6479374259",
        ),

        ...project(
          "SalesBuckets — CRM Web Platform",
          "Flutter Web · Firebase · Twilio · Node.js · Chrome Extension",
          "Web-based CRM with real-time communication via Twilio, automated lead enrichment via FullEnrich REST API, and a JavaScript Chrome extension for browser-native CRM access. Live in production.",
          "https://app.salesbuckets.com",
        ),

        ...project(
          "BakerBaby — Baby Healthcare App",
          "React Native · AWS · Auth0 · OneSignal",
          "Healthcare mobile application for infant care management. Built in React Native with AWS backend infrastructure, Auth0 SSO authentication, and OneSignal push notifications for health alerts and appointment reminders to parents. Available on the Apple App Store.",
          "https://apps.apple.com/us/iphone/search?term=bakerbaby",
        ),

        ...project(
          "Crypto Trading Bot",
          "Django · KuCoin API · Python · REST APIs",
          "Automated trading bot integrating real-time KuCoin market data for signal detection, order execution, and portfolio management. Configurable trading strategies with live P&L tracking and alert notifications.",
          "",
        ),

        // ── EDUCATION ──────────────────────────────────────────
        ...sectionHead("Education"),
        new Paragraph({
          spacing: { before: 100, after: 28 },
          tabStops: [
            { type: TabStopType.RIGHT, position: TabStopPosition.MAX },
          ],
          children: [
            new TextRun({
              text: "BS Computer Science",
              bold: true,
              size: 21,
              color: BODY,
              font: "Calibri",
            }),
            new TextRun({ text: "\t", font: "Calibri" }),
            new TextRun({
              text: "2018 – 2022",
              size: 19,
              color: MUTED,
              font: "Calibri",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 40 },
          children: [
            new TextRun({
              text: "FAST NUCES Lahore",
              size: 20,
              italics: true,
              color: BODY,
              font: "Calibri",
            }),
            new TextRun({
              text: "  ·  CGPA 3.3 / 4.0  ·  Dean's List, Spring 2021",
              size: 19,
              color: MUTED,
              font: "Calibri",
            }),
          ],
        }),
      ],
    },
  ],
});

// ── Write file ────────────────────────────────────────────────
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("Ali_Hamza_Resume.docx", buf);
  console.log("✓  Ali_Hamza_Resume.docx generated successfully");
});
