import PortfolioGrid from "../components/Portfolio/PortfolioGrid";
import { websiteProjects } from "../data/portfolio";
import { websitesContent } from "../data/content";

const WebsitesPage: React.FC = () => {
  return (
    <section className="container active" id="websites">
      <div className="page-header anim-fade-up">
        <span className="page-tag"><i className="fas fa-globe"></i> {websitesContent.pageTag}</span>
        <h2 className="page-title">
          {websitesContent.pageTitle} <span className="highlight">{websitesContent.pageTitleHighlight}</span>
        </h2>
        <p className="page-subtitle">{websitesContent.pageSubtitle}</p>
      </div>
      <PortfolioGrid items={websiteProjects} />
    </section>
  );
};

export default WebsitesPage;
