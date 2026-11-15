import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { skipEntrance } from "../../lib/env";

interface CounterProps {
  to: number;
  duration?: number;
  className?: string;
}

/** Counts from 0 to `to` the first time it scrolls into view. */
const Counter: React.FC<CounterProps> = ({ to, duration = 1.4, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [skip] = useState(skipEntrance);

  useEffect(() => {
    if (skip || !inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [skip, inView, to, duration]);

  // The real number is in the markup from the start, so crawlers and
  // no-JS readers never see "0".
  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  );
};

export default Counter;
