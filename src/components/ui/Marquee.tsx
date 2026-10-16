interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
}

/** Infinite horizontal scroller; children are duplicated for a seamless loop. */
const Marquee: React.FC<MarqueeProps> = ({ children, reverse, speed = 40, className = "" }) => (
  <div
    className={`marquee ${reverse ? "reverse" : ""} ${className}`}
    style={{ "--speed": `${speed}s` } as React.CSSProperties}
  >
    <div className="marquee-track">
      {children}
      {children}
    </div>
  </div>
);

export default Marquee;
