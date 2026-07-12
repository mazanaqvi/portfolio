import { useEffect, useRef, useState } from "react";
import type { PortfolioItem, PortfolioLink } from "../../data/portfolio";

const linkIconMap: Record<PortfolioLink["type"], string> = {
  appstore: "fab fa-app-store-ios",
  playstore: "fab fa-google-play",
  web: "fas fa-globe",
  youtube: "fab fa-youtube",
  android: "fab fa-android",
  github: "fab fa-github",
};

const linkLabelMap: Record<PortfolioLink["type"], string> = {
  appstore: "App Store",
  playstore: "Play Store",
  web: "Website",
  youtube: "YouTube",
  android: "Android",
  github: "GitHub",
};

const AUTO_FLIP_BACK_MS = 4000;

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, index }) => {
  const [loaded, setLoaded] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scheduleFlipBack = () => {
    clearTimer();
    timerRef.current = setTimeout(() => setFlipped(false), AUTO_FLIP_BACK_MS);
  };

  useEffect(() => clearTimer, []);

  const flipTo = (next: boolean) => {
    setFlipped(next);
    if (next) {
      scheduleFlipBack();
    } else {
      clearTimer();
    }
  };

  return (
    <div
      className="portfolio-item anim-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
      onMouseEnter={() => flipTo(true)}
      onMouseLeave={() => flipTo(false)}
      onClick={() => flipTo(!flipped)}
    >
      <div className={`flip-inner ${flipped ? "flipped" : ""}`}>
        <div className="flip-front">
          <div className="image">
            {!loaded && (
              <div className="portfolio-skeleton">
                <span className="portfolio-skeleton-text">{item.title}</span>
              </div>
            )}
            <img
              src={item.image}
              alt={item.title}
              decoding="async"
              className={loaded ? "loaded" : ""}
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
            />
          </div>
        </div>
        <div className="flip-back">
          <h3>{item.title}</h3>
          {item.techStack && item.techStack.length > 0 && (
            <div className="tech-tags">
              {item.techStack.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          )}
          {item.links.length > 0 && (
            <div className="icons">
              {item.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={linkLabelMap[link.type]}
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className={linkIconMap[link.type]}></i>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
