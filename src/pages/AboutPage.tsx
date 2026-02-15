import { useEffect, useRef, useState } from "react";
import SkillBar from "../components/About/SkillBar";
import StatCard from "../components/About/StatCard";
import Timeline from "../components/About/Timeline";
import { skills, stats, education, career, RESUME_DOWNLOAD_LINK } from "../data/about";

const AboutPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`container about active ${visible ? "page-visible" : ""}`}
      id="about"
      ref={ref}
    >
      <div className="page-header anim-fade-up">
        <span className="page-tag"><i className="fas fa-user"></i> About</span>
        <h2 className="page-title">
          Know <span className="highlight">About Me</span>
        </h2>
        <p className="page-subtitle">
          A passionate software engineer building impactful products across platforms.
        </p>
      </div>

      <div className="about-container">
        <div className="left-about anim-fade-up" style={{ animationDelay: "0.2s" }}>
          <h4>Who I Am</h4>
          <p>
            I'm a software engineer passionate about pushing the boundaries of
            what's possible with mobile and web technologies. With 5+ years of
            experience, I turn complex ideas into elegant, user-friendly applications.
          </p>
          <p>
            I eagerly learn the latest advancements in technology and constantly
            grow alongside my work -- always building, always improving.
          </p>
          <div className="btn-con">
            <a href={RESUME_DOWNLOAD_LINK} className="main-btn" download>
              <span className="btn-text">Download Resume</span>
              <span className="btn-icon">
                <i className="fas fa-download"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="right-about anim-fade-up" style={{ animationDelay: "0.4s" }}>
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>

      <div className="about-stats anim-fade-up" style={{ animationDelay: "0.5s" }}>
        <h4 className="section-heading">
          <i className="fas fa-code"></i> My Skills
        </h4>
        <div className="progress-bars">
          {skills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>

      <div className="anim-fade-up" style={{ animationDelay: "0.6s" }}>
        <h4 className="section-heading">
          <i className="fas fa-clock"></i> My Timeline
        </h4>
        <Timeline title="Education" items={education} />
        <Timeline title="Career" items={career} />
      </div>
    </section>
  );
};

export default AboutPage;
