import { useEffect, useRef, useState } from "react";
import { ArrowRight, Crown, RotateCcw, Undo2 } from "lucide-react";
import { use2048, type Direction } from "../hooks/use2048";
import Reveal from "../components/ui/Reveal";

const SWIPE_THRESHOLD = 24;

const GamePage: React.FC = () => {
  const { board, score, bestScore, won, over, canUndo, move, undo, reset } = use2048();
  const [dismissedWin, setDismissedWin] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef(move);

  useEffect(() => {
    moveRef.current = move;
  }, [move]);

  useEffect(() => {
    const keyMap: Record<string, Direction> = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      s: "down",
      a: "left",
      d: "right",
    };
    const handleKey = (e: KeyboardEvent) => {
      const dir = keyMap[e.key];
      if (!dir) return;
      e.preventDefault();
      moveRef.current(dir);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    let tracking = false;
    let fired = false;
    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      tracking = true;
      fired = false;
    };
    const onMove = (e: TouchEvent) => {
      if (!tracking) return;
      if (e.cancelable) e.preventDefault();
      if (fired) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) return;
      fired = true;
      if (Math.abs(dx) > Math.abs(dy)) moveRef.current(dx > 0 ? "right" : "left");
      else moveRef.current(dy > 0 ? "down" : "up");
    };
    const onEnd = () => {
      tracking = false;
      fired = false;
    };
    el.addEventListener("touchstart", onStart, { passive: false });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  const handleNewGame = () => {
    setDismissedWin(false);
    reset();
  };
  const showWin = won && !dismissedWin && !over;

  return (
    <div className="page">
      <div className="container">
        <Reveal className="page-head" style={{ textAlign: "center" }}>
          <span className="mono">Take a break</span>
          <h1 style={{ marginInline: "auto" }}>
            Play <span className="em">2048</span>
          </h1>
          <p style={{ marginInline: "auto" }}>Join the tiles and reach 2048. Arrow keys or WASD on desktop, swipe on touch.</p>
        </Reveal>

        <Reveal delay={0.1} className="game-wrap">
          <div className="game-topbar">
            <div className="game-scores">
              <div className="score-box">
                <span className="label">Score</span>
                <span className="value">{score}</span>
              </div>
              <div className="score-box">
                <span className="label">
                  <Crown /> Best
                </span>
                <span className="value">{bestScore}</span>
              </div>
            </div>
            <div className="game-actions">
              {canUndo && !over && (
                <button type="button" className="btn ghost sm" onClick={undo}>
                  <Undo2 /> Undo
                </button>
              )}
              <button type="button" className="btn primary sm" onClick={handleNewGame}>
                <RotateCcw /> New game
              </button>
            </div>
          </div>

          <div className="game-board" ref={boardRef}>
            {board.map((row, r) =>
              row.map((value, c) => (
                <div key={`${r}-${c}`} className="game-cell">
                  {value !== 0 && <div className={`game-tile t-${value}`}>{value}</div>}
                </div>
              ))
            )}
            {(over || showWin) && (
              <div className="game-overlay">
                <div className="inner">
                  {over ? <img src="/img/bored.gif" alt="" /> : <div className="emoji">🎉</div>}
                  <h3>{over ? "Game over" : "You win!"}</h3>
                  <p>{over ? `No more moves. Final score: ${score}` : "You reached 2048. Keep going or start fresh."}</p>
                  <div className="actions">
                    {showWin && (
                      <button type="button" className="btn ghost sm" onClick={() => setDismissedWin(true)}>
                        Keep going <ArrowRight />
                      </button>
                    )}
                    <button type="button" className="btn primary sm" onClick={handleNewGame}>
                      <RotateCcw /> New game
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="game-hint">
            <span className="kbd">↑↓←→</span> or <span className="kbd">WASD</span> or swipe
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default GamePage;
