import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { about, education, site, RESUME_PDF_URL } from "../data/site";
import Reveal from "../components/ui/Reveal";
import Experience from "../components/home/Experience";
import Skills from "../components/home/Skills";
import { useSpotlight } from "../hooks/useSpotlight";

const Principle: React.FC<{ p: (typeof about.principles)[number]; i: number }> = ({ p, i }) => {
  const onMove = useSpotlight<HTMLDivElement>();
  return (
    <Reveal delay={i * 0.06} className="card spotlight principle" onMouseMove={onMove}>
      <div className="idx">0{i + 1}</div>
      <h3>{p.title}</h3>
      <p>{p.text}</p>
    </Reveal>
  );
};

const AboutPage: React.FC = () => (
  <>
    <div className="page">
      <div className="container">
        <Reveal className="page-head">
          <span className="mono">About</span>
          <h1>{about.headline}</h1>
        </Reveal>

        <div className="about-grid">
          <div className="about-text">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <Link to="/contact" className="btn primary">
                Work with me <ArrowRight className="btn-arrow" />
              </Link>
              <a className="btn ghost" href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer">
                <Download /> Resume PDF
              </a>
            </Reveal>
          </div>
          <div className="about-side">
            <Reveal className="card about-portrait">
              <img src="/img/hero.png" alt={`${site.name}, portrait`} width={380} height={532} />
            </Reveal>
            <Reveal delay={0.1} className="card fact-list">
              <div className="fact">
                <span className="k">Based in</span>
                <span className="v">{site.location}</span>
              </div>
              <div className="fact">
                <span className="k">Education</span>
                <span className="v">
                  {education.degree}
                  <br />
                  <span style={{ color: "var(--text-2)", fontWeight: 400 }}>
                    {education.school} · {education.period}
                  </span>
                </span>
              </div>
              <div className="fact">
                <span className="k">Studio</span>
                <span className="v">
                  <a href={site.company.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-text)" }}>
                    {site.company.name}
                  </a>
                </span>
              </div>
              <div className="fact">
                <span className="k">Status</span>
                <span className="v">{site.availability}</span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="section" style={{ paddingBottom: 0 }}>
          <Reveal className="section-head">
            <div>
              <span className="mono">How I work</span>
              <h2>
                Three things I <span className="em">won't compromise on</span>
              </h2>
            </div>
          </Reveal>
          <div className="principles">
            {about.principles.map((p, i) => (
              <Principle key={p.title} p={p} i={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
    <Experience />
    <Skills />
  </>
);

export default AboutPage;
