import { useCallback, useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    document.body.classList.toggle("light-mode", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }, [isLight]);

  const toggle = useCallback(() => {
    setIsLight((prev) => !prev);
  }, []);

  return (
    <div className="theme-btn" onClick={toggle}>
      <i className="fas fa-adjust"></i>
    </div>
  );
};

export default ThemeToggle;
