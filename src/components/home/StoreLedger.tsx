import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { hasStoreLink, projects } from "../../data/projects";
import { projectPath } from "../../data/seo";
import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";

const storeApps = projects.filter(hasStoreLink);

const storeMeta = {
  appstore: { icon: "fab fa-apple", label: "App Store" },
  playstore: { icon: "fab fa-google-play", label: "Google Play" },
} as const;

/** The "10+ apps" claim, itemised: every app that is live in a store right now. */
const StoreLedger: React.FC = () => (
  <section className="section" id="stores">
    <div className="container">
      <SectionHead
        eyebrow="In the stores"
        title={
          <>
            {storeApps.length} apps, <span className="em">live right now</span>
          </>
        }
        text="Not a number on a slide. Every app below is published and installable today. Open the listing or read how it was built."
      />
      <Reveal className="ledger" role="list">
        {storeApps.map((p, i) => (
          <div className="ledger-row" role="listitem" key={p.id} style={{ "--accent-color": p.accent } as React.CSSProperties}>
            <span className="ledger-idx">{String(i + 1).padStart(2, "0")}</span>
            <Link to={projectPath(p.id)} className="ledger-name">
              <span className="swatch" />
              {p.title}
              <ArrowUpRight />
            </Link>
            <span className="ledger-tag">{p.tagline}</span>
            <span className="ledger-stack">{p.stack.slice(0, 2).join(" · ")}</span>
            <span className="ledger-stores">
              {p.links
                .filter((l) => l.type === "appstore" || l.type === "playstore")
                .map((l) => {
                  const m = storeMeta[l.type as "appstore" | "playstore"];
                  return (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="store-chip"
                      aria-label={`${p.title} on the ${m.label}`}
                      title={m.label}
                    >
                      <i className={m.icon} aria-hidden />
                      <span>{m.label}</span>
                    </a>
                  );
                })}
            </span>
          </div>
        ))}
      </Reveal>
    </div>
  </section>
);

export default StoreLedger;
