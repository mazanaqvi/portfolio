import { useLayoutEffect, useRef, useState } from "react";
import { animate, inView, motion, type Variants } from "motion/react";
import { IS_PRERENDER, skipEntrance } from "../../lib/env";

const EASE = [0.22, 1, 0.36, 1] as const;
const HIDDEN = { opacity: 0, y: 24, filter: "blur(6px)" };
const SHOWN = { opacity: 1, y: 0, filter: "blur(0px)" };

const variants: Variants = {
  hidden: HIDDEN,
  show: (delay: number) => ({ ...SHOWN, transition: { duration: 0.7, ease: EASE, delay } }),
};

interface RevealProps extends React.ComponentProps<typeof motion.div> {
  delay?: number;
  once?: boolean;
}

/**
 * Fades/slides children in when they scroll into view.
 *
 * When the page arrived as prerendered HTML, everything on the first screen
 * is already visible, so it is left alone; only blocks that start below the
 * fold are hidden (before paint) and revealed on scroll as usual.
 */
const Reveal: React.FC<RevealProps> = ({ delay = 0, once = true, children, ...rest }) => {
  const [staticFirst] = useState(skipEntrance);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!staticFirst || IS_PRERENDER || !el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    animate(el, HIDDEN, { duration: 0 });
    const stop = inView(
      el,
      () => {
        animate(el, SHOWN, { duration: 0.7, ease: EASE, delay });
        stop();
      },
      { margin: "-80px 0px" }
    );
    return stop;
  }, [staticFirst, delay]);

  if (staticFirst) {
    const { className, style, onMouseMove, role, id } = rest;
    return (
      <div
        ref={ref}
        id={id}
        role={role}
        className={className}
        style={style as React.CSSProperties}
        onMouseMove={onMouseMove as React.MouseEventHandler<HTMLDivElement>}
      >
        {children as React.ReactNode}
      </div>
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px 0px" }}
      custom={delay}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
