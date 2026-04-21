import PortfolioGrid from "../components/Portfolio/PortfolioGrid";
import { mobileProjects } from "../data/portfolio";
import { mobileContent } from "../data/content";

const MobileAppsPage: React.FC = () => {
  return (
    <section className="container active" id="mobile">
      <div className="page-header anim-fade-up">
        <span className="page-tag"><i className="fas fa-mobile-alt"></i> {mobileContent.pageTag}</span>
        <h2 className="page-title">
          {mobileContent.pageTitle} <span className="highlight">{mobileContent.pageTitleHighlight}</span>
        </h2>
        <p className="page-subtitle">{mobileContent.pageSubtitle}</p>
      </div>
      <PortfolioGrid items={mobileProjects} />
    </section>
  );
};

export default MobileAppsPage;
