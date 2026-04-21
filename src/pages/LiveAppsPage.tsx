import PortfolioGrid from "../components/Portfolio/PortfolioGrid";
import { liveApps } from "../data/portfolio";
import { liveAppsContent } from "../data/content";

const LiveAppsPage: React.FC = () => {
  return (
    <section className="container active" id="live-apps">
      <div className="page-header anim-fade-up">
        <span className="page-tag"><i className="fas fa-rocket"></i> {liveAppsContent.pageTag}</span>
        <h2 className="page-title">
          {liveAppsContent.pageTitle} <span className="highlight">{liveAppsContent.pageTitleHighlight}</span>
        </h2>
        <p className="page-subtitle">{liveAppsContent.pageSubtitle}</p>
      </div>
      <PortfolioGrid items={liveApps} />
    </section>
  );
};

export default LiveAppsPage;
