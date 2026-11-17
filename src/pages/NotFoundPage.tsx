import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import { featuredProjects } from "../data/projects";
import { notFoundSeo, projectPath } from "../data/seo";
import { useSeo } from "../hooks/useSeo";
import Reveal from "../components/ui/Reveal";

const NotFoundPage: React.FC = () => {
  const { pathname } = useLocation();
  useSeo(notFoundSeo(pathname));

  return (
    <div className="page not-found">
      <div className="container">
        <Reveal className="page-head">
          <span className="mono">404 · Page not found</span>
          <h1>
            This page <span className="em">doesn't exist</span>
          </h1>
          <p>
            The link may be old or mistyped. <code>{pathname}</code> isn't on this site, but these are.
          </p>
        </Reveal>
        <Reveal delay={0.05} className="not-found-actions">
          <Link to="/" className="btn primary">
            <Home /> Home
          </Link>
          <Link to="/work/" className="btn ghost">
            All projects <ArrowRight className="btn-arrow" />
          </Link>
          <Link to="/contact/" className="btn soft">
            Contact
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="not-found-list">
          <span className="mono">Popular projects</span>
          <ul>
            {featuredProjects.slice(0, 5).map((p) => (
              <li key={p.id}>
                <Link to={projectPath(p.id)}>
                  <strong>{p.title}</strong>
                  <span>{p.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
};

export default NotFoundPage;
