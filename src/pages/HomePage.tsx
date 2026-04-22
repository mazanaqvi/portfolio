import { useEffect, useState } from "react";
import { heroSocialLinks } from "../data/socialLinks";
import { heroContent } from "../data/content";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = heroContent.roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % heroContent.roles.length);
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
                alt="Ali Humza - Software Engineer"
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
              <span>{heroContent.greeting}</span>
            </div>

            <h1 className="hero-name anim-fade-up" style={{ animationDelay: "0.4s" }}>
              {heroContent.firstName} <span className="name-accent">{heroContent.lastName}</span>
            </h1>

            <div className="hero-role anim-fade-up" style={{ animationDelay: "0.6s" }}>
              <span className="role-prefix">{heroContent.rolePrefix}</span>
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
              {heroContent.heroStats.map((stat, i) => (
                <span key={stat.label} style={{ display: "contents" }}>
                  {i > 0 && <div className="hero-stat-divider"></div>}
                  <div className="hero-stat">
                    <span className="hero-stat-number">{stat.number}</span>
                    <span className="hero-stat-label">{stat.label}</span>
                  </div>
                </span>
              ))}
            </div>

            <div className="hero-actions anim-fade-up" style={{ animationDelay: "1.2s" }}>
              <Link to="/resume" className="main-btn">
                <span className="btn-text">View Resume</span>
                <span className="btn-icon">
                  <i className="fas fa-file-alt"></i>
                </span>
              </Link>
              <Link to="/contact" className="main-btn company-btn">
                <span className="btn-text">Get In Touch</span>
                <span className="btn-icon">
                  <i className="fas fa-envelope"></i>
                </span>
              </Link>
            </div>

            <div className="hero-social-links anim-fade-up" style={{ animationDelay: "1.4s" }}>
              <h4>{heroContent.socialHeading}</h4>
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
