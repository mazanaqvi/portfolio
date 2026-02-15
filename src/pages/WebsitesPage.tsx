import PortfolioGrid from "../components/Portfolio/PortfolioGrid";
import { websiteProjects } from "../data/portfolio";

const WebsitesPage: React.FC = () => {
  return (
    <section className="container active" id="websites">
      <div className="page-header anim-fade-up">
        <span className="page-tag"><i className="fas fa-globe"></i> Websites</span>
        <h2 className="page-title">
          Web <span className="highlight">Projects</span>
        </h2>
        <p className="page-subtitle">
          Websites I've developed using modern web technologies and frameworks.
        </p>
      </div>
      <PortfolioGrid items={websiteProjects} />
    </section>
  );
};

export default WebsitesPage;
