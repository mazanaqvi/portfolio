import { Navigate, useSearchParams } from "react-router-dom";
import { projectById, projects } from "../data/projects";
import { pageSeo, projectPath } from "../data/seo";
import { useSeo } from "../hooks/useSeo";
import ProjectGrid from "../components/work/ProjectGrid";
import Reveal from "../components/ui/Reveal";
import ContactCta from "../components/home/ContactCta";

const WorkPage: React.FC = () => {
  useSeo(pageSeo.work);
  const [params] = useSearchParams();

  // Older shared links opened a modal with ?project=<id>.
  const legacy = params.get("project");
  if (legacy && projectById(legacy)) return <Navigate to={projectPath(legacy)} replace />;

  return (
    <>
      <div className="page">
        <div className="container">
          <Reveal className="page-head">
            <span className="mono">Work · {projects.length} projects</span>
            <h1>
              Things I've <span className="em">shipped</span>
            </h1>
            <p>
              Mobile apps in the App Store and Google Play, web products and SaaS tools, built by Ali Humza. Every
              card opens a case study with the stack, my role and the live links.
            </p>
          </Reveal>
          <ProjectGrid />
        </div>
      </div>
      <ContactCta />
    </>
  );
};

export default WorkPage;
