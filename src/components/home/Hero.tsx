import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { hero, site, RESUME_PDF_URL } from "../../data/site";
import Counter from "../ui/Counter";
import Magnetic from "../ui/Magnetic";
import { useReducedMotion } from "../../hooks/useMediaQuery";

function useTypewriter(words: string[]) {
  const [state, setState] = useState({ i: 0, text: "", deleting: false });

  useEffect(() => {
    const word = words[state.i];
    const atEnd = !state.deleting && state.text === word;
    const atStart = state.deleting && state.text === "";
    const delay = atEnd ? 1800 : atStart ? 200 : state.deleting ? 35 : 70;

    const t = window.setTimeout(() => {
      setState((s) => {
        const w = words[s.i];
        if (!s.deleting && s.text === w) return { ...s, deleting: true };
        if (s.deleting && s.text === "") return { i: (s.i + 1) % words.length, text: "", deleting: false };
        return { ...s, text: s.deleting ? w.slice(0, s.text.length - 1) : w.slice(0, s.text.length + 1) };
      });
    }, delay);
    return () => window.clearTimeout(t);
  }, [state, words]);

  return state.text;
}

const title = ["I build apps", "people open", "every day."];

const Hero: React.FC = () => {
  const typed = useTypewriter(hero.roles);
  const reduce = useReducedMotion();

  // mouse parallax for the orbs + card tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const orbAx = useTransform(sx, (v) => v * -40);
  const orbAy = useTransform(sy, (v) => v * -40);
  const orbBx = useTransform(sx, (v) => v * 30);
  const orbBy = useTransform(sy, (v) => v * 30);
  const rotX = useTransform(sy, (v) => v * -10);
  const rotY = useTransform(sx, (v) => v * 12);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <section className="hero" ref={ref}>
      <div className="hero-bg" aria-hidden>
        <div className="grid" />
        <motion.div className="orb orb-a" style={{ x: orbAx, y: orbAy }} />
        <motion.div className="orb orb-b" style={{ x: orbBx, y: orbBy }} />
      </div>

      <div className="container hero-inner">
        <div>
          <motion.div
            className="hero-status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="dot" />
            {site.availability}
          </motion.div>

          <h1 className="hero-title">
            {title.map((line, li) => (
              <span className="line" key={line}>
                <motion.span
                  className="word"
                  initial={{ y: "110%", rotate: 3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 + li * 0.1 }}
                >
                  {li === 1 ? (
                    <>
                      people <span className="em">open</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>{site.name} · shipping</span>
            <span className="typed">
              {typed}
              <span className="caret" />
            </span>
          </motion.div>

          <motion.p
            className="hero-intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {hero.intro}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Magnetic>
              <Link to="/work" className="btn primary lg">
                See my work <ArrowRight className="btn-arrow" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a className="btn ghost lg" href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer">
                <Download /> Resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {hero.stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="value">
                  <Counter to={s.value} />
                  <span className="suffix">{s.suffix}</span>
                </div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero-card"
          style={reduce ? undefined : { rotateX: rotX, rotateY: rotY }}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <div className="hero-card-glow" />
          <img className="portrait" src="/img/hero.png" alt={`${site.name}, portrait`} width={380} height={532} />
          <motion.span className="float f1" animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <span className="dot" /> Flutter · React Native
          </motion.span>
          <motion.span className="float f2" animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
            <span className="dot" /> Next.js · NestJS
          </motion.span>
          <motion.span className="float f3" animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
            <span className="dot" /> Top Rated on Upwork
          </motion.span>
          <div className="hero-card-tag">
            <span className="mono">Based in</span>
            <strong>{site.location}</strong>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll" aria-hidden>
        <span>scroll</span>
        <span className="wheel" />
      </div>
    </section>
  );
};

export default Hero;
