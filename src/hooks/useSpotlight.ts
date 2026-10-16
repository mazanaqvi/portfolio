import { useCallback } from "react";

/** Writes the cursor position into --mx / --my so `.spotlight` can follow it. */
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((e: React.MouseEvent<T>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}
