import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { featuredProjects, projects } from "../../data/projects";
import SectionHead from "../ui/SectionHead";
import ProjectGrid from "../work/ProjectGrid";

// One wide lead project plus four cards keeps the two-column grid even.
const shown = featuredProjects.slice(0, 5);

const FeaturedWork: React.FC = () => (
  <section className="section" id="work">
    <div className="container">
      <SectionHead
        eyebrow="Selected work"
        title={
          <>
            Products and apps <span className="em">in the wild</span>
          </>
        }
        text="A few things I've shipped recently. Each one opens a case study with the stack, my role and the live links."
        action={
          <Link to="/work/" className="btn ghost">
            All projects <ArrowRight className="btn-arrow" />
          </Link>
        }
      />
      <ProjectGrid items={shown} showFilters={false} featureFirst eagerCount={0} />
      <div className="featured-foot">
        <Link to="/work/" className="btn soft">
          Browse all {projects.length} projects <ArrowRight className="btn-arrow" />
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedWork;
