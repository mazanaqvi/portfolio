import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Capacitor } from "@capacitor/core";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/styles.scss";
import App from "./App";

if (Capacitor.isNativePlatform()) {
  document.body.classList.add("native-app");
  document.body.classList.add(`platform-${Capacitor.getPlatform()}`);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
