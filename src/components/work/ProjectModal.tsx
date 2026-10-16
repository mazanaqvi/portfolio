import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { PROJECT_IMAGE, projectImage, type Project } from "../../data/projects";
import StoreLink from "../ui/StoreLink";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="modal project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pm-title"
            style={{ "--accent-color": project.accent, position: "relative" } as React.CSSProperties}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <button type="button" className="icon-btn modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
            <div className="pm-media">
              <img
                src={projectImage(project.id)}
                alt={`${project.title} screenshot`}
                width={PROJECT_IMAGE.width}
                height={PROJECT_IMAGE.height}
              />
            </div>
            <div className="pm-body">
              <div className="pm-main">
                <span className="mono">
                  {project.kind.join(" · ")} · {project.year}
                </span>
                <h2 id="pm-title" style={{ marginTop: "0.5rem" }}>
                  {project.title}
                </h2>
                <p className="tagline">{project.tagline}</p>
                <p className="desc">{project.description}</p>
                <ul>
                  {project.highlights.map((h) => (
                    <li key={h}>
                      <Check />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="pm-side">
                <div className="meta">
                  <span className="mono">Role</span>
                  <strong>{project.role}</strong>
                </div>
                {project.client && (
                  <div className="meta">
                    <span className="mono">Client</span>
                    <strong>{project.client}</strong>
                  </div>
                )}
                <div className="meta">
                  <span className="mono">Stack</span>
                  <div className="stack" style={{ marginTop: "0.4rem" }}>
                    {project.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="links">
                  {project.links.map((l) => (
                    <StoreLink key={l.url} link={l} />
                  ))}
                </div>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
