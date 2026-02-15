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

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, index }) => {
  return (
    <div
      className="portfolio-item anim-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      <div className="image">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>
      <div className="hover-items">
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
              >
                <i className={linkIconMap[link.type]}></i>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;
