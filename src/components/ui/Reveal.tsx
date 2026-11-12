import { motion, type Variants } from "motion/react";
import { IS_PRERENDER } from "../../lib/env";

const variants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

interface RevealProps extends React.ComponentProps<typeof motion.div> {
  delay?: number;
  once?: boolean;
}

/** Fades/slides children in when they scroll into view. */
const Reveal: React.FC<RevealProps> = ({ delay = 0, once = true, children, ...rest }) => {
  if (IS_PRERENDER) {
    // Static capture: render the final state as a plain element.
    const { className, style, onMouseMove, role, id } = rest;
    return (
      <div
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
