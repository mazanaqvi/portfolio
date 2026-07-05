import React, { useEffect, useRef, useState } from "react";
import { use2048, type Direction } from "../hooks/use2048";

const SWIPE_THRESHOLD = 24;

const GamePage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { board, score, bestScore, won, over, canUndo, move, undo, reset } =
    use2048();
  const [dismissedWin, setDismissedWin] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef(move);

  useEffect(() => {
    moveRef.current = move;
  }, [move]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      move(dir);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move]);

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

      // Fire as soon as the swipe crosses the threshold for an instant,
      // native-feeling response (rather than waiting for the finger to lift).
      if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) return;

      fired = true;
      if (Math.abs(dx) > Math.abs(dy)) {
        moveRef.current(dx > 0 ? "right" : "left");
      } else {
        moveRef.current(dy > 0 ? "down" : "up");
      }
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

  const showWinOverlay = won && !dismissedWin && !over;

  return (
    <section
      className={`container game-2048 active ${visible ? "page-visible" : ""}`}
      id="game"
    >
      <div className="page-header anim-fade-up">
        <span className="page-tag">
          <i className="fas fa-gamepad"></i> Mini Game
        </span>
        <h2 className="page-title">
          Play <span className="highlight">2048</span>
        </h2>
        <p className="page-subtitle">
          Join the tiles and reach 2048. Use arrow keys or WASD on desktop, or
          swipe on touch devices.
        </p>
      </div>

      <div
        className="game-2048-inner anim-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="game-2048-topbar">
          <div className="game-2048-scores">
            <div className="game-2048-score-box">
              <span className="game-2048-score-label">Score</span>
              <span className="game-2048-score-value">{score}</span>
            </div>
            <div className="game-2048-score-box best">
              <span className="game-2048-score-label">
                <i className="fas fa-crown"></i> Best
              </span>
              <span className="game-2048-score-value">{bestScore}</span>
            </div>
          </div>
          <div className="game-2048-actions">
            {canUndo && !over && (
              <button
                className="game-2048-new-btn ghost"
                onClick={undo}
                title="Undo last move"
              >
                <i className="fas fa-undo"></i> Undo
              </button>
            )}
            <button className="game-2048-new-btn" onClick={handleNewGame}>
              <i className="fas fa-redo"></i> New Game
            </button>
          </div>
        </div>

        <div className="game-2048-board" ref={boardRef}>
          {board.map((row, r) =>
            row.map((value, c) => (
              <div key={`${r}-${c}`} className="game-2048-cell">
                {value !== 0 && (
                  <div className={`game-2048-tile tile-${value}`}>{value}</div>
                )}
              </div>
            ))
          )}

          {(over || showWinOverlay) && (
            <div className="game-2048-overlay">
              <div className="game-2048-overlay-content">
                {over ? (
                  <img
                    src="/img/bored.gif"
                    alt="Game over"
                    className="game-2048-sad-img"
                  />
                ) : (
                  <div className="game-2048-emoji happy" aria-hidden="true">
                    🎉
                  </div>
                )}
                <h3>{over ? "Game Over" : "You Win!"}</h3>
                <p>
                  {over
                    ? `No more moves. Final score: ${score}`
                    : "You reached 2048! Keep going or start fresh."}
                </p>
                <div className="game-2048-overlay-actions">
                  {showWinOverlay && (
                    <button
                      className="game-2048-new-btn"
                      onClick={() => setDismissedWin(true)}
                    >
                      <i className="fas fa-arrow-right"></i> Keep Going
                    </button>
                  )}
                  <button
                    className="game-2048-new-btn primary"
                    onClick={handleNewGame}
                  >
                    <i className="fas fa-redo"></i> New Game
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="game-2048-hint">
          <i className="fas fa-arrows-alt"></i> Arrow keys / WASD / swipe to move
        </div>
      </div>
    </section>
  );
};

export default GamePage;
