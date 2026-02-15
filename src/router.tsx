import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WebsitesPage from "./pages/WebsitesPage";
import MobileAppsPage from "./pages/MobileAppsPage";
import LiveAppsPage from "./pages/LiveAppsPage";
import ContactPage from "./pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "websites",
        element: <WebsitesPage />,
      },
      {
        path: "mobile",
        element: <MobileAppsPage />,
      },
      {
        path: "live-apps",
        element: <LiveAppsPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
