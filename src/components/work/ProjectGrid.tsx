import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { projects, type Project, type ProjectKind } from "../../data/projects";
import ProjectCard from "./ProjectCard";

type Filter = "all" | ProjectKind;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "product", label: "Products" },
];

interface ProjectGridProps {
  items?: Project[];
  showFilters?: boolean;
  /** Render the first project as a wide feature card. */
  featureFirst?: boolean;
  /** How many leading cards load their image eagerly (those on the first screen). */
  eagerCount?: number;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ items = projects, showFilters = true, featureFirst, eagerCount = 2 }) => {
  const [params, setParams] = useSearchParams();
  const raw = params.get("filter");
  const filter: Filter = filters.some((f) => f.id === raw) ? (raw as Filter) : "all";

  const setFilter = (f: Filter) => {
    const next = new URLSearchParams(params);
    if (f === "all") next.delete("filter");
    else next.set("filter", f);
    setParams(next, { replace: true });
  };

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((p) => p.kind.includes(filter))),
    [items, filter]
  );

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: items.length, mobile: 0, web: 0, product: 0 };
    items.forEach((p) => p.kind.forEach((k) => c[k]++));
    return c;
  }, [items]);

  return (
    <>
      {showFilters && (
        <div className="filter-bar" role="tablist" aria-label="Filter projects" style={{ marginBottom: "1.5rem" }}>
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={filter === f.id ? "active" : ""}
              onClick={() => setFilter(f.id)}
            >
              {filter === f.id && (
                <motion.span layoutId="filter-pill" className="filter-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              )}
              <span style={{ position: "relative" }}>
                {f.label}
                <span className="count">{counts[f.id]}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="work-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} feature={featureFirst && i === 0} eager={i < eagerCount} />
          ))}
        </AnimatePresence>
      </div>
      {visible.length === 0 && <div className="work-empty">Nothing here yet.</div>}
    </>
  );
};

export default ProjectGrid;
