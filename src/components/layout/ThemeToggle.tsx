import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      className={`icon-btn theme-toggle ${className}`}
      data-dark={theme === "dark"}
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title="Toggle theme (T)"
    >
      <Sun className="sun" size={18} />
      <Moon className="moon" size={18} />
    </button>
  );
};

export default ThemeToggle;
