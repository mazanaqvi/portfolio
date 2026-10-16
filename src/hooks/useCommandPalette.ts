import { createContext, useContext } from "react";

export interface PaletteCtx {
  open: () => void;
  close: () => void;
}

export const CommandPaletteContext = createContext<PaletteCtx>({ open: () => {}, close: () => {} });
export const useCommandPalette = () => useContext(CommandPaletteContext);
