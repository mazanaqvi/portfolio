import { Download, FileText, Printer } from "lucide-react";
import { resumeData } from "../data/resume";
import { RESUME_PDF_URL } from "../data/site";
import Reveal from "../components/ui/Reveal";

const ResumePage: React.FC = () => {
  const r = resumeData;
  const downloadDocx = async () => {
    const { downloadResume } = await import("../utils/generateResume");
    downloadResume();
  };
  return (
    <div className="page">
      <div className="container">
        <Reveal className="page-head">
          <span className="mono">Resume</span>
          <h1>
            The <span className="em">one-pager</span>
          </h1>
          <p>Read it here, or grab a PDF or Word copy for your ATS.</p>
        </Reveal>

        <Reveal delay={0.05} className="resume-toolbar">
          <a className="btn primary" href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer">
            <Download /> Download PDF
          </a>
          <button type="button" className="btn ghost" onClick={downloadDocx}>
            <FileText /> Download DOCX
          </button>
          <button type="button" className="btn soft" onClick={() => window.print()}>
            <Printer /> Print
          </button>
        </Reveal>

        <Reveal delay={0.1} className="resume-paper">
          <div className="rp-head">
            <div>
              <h1>{r.name}</h1>
              <div className="title">{r.title}</div>
              {r.technologies && <div className="tech">{r.technologies}</div>}
            </div>
            <div className="contact">
              <a href={`mailto:${r.email}`}>{r.email}</a>
              <br />
              {r.phone}
              <br />
              <a href={r.websiteUrl}>{r.website}</a> · {r.location}
            </div>
          </div>

          <div className="rp-section">
            <span className="mono">Summary</span>
            <p>{r.summary}</p>
          </div>

          <div className="rp-section">
            <span className="mono">Skills</span>
            <div>
              {r.skills.map((s) => (
                <div className="rp-skill" key={s.category}>
                  <strong>{s.category}</strong>
                  <span>{s.items}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rp-section">
            <span className="mono">Experience</span>
            <div>
              {r.experience.map((job) => (
                <div className="rp-job" key={job.company}>
                  <div className="rp-job-head">
                    <strong>{job.title}</strong>
                    <span className="dates">{job.dates}</span>
                  </div>
                  <div className="co">
                    {job.company} · {job.location}
                  </div>
                  <ul>
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="rp-section">
            <span className="mono">Projects</span>
            <div>
              {r.projects.map((p) => (
                <div className="rp-project" key={p.name}>
                  <strong>{p.name}</strong>
                  <div className="tech">{p.tech}</div>
                  <p>{p.description}</p>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      {p.link.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rp-section">
            <span className="mono">Education</span>
            <div>
              {r.education.map((e) => (
                <div className="rp-job" key={e.institution}>
                  <div className="rp-job-head">
                    <strong>{e.degree}</strong>
                    <span className="dates">{e.dates}</span>
                  </div>
                  <div className="co">
                    {e.institution} · {e.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default ResumePage;
