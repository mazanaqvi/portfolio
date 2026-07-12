export interface NavItem {
  id: string;
  path: string;
  icon: string;
  label: string;
  /** Short label used by the mobile bottom navigation bar. */
  short?: string;
}

export const navItems: NavItem[] = [
  { id: "home", path: "/", icon: "fas fa-home", label: "Home", short: "Home" },
  { id: "mobile", path: "/mobile", icon: "fas fa-mobile-alt", label: "Mobile Apps", short: "Apps" },
  { id: "websites", path: "/websites", icon: "fas fa-globe", label: "Websites", short: "Web" },
  { id: "products", path: "/products", icon: "fas fa-cube", label: "Products", short: "Products" },
  { id: "about", path: "/about", icon: "fas fa-user", label: "About" },
  { id: "reviews", path: "/reviews", icon: "fas fa-star", label: "Reviews" },
  { id: "contact", path: "/contact", icon: "fas fa-envelope-open", label: "Contact", short: "Contact" },
  { id: "resume", path: "/resume", icon: "fas fa-file-alt", label: "Resume" },
  { id: "game", path: "/game", icon: "fas fa-gamepad", label: "Play 2048", short: "2048" },
];
