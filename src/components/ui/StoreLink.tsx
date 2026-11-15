import { ExternalLink } from "lucide-react";
import type { ProjectLink } from "../../data/projects";
import BrandIcon from "./BrandIcon";

const meta: Record<ProjectLink["type"], { small: string; label: string; icon: React.ReactNode }> = {
  appstore: { small: "Download on the", label: "App Store", icon: <BrandIcon name="apple" /> },
  playstore: { small: "Get it on", label: "Google Play", icon: <BrandIcon name="google-play" /> },
  web: { small: "Open the", label: "Live site", icon: <ExternalLink /> },
  github: { small: "View on", label: "GitHub", icon: <BrandIcon name="github" /> },
};

const StoreLink: React.FC<{ link: ProjectLink; ghost?: boolean }> = ({ link, ghost }) => {
  const m = meta[link.type];
  return (
    <a
      className={`store-btn ${ghost ? "ghost" : ""}`}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      {m.icon}
      <span>
        <small>{m.small}</small>
        {m.label}
      </span>
    </a>
  );
};

export default StoreLink;
