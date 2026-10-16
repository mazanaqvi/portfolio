import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navItems, site, socials } from "../../data/site";

function lahoreTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: site.timezone,
  }).format(new Date());
}

const Footer: React.FC = () => {
  const [time, setTime] = useState(lahoreTime);
  useEffect(() => {
    const id = window.setInterval(() => setTime(lahoreTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>{site.name}</h3>
            <p>Full-stack and mobile engineer. Building apps people open every day, from {site.location}.</p>
          </div>
          <div className="footer-col">
            <span className="mono">Pages</span>
            <Link to="/">Home</Link>
            {navItems.map((n) => (
              <Link key={n.path} to={n.path}>
                {n.label}
              </Link>
            ))}
            <Link to="/game">Play 2048</Link>
          </div>
          <div className="footer-col">
            <span className="mono">Elsewhere</span>
            {socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
                {s.name}
              </a>
            ))}
            <a href={site.company.url} target="_blank" rel="noopener noreferrer">
              {site.company.name}
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. Built with React, Vite and too much coffee.
          </span>
          <span className="clock">
            <span className="dot" />
            Lahore {time}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
