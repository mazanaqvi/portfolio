import { projects } from "../data/projects";
import ProjectGrid from "../components/work/ProjectGrid";
import Reveal from "../components/ui/Reveal";
import ContactCta from "../components/home/ContactCta";

const WorkPage: React.FC = () => (
  <>
    <div className="page">
      <div className="container">
        <Reveal className="page-head">
          <span className="mono">Work · {projects.length} projects</span>
          <h1>
            Things I've <span className="em">shipped</span>
          </h1>
          <p>
            Mobile apps in the App Store and Google Play, web products and SaaS tools. Every card opens a short
            case with the stack, my role and the live links.
          </p>
        </Reveal>
        <ProjectGrid />
      </div>
    </div>
    <ContactCta />
  </>
);

export default WorkPage;
