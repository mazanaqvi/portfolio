import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, Globe, Smartphone, Sparkles } from "lucide-react";
import { PROJECT_IMAGE, projectImage, projectSrcSet, type Project } from "../../data/projects";
import { projectPath } from "../../data/seo";
import { useSpotlight } from "../../hooks/useSpotlight";
import { IS_PRERENDER, skipEntrance } from "../../lib/env";

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Wide editorial layout with the description, used for the lead project. */
  feature?: boolean;
  /** Load the image immediately instead of lazily (cards on the first screen). */
  eager?: boolean;
  ref?: React.Ref<HTMLElement>;
}

const kindBadge: Record<string, { label: string; icon: React.ReactNode }> = {
  product: { label: "Product", icon: <Sparkles /> },
  mobile: { label: "Mobile", icon: <Smartphone /> },
  web: { label: "Web", icon: <Globe /> },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, feature, eager, ref }) => {
  // Cards already on screen from the static HTML keep their image visible.
  const [staticFirst] = useState(skipEntrance);
  const [loaded, setLoaded] = useState(staticFirst);
  const onMove = useSpotlight<HTMLAnchorElement>();
  const primaryKind = project.kind[0];

  const reveal = IS_PRERENDER
    ? {}
    : {
        layout: true,
        initial: staticFirst ? false : { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px 0px" },
        exit: { opacity: 0, scale: 0.96 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: (index % 4) * 0.06 },
      };

  return (
    <motion.article ref={ref} className={`project-cell ${feature ? "is-feature" : ""}`} {...reveal}>
      <Link
        to={projectPath(project.id)}
        className="card spotlight project-card"
        style={{ "--accent-color": project.accent } as React.CSSProperties}
        onMouseMove={onMove}
        aria-label={`${project.title}: ${project.tagline}`}
      >
        <div className="project-media">
          <img
            src={projectImage(project.id)}
            srcSet={projectSrcSet(project.id)}
            sizes={feature ? "(max-width: 900px) 100vw, 710px" : "(max-width: 720px) 100vw, (max-width: 1260px) 50vw, 590px"}
            alt={`${project.title} — ${project.tagline}`}
            width={PROJECT_IMAGE.width}
            height={PROJECT_IMAGE.height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={loaded ? "loaded" : ""}
            onLoad={() => setLoaded(true)}
          />
          <div className="project-media-glow" />
          <div className="project-badges">
            <span className="badge">
              {kindBadge[primaryKind].icon}
              {kindBadge[primaryKind].label}
            </span>
            {project.client && <span className="badge">{project.client}</span>}
          </div>
          <span className="project-view">
            Case study <ArrowUpRight />
          </span>
        </div>
        <div className="project-body">
          <div className="project-top">
            <h3>{project.title}</h3>
            <span className="year">{project.year}</span>
          </div>
          <p className="tagline">{project.tagline}</p>
          {feature && <p className="desc">{project.description}</p>}
          <div className="stack">
            {project.stack.slice(0, 4).map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          {feature && (
            <span className="feature-link">
              Read the case study <ArrowUpRight />
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default ProjectCard;
