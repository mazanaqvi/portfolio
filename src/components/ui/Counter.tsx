import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

interface CounterProps {
  to: number;
  duration?: number;
  className?: string;
}

/** Counts from 0 to `to` the first time it scrolls into view. */
const Counter: React.FC<CounterProps> = ({ to, duration = 1.4, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
};

export default Counter;
