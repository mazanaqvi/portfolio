import { useCallback, useState } from "react";

export type Direction = "up" | "down" | "left" | "right";
export type Board = number[][];

const SIZE = 4;
const BEST_SCORE_KEY = "game2048_best";
const WIN_VALUE = 2048;

const createEmptyBoard = (): Board =>
  Array.from({ length: SIZE }, () => Array<number>(SIZE).fill(0));

const cloneBoard = (board: Board): Board => board.map((row) => [...row]);

const boardsEqual = (a: Board, b: Board): boolean =>
  a.every((row, r) => row.every((cell, c) => cell === b[r][c]));

const getEmptyCells = (board: Board): Array<[number, number]> => {
  const cells: Array<[number, number]> = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) cells.push([r, c]);
    }
  }
  return cells;
};

const spawnTile = (board: Board): Board => {
  const empty = getEmptyCells(board);
  if (empty.length === 0) return board;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const next = cloneBoard(board);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
};

const createInitialBoard = (): Board => spawnTile(spawnTile(createEmptyBoard()));

// Slide + merge a single row to the left. Returns the new row and points gained.
const slideRowLeft = (row: number[]): { row: number[]; gained: number } => {
  const filtered = row.filter((v) => v !== 0);
  const merged: number[] = [];
  let gained = 0;

  for (let i = 0; i < filtered.length; i++) {
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      const value = filtered[i] * 2;
      merged.push(value);
      gained += value;
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }

  while (merged.length < SIZE) merged.push(0);
  return { row: merged, gained };
};

const transpose = (board: Board): Board =>
  board[0].map((_, c) => board.map((row) => row[c]));

const reverseRows = (board: Board): Board => board.map((row) => [...row].reverse());

// Reduce every direction to "slide left" by rotating the board accordingly.
const moveBoard = (
  board: Board,
  dir: Direction
): { board: Board; gained: number } => {
  let working = cloneBoard(board);

  if (dir === "up" || dir === "down") working = transpose(working);
  if (dir === "right" || dir === "down") working = reverseRows(working);

  let gained = 0;
  working = working.map((row) => {
    const result = slideRowLeft(row);
    gained += result.gained;
    return result.row;
  });

  if (dir === "right" || dir === "down") working = reverseRows(working);
  if (dir === "up" || dir === "down") working = transpose(working);

  return { board: working, gained };
};

const hasMoves = (board: Board): boolean => {
  if (getEmptyCells(board).length > 0) return true;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const value = board[r][c];
      if (c < SIZE - 1 && board[r][c + 1] === value) return true;
      if (r < SIZE - 1 && board[r + 1][c] === value) return true;
    }
  }
  return false;
};

const hasValue = (board: Board, value: number): boolean =>
  board.some((row) => row.some((cell) => cell === value));

const readBestScore = (): number => {
  const stored = Number(localStorage.getItem(BEST_SCORE_KEY));
  return Number.isFinite(stored) ? stored : 0;
};

export interface Use2048Result {
  board: Board;
  score: number;
  bestScore: number;
  won: boolean;
  over: boolean;
  move: (dir: Direction) => void;
  reset: () => void;
}

export const use2048 = (): Use2048Result => {
  const [board, setBoard] = useState<Board>(createInitialBoard);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number>(readBestScore);
  const [won, setWon] = useState(false);
  const [over, setOver] = useState(false);

  const move = useCallback(
    (dir: Direction) => {
      if (over) return;

      const { board: moved, gained } = moveBoard(board, dir);
      if (boardsEqual(board, moved)) return;

      const next = spawnTile(moved);
      const newScore = score + gained;

      setBoard(next);
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem(BEST_SCORE_KEY, String(newScore));
      }
      if (!won && hasValue(next, WIN_VALUE)) setWon(true);
      if (!hasMoves(next)) setOver(true);
    },
    [board, score, bestScore, over, won]
  );

  const reset = useCallback(() => {
    setBoard(createInitialBoard());
    setScore(0);
    setWon(false);
    setOver(false);
  }, []);

  return { board, score, bestScore, won, over, move, reset };
};
