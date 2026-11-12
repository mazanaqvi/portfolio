import { Link } from "react-router-dom";
import { ArrowUpRight, Building2, FlaskConical, Rocket } from "lucide-react";
import { nowItems, type NowItem } from "../../data/site";
import { projectPath } from "../../data/seo";
import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";
import { useSpotlight } from "../../hooks/useSpotlight";

const icons = { building: Building2, rocket: Rocket, flask: FlaskConical };

const NowCard: React.FC<{ item: NowItem; index: number }> = ({ item, index }) => {
  const onMove = useSpotlight<HTMLDivElement>();
  const Icon = icons[item.icon];
  return (
    <Reveal delay={index * 0.06} className={`card spotlight now-card ${item.learning ? "is-lab" : ""}`} onMouseMove={onMove}>
      <div className="now-top">
        <span className="now-icon">
          <Icon />
        </span>
        <span className="mono">{item.tag}</span>
        {item.learning && <span className="chip accent">Learning</span>}
      </div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <div className="now-foot">
        {item.chips?.map((c) => (
          <span key={c} className="chip">
            {c}
          </span>
        ))}
        {item.projects?.map((p) => (
          <Link key={p.id} to={projectPath(p.id)} className="chip now-link">
            {p.label} <ArrowUpRight />
          </Link>
        ))}
      </div>
    </Reveal>
  );
};

const NowSection: React.FC = () => (
  <section className="section" id="now">
    <div className="container">
      <SectionHead
        eyebrow="Now"
        title={
          <>
            What I'm <span className="em">working on</span>
          </>
        }
        text="A day job, two products of my own, and one thing I'm deliberately learning in public."
      />
      <div className="now-grid">
        {nowItems.map((item, i) => (
          <NowCard key={item.tag} item={item} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default NowSection;
