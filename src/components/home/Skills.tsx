import { skillGroups } from "../../data/site";
import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";
import { useSpotlight } from "../../hooks/useSpotlight";

const SkillCard: React.FC<{ group: (typeof skillGroups)[number]; index: number }> = ({ group, index }) => {
  const onMove = useSpotlight<HTMLDivElement>();
  return (
    <Reveal delay={index * 0.06} className={`card spotlight skill-card ${index === 0 ? "wide" : ""}`} onMouseMove={onMove}>
      <span className="mono">0{index + 1}</span>
      <h3>{group.title}</h3>
      <p>{group.blurb}</p>
      <div className="items">
        {group.items.map((it) => (
          <span key={it} className="chip">
            {it}
          </span>
        ))}
      </div>
    </Reveal>
  );
};

const Skills: React.FC = () => (
  <section className="section" id="skills">
    <div className="container">
      <SectionHead
        eyebrow="Toolkit"
        title={
          <>
            What I <span className="em">reach for</span>
          </>
        }
        text="No percentage bars. These are the tools I've shipped production software with, grouped by where they live."
      />
      <div className="skills-grid">
        {skillGroups.map((g, i) => (
          <SkillCard key={g.title} group={g} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
