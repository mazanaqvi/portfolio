import { useEffect, useState } from "react";
import { heroSocialLinks } from "../data/socialLinks";
import { RESUME_DOWNLOAD_LINK } from "../data/about";

const roles = [
  "Flutter Developer",
  "Mobile App Engineer",
  "Full-Stack Developer",
  "Backend Architect",
  "React Native Developer",
];

const HomePage: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else if (isDeleting) {
      timeout = setTimeout(
        () => setDisplayText((prev) => prev.slice(0, -1)),
        40
      );
    } else {
      timeout = setTimeout(
        () => setDisplayText(currentRole.slice(0, displayText.length + 1)),
        80
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <header className="container header active" id="home">
      <div className="header-content">
        <div className="left-header">
          <div className="h-shape"></div>
          <div className="hero-image-container">
            <div className="image-wrapper">
              <img
                src="/img/hero.png"
                alt="Ali Hamza - Software Engineer"
                className="hero-image"
              />
            </div>
            <div className="image-decorations">
              <div className="floating-icon icon-1" title="Flutter">
                <img
                  src="/img/flutter.png"
                  alt="Flutter"
                  className="tech-icon-img"
                />
              </div>
              <div className="floating-icon icon-2" title="React">
                <i className="fab fa-react"></i>
              </div>
              <div className="floating-icon icon-3" title="Python">
                <i className="fab fa-python"></i>
              </div>
              <div className="floating-icon icon-4" title="JavaScript">
                <i className="fab fa-js-square"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="right-header">
          <div className="hero-text-wrapper">
            <div className="hero-greeting anim-fade-up" style={{ animationDelay: "0.2s" }}>
              <span className="greeting-line"></span>
              <span>Hello, I'm</span>
            </div>

            <h1 className="hero-name anim-fade-up" style={{ animationDelay: "0.4s" }}>
              Ali <span className="name-accent">Hamza</span>
            </h1>

            <div className="hero-role anim-fade-up" style={{ animationDelay: "0.6s" }}>
              <span className="role-prefix">I'm a</span>
              <span className="role-typing">
                {displayText}
                <span className="typing-cursor">|</span>
              </span>
            </div>

            <p className="hero-description anim-fade-up" style={{ animationDelay: "0.8s" }}>
              I specialize in building cross-platform mobile apps with
              <strong> Flutter</strong> and <strong>React Native</strong>,
              and crafting robust backend APIs with
              <strong> Node.js</strong> and <strong>Django</strong>.
            </p>

            <div className="hero-stats anim-fade-up" style={{ animationDelay: "1s" }}>
              <div className="hero-stat">
                <span className="hero-stat-number">20+</span>
                <span className="hero-stat-label">Projects</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-number">5+</span>
                <span className="hero-stat-label">Years Exp.</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-number">2+</span>
                <span className="hero-stat-label">Companies</span>
              </div>
            </div>

            <div className="hero-actions anim-fade-up" style={{ animationDelay: "1.2s" }}>
              <a href={RESUME_DOWNLOAD_LINK} className="main-btn" download>
                <span className="btn-text">Download Resume</span>
                <span className="btn-icon">
                  <i className="fas fa-download"></i>
                </span>
              </a>
              <a
                href="https://www.xrossapps.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="main-btn company-btn"
              >
                <span className="btn-text">My Company</span>
                <span className="btn-icon">
                  <i className="fas fa-external-link-alt"></i>
                </span>
              </a>
            </div>

            <div className="hero-social-links anim-fade-up" style={{ animationDelay: "1.4s" }}>
              <h4>Connect With Me</h4>
              <div className="hero-social-icons">
                {heroSocialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hero-social-link ${link.cssClass}`}
                    title={link.name}
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomePage;
