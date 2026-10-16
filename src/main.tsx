import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Capacitor } from "@capacitor/core";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import "./styles/index.scss";
import App from "./App";

if (Capacitor.isNativePlatform()) {
  document.body.classList.add("native-app", `platform-${Capacitor.getPlatform()}`);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
