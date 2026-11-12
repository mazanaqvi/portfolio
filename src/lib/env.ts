/**
 * True while scripts/prerender.mjs is capturing static HTML with headless
 * Chrome. Components use it to render their final, fully visible state
 * (no entrance animations, no typewriter mid-word) so the saved markup is
 * the real content.
 */
export const IS_PRERENDER =
  typeof navigator !== "undefined" && navigator.userAgent.includes("AliHumzaPrerender");
