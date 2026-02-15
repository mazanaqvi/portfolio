import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../data/navigation";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="controls">
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`control ${location.pathname === item.path ? "active-btn" : ""}`}
          title={item.label}
          onClick={() => navigate(item.path)}
        >
          <i className={item.icon}></i>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
