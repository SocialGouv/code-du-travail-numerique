import { useContext } from "react";

import { PublicodesContext } from "./context";
import { PublicodesContextType } from "./types";

export function usePublicodes(): PublicodesContextType {
  const context = useContext(PublicodesContext);
  if (!context) {
    throw new Error("usePublicodes must be used within a PublicodesProvider");
  }
  return context;
}
