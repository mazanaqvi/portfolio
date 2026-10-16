import { createContext, useContext } from "react";

export type Theme = "dark" | "light";

export interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
  set: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function readInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = theme === "dark" ? "#0b0b0c" : "#f6f5f1";
}
