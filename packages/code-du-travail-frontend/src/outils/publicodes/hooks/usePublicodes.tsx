import { useContext } from "react";

import { PublicodesContext } from "../context";
import { PublicodesContext as PublicodesContextType } from "../types";

export function usePublicodes(): PublicodesContextType | null {
  const context = useContext(PublicodesContext);
  if (!context) {
    throw new Error("usePublicodes must be used within a PublicodesProvider");
  }
  return context;
}
