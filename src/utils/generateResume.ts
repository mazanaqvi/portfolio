import {
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
} from "docx";
import { resumeData } from "../data/resume";

const BODY = "2D2D2D";
const MUTED = "555555";
const DARK = "111111";

function rule(): Paragraph {
  return new Paragraph({
    spacing: { before: 0, after: 100 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: "222222", space: 1 },
    },
    children: [],
  });
}

function sectionHead(text: string): Paragraph[] {
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

function jobHeader(
  title: string,
  company: string,
  location: string,
  dates: string
): Paragraph[] {
  return [
    new Paragraph({
      spacing: { before: 160, after: 18 },
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      children: [
        new TextRun({ text: title, bold: true, size: 21, color: BODY, font: "Calibri" }),
        new TextRun({ text: "\t", font: "Calibri" }),
        new TextRun({ text: dates, size: 19, color: MUTED, font: "Calibri" }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 20 },
      children: [
        new TextRun({ text: company, size: 20, color: BODY, font: "Calibri", italics: true }),
        new TextRun({ text: "  ·  " + location, size: 19, color: MUTED, font: "Calibri" }),
      ],
    }),
  ];
}

function companyDesc(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 0, after: 56 },
    children: [new TextRun({ text, size: 19, color: MUTED, font: "Calibri" })],
  });
}

function bulletPara(text: string): Paragraph {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 36, after: 36 },
    children: [new TextRun({ text, size: 20, color: BODY, font: "Calibri" })],
  });
}

function skillRow(category: string, items: string): Paragraph {
  return new Paragraph({
    spacing: { before: 48, after: 48 },
    children: [
      new TextRun({ text: category + ":  ", bold: true, size: 20, color: BODY, font: "Calibri" }),
      new TextRun({ text: items, size: 20, color: MUTED, font: "Calibri" }),
    ],
  });
}

function projectBlock(
  name: string,
  tech: string,
  description: string,
  link?: string
): Paragraph[] {
  const lines: Paragraph[] = [
    new Paragraph({
      spacing: { before: 140, after: 28 },
      children: [
        new TextRun({ text: name, bold: true, size: 20, color: BODY, font: "Calibri" }),
        new TextRun({ text: "  —  " + tech, size: 19, italics: true, color: MUTED, font: "Calibri" }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 36 },
      children: [new TextRun({ text: description, size: 20, color: BODY, font: "Calibri" })],
    }),
  ];
  if (link) {
    lines.push(
      new Paragraph({
        spacing: { before: 0, after: 56 },
        children: [
          new ExternalHyperlink({
            link,
            children: [
              new TextRun({ text: link, size: 19, color: MUTED, underline: {}, font: "Calibri" }),
            ],
          }),
        ],
      })
    );
  }
  return lines;
}

function buildResumeDocument(): Document {
  const r = resumeData;

  const experienceChildren = r.experience.flatMap((job) => [
    ...jobHeader(job.title, job.company, job.location, job.dates),
    companyDesc(job.description),
    ...job.bullets.map((b) => bulletPara(b)),
  ]);

  const projectChildren = r.projects.flatMap((p) =>
    projectBlock(p.name, p.tech, p.description, p.link)
  );

  const educationChildren = r.education.flatMap((edu) => [
    new Paragraph({
      spacing: { before: 100, after: 28 },
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      children: [
        new TextRun({ text: edu.degree, bold: true, size: 21, color: BODY, font: "Calibri" }),
        new TextRun({ text: "\t", font: "Calibri" }),
        new TextRun({ text: edu.dates, size: 19, color: MUTED, font: "Calibri" }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({ text: edu.institution, size: 20, italics: true, color: BODY, font: "Calibri" }),
        new TextRun({ text: "  ·  " + edu.details, size: 19, color: MUTED, font: "Calibri" }),
      ],
    }),
  ]);

  return new Document({
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
      default: {
        document: { run: { font: "Calibri", size: 20, color: BODY } },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1000, right: 1200, bottom: 1000, left: 1200 },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 80 },
            children: [
              new TextRun({ text: r.name, bold: true, size: 56, color: DARK, font: "Calibri" }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 70 },
            children: [
              new TextRun({ text: r.title, size: 22, color: MUTED, font: "Calibri" }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 100 },
            children: [
              new TextRun({ text: r.email, size: 19, color: MUTED, font: "Calibri" }),
              new TextRun({ text: `  ·  ${r.phone}  ·  `, size: 19, color: MUTED, font: "Calibri" }),
              new ExternalHyperlink({
                link: r.websiteUrl,
                children: [
                  new TextRun({ text: r.website, size: 19, color: MUTED, underline: {}, font: "Calibri" }),
                ],
              }),
              new TextRun({ text: `  ·  ${r.location}`, size: 19, color: MUTED, font: "Calibri" }),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 120 },
            border: {
              bottom: { style: BorderStyle.SINGLE, size: 10, color: "111111", space: 1 },
            },
            children: [],
          }),

          ...sectionHead("Summary"),
          new Paragraph({
            spacing: { before: 80, after: 100 },
            children: [
              new TextRun({ text: r.summary, size: 20, color: BODY, font: "Calibri" }),
            ],
          }),

          ...sectionHead("Skills"),
          ...r.skills.map((s) => skillRow(s.category, s.items)),

          ...sectionHead("Experience"),
          ...experienceChildren,

          ...sectionHead("Projects"),
          ...projectChildren,

          ...sectionHead("Education"),
          ...educationChildren,
        ],
      },
    ],
  });
}

export async function downloadResume(): Promise<void> {
  const doc = buildResumeDocument();
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${resumeData.name.replace(/\s+/g, "_")}_Resume.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
