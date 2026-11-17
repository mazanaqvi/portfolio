import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionGlobalConfig } from "motion/react";
import { Capacitor } from "@capacitor/core";
// Self-hosted fonts, Latin only. Served from this domain, so no extra
// connection to Google Fonts blocks the first render.
import "@fontsource-variable/geist/wght.css";
import "@fontsource/geist-mono/latin-400.css";
import "@fontsource/geist-mono/latin-500.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./styles/index.scss";
import App from "./App";
import { IS_PRERENDER, markBootedFromPrerender } from "./lib/env";

if (IS_PRERENDER) MotionGlobalConfig.skipAnimations = true;

if (Capacitor.isNativePlatform()) {
  document.body.classList.add("native-app", `platform-${Capacitor.getPlatform()}`);
}

const rootEl = document.getElementById("root")!;
// Static pages ship the finished markup inside #root, visible from the first
// paint. React renders the same content over it; the flag tells components
// not to replay entrance animations on that first screen.
const prerendered = rootEl.hasAttribute("data-prerendered");

function mount() {
  if (prerendered) {
    markBootedFromPrerender();
    rootEl.removeAttribute("data-prerendered");
  }
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// On a prerendered page, let the browser paint the static HTML first, then
// take over in the next task. Without this the app can mount before the
// first paint, which makes the largest paint wait for all the JavaScript.
//
// Animation frames don't run in background tabs or some embedded views, so
// a hidden page mounts straight away (there is no paint to protect) and a
// timer guarantees the app always starts even if no frame ever comes.
let started = false;
const start = () => {
  if (started) return;
  started = true;
  mount();
};

if (!prerendered || document.visibilityState === "hidden") {
  start();
} else {
  requestAnimationFrame(() => setTimeout(start, 0));
  setTimeout(start, 1500);
}
