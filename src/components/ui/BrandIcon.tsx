import { brandIcons, type BrandName } from "./brandIcons";

/** A brand logo that sizes and colours like text (1em, currentColor). */
const BrandIcon: React.FC<{ name: BrandName; className?: string }> = ({ name, className = "" }) => {
  const { viewBox, d } = brandIcons[name];
  return (
    <svg className={`brand-icon ${className}`} viewBox={viewBox} aria-hidden focusable="false">
      <path fill="currentColor" d={d} />
    </svg>
  );
};

export default BrandIcon;
