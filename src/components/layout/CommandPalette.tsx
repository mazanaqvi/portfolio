import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  Copy,
  CornerDownLeft,
  ExternalLink,
  FileText,
  Gamepad2,
  Home,
  Mail,
  MessageSquare,
  Moon,
  Search,
  Sun,
  User,
} from "lucide-react";
import { navItems, site, socials } from "../../data/site";
import { projects } from "../../data/projects";
import { useTheme } from "../../hooks/useTheme";
import { useCopy } from "../../hooks/useCopy";
import { CommandPaletteContext } from "../../hooks/useCommandPalette";

interface Cmd {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
  keywords?: string;
}

const pageIcons: Record<string, React.ReactNode> = {
  "/work": <Briefcase />,
  "/about": <User />,
  "/reviews": <MessageSquare />,
  "/resume": <FileText />,
  "/contact": <Mail />,
};

export const CommandPaletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const copy = useCopy();
  const inputRef = useRef<HTMLInputElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const commands = useMemo<Cmd[]>(() => {
    const go = (path: string) => () => {
      navigate(path);
      close();
    };
    return [
      { id: "home", group: "Pages", label: "Home", icon: <Home />, run: go("/") },
      ...navItems.map((n) => ({ id: n.path, group: "Pages", label: n.label, icon: pageIcons[n.path] ?? <Home />, run: go(n.path) })),
      { id: "game", group: "Pages", label: "Play 2048", hint: "break", icon: <Gamepad2 />, run: go("/game") },
      {
        id: "email",
        group: "Actions",
        label: "Copy email address",
        hint: site.email,
        icon: <Copy />,
        run: () => {
          copy(site.email, "Email copied");
          close();
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        hint: "T",
        icon: theme === "dark" ? <Sun /> : <Moon />,
        run: () => {
          toggle();
          close();
        },
      },
      ...projects.map((p) => ({
        id: `p-${p.id}`,
        group: "Projects",
        label: p.title,
        hint: p.kind.join(" · "),
        keywords: p.stack.join(" "),
        icon: <Briefcase />,
        run: () => {
          navigate(`/work?project=${p.id}`);
          close();
        },
      })),
      ...socials.map((s) => ({
        id: `s-${s.name}`,
        group: "Links",
        label: s.name,
        hint: s.handle,
        icon: <ExternalLink />,
        run: () => {
          window.open(s.url, "_blank", "noopener");
          close();
        },
      })),
    ];
  }, [navigate, close, theme, toggle, copy]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ""} ${c.keywords ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((o) => !o);
        return;
      }
      if (typing || isOpen) return;
      if (e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, toggle]);

  useEffect(() => {
    if (isOpen) window.setTimeout(() => inputRef.current?.focus(), 30);
  }, [isOpen]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    } else if (e.key === "Escape") {
      close();
    }
  };

  useEffect(() => {
    document.querySelector<HTMLElement>(`[data-cmd-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  let lastGroup = "";

  return (
    <CommandPaletteContext.Provider value={{ open, close }}>
      {children}
      {createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="cmdk-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              className="cmdk"
              role="dialog"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              onKeyDown={onKeyDown}
            >
              <div className="cmdk-input">
                <Search size={18} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  placeholder="Jump to a page, project or action…"
                  aria-label="Search commands"
                />
                <span className="kbd">esc</span>
              </div>
              <div className="cmdk-list">
                {filtered.length === 0 && <div className="cmdk-empty">Nothing matches “{query}”.</div>}
                {filtered.map((c, i) => {
                  const showGroup = c.group !== lastGroup;
                  lastGroup = c.group;
                  return (
                    <div key={c.id}>
                      {showGroup && <div className="cmdk-group">{c.group}</div>}
                      <button
                        type="button"
                        data-cmd-index={i}
                        className={`cmdk-item ${i === active ? "active" : ""}`}
                        onMouseEnter={() => setActive(i)}
                        onClick={c.run}
                      >
                        {c.icon}
                        <span>{c.label}</span>
                        {c.hint && <span className="hint mono">{c.hint}</span>}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="cmdk-foot">
                <span>
                  <span className="kbd">↑↓</span> navigate
                </span>
                <span>
                  <span className="kbd">
                    <CornerDownLeft size={10} />
                  </span>{" "}
                  select
                </span>
                <span>
                  <span className="kbd">T</span> theme
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </CommandPaletteContext.Provider>
  );
};
