import { useEffect, useRef, useState } from "react";
import type { Skill } from "../../data/about";

interface SkillBarProps {
  skill: Skill;
  index: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300 + index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="progress-bar" ref={ref}>
      <div className="prog-header">
        <p className="prog-title">{skill.name}</p>
        <p className="prog-text">{skill.percentage}%</p>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: animated ? `${skill.percentage}%` : "0%" }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
