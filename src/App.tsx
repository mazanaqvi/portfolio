import { useCallback, useEffect, useMemo, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeContext, applyTheme, readInitialTheme, type Theme } from "./hooks/useTheme";
import ToastProvider from "./components/ui/ToastProvider";

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Follow the OS until the visitor picks a theme explicitly.
  useEffect(() => {
    if (localStorage.getItem("theme")) return;
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? "light" : "dark");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const set = useCallback((t: Theme) => {
    localStorage.setItem("theme", t);
    setTheme(t);
  }, []);
  const toggle = useCallback(() => set(theme === "dark" ? "light" : "dark"), [theme, set]);

  const value = useMemo(() => ({ theme, toggle, set }), [theme, toggle, set]);

  return (
    <ThemeContext.Provider value={value}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeContext.Provider>
  );
};

export default App;
