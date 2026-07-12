import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import BubbleCursor from "./BubbleCursor";
import NeonCursor from "./NeonCursor";

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const [isLight, setIsLight] = useState(
    () => typeof document !== "undefined" && document.body.classList.contains("light-mode")
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  // Track theme so the cursor effect can switch with it.
  useEffect(() => {
    const update = () => setIsLight(document.body.classList.contains("light-mode"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="main-content">
      {isLight ? <NeonCursor /> : <BubbleCursor zIndex={9999} />}
      <Outlet />
      <Sidebar />
      <ThemeToggle />
    </div>
  );
};

export default Layout;
