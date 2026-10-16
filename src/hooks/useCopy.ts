import { useCallback } from "react";
import { copyToClipboard } from "../utils/copyToClipboard";
import { useToast } from "./useToast";

export function useCopy() {
  const toast = useToast();
  return useCallback(
    async (text: string, label = "Copied to clipboard") => {
      await copyToClipboard(text);
      toast(label);
    },
    [toast]
  );
}
