import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WebsitesPage from "./pages/WebsitesPage";
import MobileAppsPage from "./pages/MobileAppsPage";
import LiveAppsPage from "./pages/LiveAppsPage";
import ContactPage from "./pages/ContactPage";
import ReviewsPage from "./pages/ReviewsPage";
import ResumePage from "./pages/ResumePage";
import GamePage from "./pages/GamePage";
import ProductsPage from "./pages/ProductsPage";

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
        path: "products",
        element: <ProductsPage />,
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
        path: "reviews",
        element: <ReviewsPage />,
      },
      {
        path: "resume",
        element: <ResumePage />,
      },
      {
        path: "game",
        element: <GamePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
