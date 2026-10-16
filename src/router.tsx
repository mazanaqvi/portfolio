import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ReviewsPage from "./pages/ReviewsPage";
import ResumePage from "./pages/ResumePage";
import ContactPage from "./pages/ContactPage";
import GamePage from "./pages/GamePage";
import PaymentLayout from "./components/Payment/PaymentLayout";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PaymentInternationalPage from "./pages/PaymentInternationalPage";

export const router = createBrowserRouter([
  {
    path: "/payment-method",
    element: <PaymentLayout />,
    children: [
      { index: true, element: <PaymentMethodPage /> },
      { path: "international", element: <PaymentInternationalPage /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "work", element: <WorkPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "reviews", element: <ReviewsPage /> },
      { path: "resume", element: <ResumePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "game", element: <GamePage /> },
      // old URLs that may be shared around
      { path: "mobile", element: <Navigate to="/work?filter=mobile" replace /> },
      { path: "live-apps", element: <Navigate to="/work?filter=mobile" replace /> },
      { path: "websites", element: <Navigate to="/work?filter=web" replace /> },
      { path: "products", element: <Navigate to="/work?filter=product" replace /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
