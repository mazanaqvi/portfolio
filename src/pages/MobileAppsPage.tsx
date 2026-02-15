import PortfolioGrid from "../components/Portfolio/PortfolioGrid";
import { mobileProjects } from "../data/portfolio";

const MobileAppsPage: React.FC = () => {
  return (
    <section className="container active" id="mobile">
      <div className="page-header anim-fade-up">
        <span className="page-tag"><i className="fas fa-mobile-alt"></i> Mobile</span>
        <h2 className="page-title">
          Mobile <span className="highlight">Applications</span>
        </h2>
        <p className="page-subtitle">
          Cross-platform mobile apps for Android and iOS built with Flutter.
        </p>
      </div>
      <PortfolioGrid items={mobileProjects} />
    </section>
  );
};

export default MobileAppsPage;
