import { Star } from "lucide-react";
import { storeRatings } from "../../data/storeRatings";

/** "★ 4.6 (24)" for apps with an App Store rating; renders nothing otherwise. */
const RatingBadge: React.FC<{ projectId: string; className?: string }> = ({ projectId, className = "" }) => {
  const r = storeRatings[projectId];
  if (!r) return null;
  return (
    <span
      className={`rating-badge ${className}`}
      title={`${r.rating.toFixed(1)} out of 5 from ${r.count} App Store ratings (US)`}
    >
      <Star aria-hidden />
      <span className="sr-only">App Store rating </span>
      {r.rating.toFixed(1)}
      <span className="count">({r.count})</span>
    </span>
  );
};

export default RatingBadge;
