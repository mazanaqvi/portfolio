import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "../../data/projects";
import SectionHead from "../ui/SectionHead";
import ProjectGrid from "../work/ProjectGrid";

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
        text="A few things I've shipped recently. Click any card for the full story, stack and store links."
        action={
          <Link to="/work" className="btn ghost">
            All projects <ArrowRight className="btn-arrow" />
          </Link>
        }
      />
      <ProjectGrid items={featuredProjects} showFilters={false} />
      <div className="featured-foot">
        <Link to="/work" className="btn soft">
          Browse all 15 projects <ArrowRight className="btn-arrow" />
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedWork;
