/**
 * True while scripts/prerender.mjs is capturing static HTML with headless
 * Chrome. Components use it to render their final, fully visible state
 * (no entrance animations, no typewriter mid-word) so the saved markup is
 * the real content.
 */
export const IS_PRERENDER =
  typeof navigator !== "undefined" && navigator.userAgent.includes("AliHumzaPrerender");

// When a visitor lands on a prerendered page they already see the finished
// content before any JavaScript runs. Replaying entrance animations on that
// first screen would hide it and fade it back in, which delays Largest
// Contentful Paint and looks like a flicker. These flags let components skip
// their entrance state until the visitor navigates somewhere else.
let bootedFromPrerender = false;
let navigated = false;
const bootPath =
  typeof window !== "undefined" ? window.location.pathname.replace(/\/+$/, "") : "";

export function markBootedFromPrerender() {
  bootedFromPrerender = true;
}

/** Call with the current pathname on every render of the app shell. */
export function trackNavigation(pathname: string) {
  if (!navigated && pathname.replace(/\/+$/, "") !== bootPath) navigated = true;
}

/** True when the current screen was already shown as static HTML. */
export function skipEntrance() {
  return IS_PRERENDER || (bootedFromPrerender && !navigated);
}
