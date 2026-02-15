import type { StatItem } from "../../data/about";

interface StatCardProps {
  stat: StatItem;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const lines = stat.label.split("\n");

  return (
    <div
      className="about-item"
      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
    >
      <div className="abt-text">
        <p className="large-text">{stat.value}</p>
        <p className="small-text">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
