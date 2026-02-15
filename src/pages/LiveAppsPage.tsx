import PortfolioGrid from "../components/Portfolio/PortfolioGrid";
import { liveApps } from "../data/portfolio";

const LiveAppsPage: React.FC = () => {
  return (
    <section className="container active" id="live-apps">
      <div className="page-header anim-fade-up">
        <span className="page-tag"><i className="fas fa-rocket"></i> Live Apps</span>
        <h2 className="page-title">
          Published <span className="highlight">Live Apps</span>
        </h2>
        <p className="page-subtitle">
          Applications published on the iOS App Store and Google Play Store — built by <strong>Ali Hamza</strong>.
        </p>
      </div>
      <PortfolioGrid items={liveApps} />
    </section>
  );
};

export default LiveAppsPage;
