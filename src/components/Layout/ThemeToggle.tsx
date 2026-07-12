import { useCallback, useEffect, useState } from "react";

const getInitialIsLight = (): boolean => {
  const stored = localStorage.getItem("theme");
  if (stored === "light") return true;
  if (stored === "dark") return false;
  // No explicit choice yet: follow the browser/OS preference.
  return !window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const ThemeToggle: React.FC = () => {
  const [isLight, setIsLight] = useState(getInitialIsLight);

  useEffect(() => {
    document.body.classList.toggle("light-mode", isLight);
  }, [isLight]);

  // Keep following the browser preference until the user picks a theme.
  useEffect(() => {
    if (localStorage.getItem("theme")) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setIsLight(!e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setIsLight((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "light" : "dark");
      return next;
    });
  }, []);

  return (
    <div className="theme-btn" onClick={toggle}>
      <i className="fas fa-adjust"></i>
    </div>
  );
};

export default ThemeToggle;
