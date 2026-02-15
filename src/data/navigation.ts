export interface NavItem {
  id: string;
  path: string;
  icon: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "home", path: "/", icon: "fas fa-home", label: "Home" },
  { id: "mobile", path: "/mobile", icon: "fas fa-mobile-alt", label: "Mobile Apps" },
  { id: "websites", path: "/websites", icon: "fas fa-globe", label: "Websites" },
  { id: "live-apps", path: "/live-apps", icon: "fas fa-rocket", label: "Live Apps" },
  { id: "about", path: "/about", icon: "fas fa-user", label: "About" },
  { id: "contact", path: "/contact", icon: "fas fa-envelope-open", label: "Contact" },
];
