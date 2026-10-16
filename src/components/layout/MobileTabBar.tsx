import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { Briefcase, Home, Mail, MessageSquare, User } from "lucide-react";

const tabs = [
  { label: "Home", path: "/", icon: Home, end: true },
  { label: "Work", path: "/work", icon: Briefcase },
  { label: "About", path: "/about", icon: User },
  { label: "Reviews", path: "/reviews", icon: MessageSquare },
  { label: "Contact", path: "/contact", icon: Mail },
];

/** App-style bottom navigation, shown on phones only (see _components.scss). */
const MobileTabBar: React.FC = () => (
  <nav className="tabbar" aria-label="Primary (mobile)">
    {tabs.map(({ label, path, icon: Icon, end }) => (
      <NavLink key={path} to={path} end={end} className={({ isActive }) => `tab ${isActive ? "active" : ""}`}>
        {({ isActive }) => (
          <>
            {isActive && (
              <motion.span
                layoutId="tabbar-pill"
                className="tab-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <Icon className="tab-icon" size={21} strokeWidth={isActive ? 2.4 : 1.9} />
            <span className="tab-label">{label}</span>
          </>
        )}
      </NavLink>
    ))}
  </nav>
);

export default MobileTabBar;
