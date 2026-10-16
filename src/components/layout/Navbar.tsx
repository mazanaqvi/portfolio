import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Command, Menu, X } from "lucide-react";
import { navItems, site } from "../../data/site";
import ThemeToggle from "./ThemeToggle";
import { useCommandPalette } from "../../hooks/useCommandPalette";

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openPalette } = useCommandPalette();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120 && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${hidden ? "is-hidden" : ""}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-brand" aria-label="Home">
            <img className="brand-mark" src="/img/hero.png" alt="" width={30} height={30} />
            <span>{site.name}</span>
            <span className="brand-dot" title={site.availability} />
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => (isActive ? "active" : "")}>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="nav-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span style={{ position: "relative" }}>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button type="button" className="nav-cmd" onClick={openPalette} aria-label="Open command palette">
              <Command size={14} />
              <span>Menu</span>
              <span className="kbd">⌘K</span>
            </button>
            <ThemeToggle />
            <button
              type="button"
              className="icon-btn nav-burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {[{ label: "Home", path: "/" }, ...navItems, { label: "Play 2048", path: "/game" }].map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                <NavLink to={item.path} end={item.path === "/"} onClick={() => setOpen(false)} className={({ isActive }) => `sheet-link ${isActive ? "active" : ""}`}>
                  {item.label}
                  <span className="mono">0{i + 1}</span>
                </NavLink>
              </motion.div>
            ))}
            <div className="sheet-foot">
              <a className="btn primary" href={`mailto:${site.email}`}>
                Email me
              </a>
              <a className="btn ghost" href={site.company.url} target="_blank" rel="noopener noreferrer">
                {site.company.name}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
