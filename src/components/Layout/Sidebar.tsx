import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../data/navigation";

// Primary destinations shown in the mobile bottom navigation bar.
const BOTTOM_NAV_IDS = ["home", "mobile", "websites", "products", "contact"];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const bottomItems = navItems.filter((item) => BOTTOM_NAV_IDS.includes(item.id));
  const topItems = navItems.filter((item) => !BOTTOM_NAV_IDS.includes(item.id));

  return (
    <>
      {/* Desktop: vertical sidebar with every destination */}
      <div className="controls">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`control ${isActive(item.path) ? "active-btn" : ""}`}
            title={item.label}
            onClick={() => navigate(item.path)}
          >
            <i className={item.icon}></i>
          </div>
        ))}
      </div>

      {/* Mobile: top app bar with secondary destinations */}
      <div className="mobile-appbar">
        <div className="mobile-appbar-actions">
          {topItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`appbar-item ${isActive(item.path) ? "active" : ""}`}
              aria-label={item.label}
              onClick={() => navigate(item.path)}
            >
              <i className={item.icon}></i>
              <span>{item.short ?? item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: bottom navigation bar with primary destinations */}
      <nav className="mobile-navbar" aria-label="Primary">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`navbar-btn ${isActive(item.path) ? "active" : ""}`}
            aria-label={item.label}
            onClick={() => navigate(item.path)}
          >
            <i className={item.icon}></i>
            <span>{item.short ?? item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
