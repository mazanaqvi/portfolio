import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PROJECT_IMAGE, projectById, projectImage, projectSrcSet, projects } from "../data/projects";
import { notFoundSeo, projectJsonLd, projectPath, projectSeo } from "../data/seo";
import NotFoundPage from "./NotFoundPage";
import { useSeo } from "../hooks/useSeo";
import Reveal from "../components/ui/Reveal";
import StoreLink from "../components/ui/StoreLink";
import { storeRatings } from "../data/storeRatings";
import ContactCta from "../components/home/ContactCta";

const kindNames: Record<string, string> = { mobile: "Mobile app", web: "Web app", product: "My product" };

const platforms = (types: string[]) => {
  const out: string[] = [];
  if (types.includes("appstore")) out.push("iOS");
  if (types.includes("playstore")) out.push("Android");
  if (types.includes("web")) out.push("Web");
  return out.join(" · ");
};

const ProjectPage: React.FC = () => {
  const { id = "" } = useParams();
  const project = projectById(id);
  const { pathname } = useLocation();
  // Hooks run on every render; an unknown id gets the same tags as NotFoundPage.
  useSeo(project ? projectSeo(project) : notFoundSeo(pathname), project ? projectJsonLd(project) : undefined);

  if (!project) return <NotFoundPage />;

  const index = projects.findIndex((p) => p.id === project.id);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <article className="page case" style={{ "--accent-color": project.accent } as React.CSSProperties}>
        <div className="container">
          <Reveal>
            <Link to="/work/" className="case-back">
              <ArrowLeft /> All work
            </Link>
          </Reveal>

          <Reveal className="case-head">
            <span className="mono">
              {project.kind.map((k) => kindNames[k]).join(" · ")} · {project.year}
            </span>
            <h1>{project.title}</h1>
            <p className="case-tagline">{project.tagline}</p>
          </Reveal>

          <Reveal delay={0.05} className="card case-media">
            <img
              src={projectImage(project.id)}
              srcSet={projectSrcSet(project.id)}
              sizes="(max-width: 1260px) 100vw, 1180px"
              fetchPriority="high"
              alt={`${project.title} — ${project.tagline}`}
              width={PROJECT_IMAGE.width}
              height={PROJECT_IMAGE.height}
            />
          </Reveal>

          <div className="case-body">
            <div className="case-main">
              <Reveal>
                <h2>Overview</h2>
                <p className="case-lead">{project.description}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2>What I built</h2>
                <ul className="case-list">
                  {project.highlights.map((h) => (
                    <li key={h}>
                      <Check />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="card case-side">
              <dl>
                <div>
                  <dt className="mono">Role</dt>
                  <dd>{project.role}</dd>
                </div>
                {project.client && (
                  <div>
                    <dt className="mono">Client</dt>
                    <dd>{project.client}</dd>
                  </div>
                )}
                <div>
                  <dt className="mono">Platform</dt>
                  <dd>{project.platforms ?? platforms(project.links.map((l) => l.type))}</dd>
                </div>
                {storeRatings[project.id] && (
                  <div>
                    <dt className="mono">App Store rating</dt>
                    <dd>
                      {storeRatings[project.id].rating.toFixed(1)} / 5 from {storeRatings[project.id].count} ratings (US)
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="mono">Year</dt>
                  <dd>{project.year}</dd>
                </div>
                <div>
                  <dt className="mono">Stack</dt>
                  <dd className="case-stack">
                    {project.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <div className="case-links">
                {project.delisted && (
                  <p className="case-delisted">
                    The publisher has since removed this app from the App Store and Google Play.
                  </p>
                )}
                {project.links.map((l) => (
                  <StoreLink key={l.url} link={l} />
                ))}
              </div>
            </Reveal>
          </div>

          <nav className="case-nav" aria-label="More projects">
            <Link to={projectPath(prev.id)} className="card case-nav-item">
              <span className="mono">
                <ArrowLeft /> Previous
              </span>
              <strong>{prev.title}</strong>
              <span className="sub">{prev.tagline}</span>
            </Link>
            <Link to={projectPath(next.id)} className="card case-nav-item next">
              <span className="mono">
                Next <ArrowRight />
              </span>
              <strong>{next.title}</strong>
              <span className="sub">{next.tagline}</span>
            </Link>
          </nav>
        </div>
      </article>
      <ContactCta />
    </>
  );
};

export default ProjectPage;
