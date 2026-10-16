import { techStack } from "../../data/site";
import Marquee from "../ui/Marquee";

const TechStrip: React.FC = () => {
  const half = Math.ceil(techStack.length / 2);
  const rows = [techStack.slice(0, half), techStack.slice(half)];
  return (
    <section className="tech-strip" aria-label="Technologies">
      {rows.map((row, i) => (
        <Marquee key={i} reverse={i === 1} speed={i === 0 ? 46 : 54}>
          {row.map((t) => (
            <span className="tech-pill" key={t.name}>
              <span className="dot" />
              {t.name}
              <span className="group">{t.group}</span>
            </span>
          ))}
        </Marquee>
      ))}
    </section>
  );
};

export default TechStrip;
