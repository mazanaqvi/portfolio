import { experience } from "../../data/site";
import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";

const Experience: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <section className="section" id="experience">
    <div className="container">
      <SectionHead
        eyebrow="Experience"
        title={
          <>
            Where I've <span className="em">worked</span>
          </>
        }
        text="Remote-first since day one. Product studios, a streaming startup, and a long run of freelance clients."
      />
      <div className="exp-list">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05} className="exp-item">
            <div className="exp-when">
              <span className="period">{job.period}</span>
              <span className="loc">{job.location}</span>
              {job.current && (
                <span className="now">
                  <span className="dot" /> Current
                </span>
              )}
            </div>
            <div className="exp-main">
              <h3>{job.role}</h3>
              <div className="company">{job.company}</div>
              <p className="summary">{job.summary}</p>
              {!compact && (
                <ul>
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              <div className="stack">
                {job.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
