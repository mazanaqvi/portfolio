import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionGlobalConfig } from "motion/react";
import { Capacitor } from "@capacitor/core";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import "./styles/index.scss";
import App from "./App";
import { IS_PRERENDER } from "./lib/env";

if (IS_PRERENDER) MotionGlobalConfig.skipAnimations = true;

if (Capacitor.isNativePlatform()) {
  document.body.classList.add("native-app", `platform-${Capacitor.getPlatform()}`);
}

const rootEl = document.getElementById("root")!;
// Static pages ship real markup inside #root for crawlers; it stays hidden
// for JS visitors (see index.html) until React replaces it here.
rootEl.removeAttribute("data-prerendered");

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
