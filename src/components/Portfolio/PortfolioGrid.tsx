import type { PortfolioItem } from "../../data/portfolio";
import PortfolioCard from "./PortfolioCard";

interface PortfolioGridProps {
  items: PortfolioItem[];
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ items }) => {
  return (
    <div className="portfolios">
      {items.map((item, index) => (
        <PortfolioCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};

export default PortfolioGrid;
