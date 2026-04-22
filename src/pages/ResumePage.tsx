import { downloadResume } from "../utils/generateResume";
import { RESUME_DOWNLOAD_LINK } from "../data/about";
import { resumeData } from "../data/resume";

const ResumePage: React.FC = () => {
  const r = resumeData;

  return (
    <section className="container about active page-visible">
      <div className="page-header anim-fade-up" style={{ textAlign: "center" }}>
        <span className="page-tag">
          <i className="fas fa-file-alt"></i> Resume
        </span>
        <h2 className="page-title">
          My <span className="highlight">Resume</span>
        </h2>
        <p className="page-subtitle">
          Download my resume or view it right here.
        </p>
      </div>

      <div className="resume-actions anim-fade-up" style={{ animationDelay: "0.2s" }}>
        {/* DEV: DOCX download button — uncomment to enable
        <button className="main-btn" onClick={() => downloadResume()}>
          <span className="btn-text">Download DOCX</span>
          <span className="btn-icon">
            <i className="fas fa-file-word"></i>
          </span>
        </button>
        */}
        <a href={RESUME_DOWNLOAD_LINK} className="main-btn" download>
          <span className="btn-text">Download PDF</span>
          <span className="btn-icon">
            <i className="fas fa-file-pdf"></i>
          </span>
        </a>
      </div>

      <div className="resume-viewer anim-fade-up" style={{ animationDelay: "0.3s" }}>
        <div className="resume-paper">
          <h1 className="rv-name">{r.name}</h1>
          <p className="rv-tagline">{r.title}</p>
          <p className="rv-contact">
            {r.email} &middot; {r.phone} &middot;{" "}
            <a href={r.websiteUrl} target="_blank" rel="noreferrer">
              {r.website}
            </a>{" "}
            &middot; {r.location}
          </p>

          <hr className="rv-divider rv-divider--thick" />

          <h2 className="rv-section-title">Summary</h2>
          <hr className="rv-divider" />
          <p className="rv-body">{r.summary}</p>

          <h2 className="rv-section-title">Skills</h2>
          <hr className="rv-divider" />
          <div className="rv-skills">
            {r.skills.map((skill) => (
              <p key={skill.category}>
                <strong>{skill.category}:</strong> {skill.items}
              </p>
            ))}
          </div>

          <h2 className="rv-section-title">Experience</h2>
          <hr className="rv-divider" />
          {r.experience.map((job) => (
            <div className="rv-job" key={job.company + job.dates}>
              <div className="rv-job-header">
                <strong>{job.title}</strong>
                <span className="rv-dates">{job.dates}</span>
              </div>
              <p className="rv-company">
                <em>{job.company}</em> &middot; {job.location}
              </p>
              <p className="rv-company-desc">{job.description}</p>
              <ul className="rv-bullets">
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}

          <h2 className="rv-section-title">Projects</h2>
          <hr className="rv-divider" />
          {r.projects.map((proj) => (
            <div className="rv-project" key={proj.name}>
              <p>
                <strong>{proj.name}</strong>
                <em> &mdash; {proj.tech}</em>
              </p>
              <p className="rv-body">{proj.description}</p>
              {proj.link && (
                <a
                  className="rv-link"
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {proj.link}
                </a>
              )}
            </div>
          ))}

          <h2 className="rv-section-title">Education</h2>
          <hr className="rv-divider" />
          {r.education.map((edu) => (
            <div className="rv-job" key={edu.institution}>
              <div className="rv-job-header">
                <strong>{edu.degree}</strong>
                <span className="rv-dates">{edu.dates}</span>
              </div>
              <p className="rv-company">
                <em>{edu.institution}</em> &middot; {edu.details}
              </p>
            </div>
          ))}
          <hr className="rv-divider" style={{ marginTop: "1.5rem" }} />
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              className="rv-download-btn"
              onClick={() => downloadResume()}
            >
              <i className="fas fa-file-word"></i> Download as DOCX
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumePage;
