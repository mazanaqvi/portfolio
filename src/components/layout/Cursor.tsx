import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/**
 * Custom cursor: a dot that tracks the pointer exactly and a ring that lags
 * behind on a spring. Over clickable elements the custom cursor fades out and
 * the browser's normal hand cursor takes over. Only rendered for fine
 * pointers (mouse / trackpad).
 */
const Cursor: React.FC = () => {
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      setHover(!!(e.target as HTMLElement | null)?.closest(INTERACTIVE));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onUp);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onUp);
    };
  }, [fine, visible, x, y]);

  if (!fine) return null;

  const shown = visible && !hover;

  return (
    <div className="cursor-root" aria-hidden>
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{ scale: down ? 1.4 : 1, opacity: shown ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: reduce ? x : rx, y: reduce ? y : ry }}
        animate={{ scale: down ? 0.7 : 1, opacity: shown ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
    </div>
  );
};

export default Cursor;
