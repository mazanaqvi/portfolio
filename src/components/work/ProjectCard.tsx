import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Smartphone, Globe, Sparkles } from "lucide-react";
import { PROJECT_IMAGE, projectImage, type Project } from "../../data/projects";
import { useSpotlight } from "../../hooks/useSpotlight";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

const kindBadge: Record<string, { label: string; icon: React.ReactNode }> = {
  product: { label: "Product", icon: <Sparkles /> },
  mobile: { label: "Mobile", icon: <Smartphone /> },
  web: { label: "Web", icon: <Globe /> },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpen }) => {
  const [loaded, setLoaded] = useState(false);
  const onMove = useSpotlight<HTMLButtonElement>();
  const primaryKind = project.kind[0];

  return (
    <motion.button
      type="button"
      layout
      className="card spotlight project-card"
      style={{ "--accent-color": project.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.06 }}
      onMouseMove={onMove}
      onClick={() => onOpen(project)}
      aria-label={`Open ${project.title}`}
    >
      <div className="project-media">
        <img
          src={projectImage(project.id)}
          alt={`${project.title} screenshot`}
          width={PROJECT_IMAGE.width}
          height={PROJECT_IMAGE.height}
          loading={index < 2 ? "eager" : "lazy"}
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
          View case <ArrowUpRight />
        </span>
      </div>
      <div className="project-body">
        <div className="project-top">
          <h3>{project.title}</h3>
          <span className="year">{project.year}</span>
        </div>
        <p className="tagline">{project.tagline}</p>
        <div className="stack">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </motion.button>
  );
};

export default ProjectCard;
