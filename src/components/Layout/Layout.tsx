import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

const Layout: React.FC = () => {
  return (
    <div className="main-content">
      <Outlet />
      <Sidebar />
      <ThemeToggle />
    </div>
  );
};

export default Layout;
