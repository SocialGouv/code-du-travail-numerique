import { PublicodesContextType } from "@socialgouv/modeles-social";
import { useContext } from "react";

import { PublicodesContext } from "./context";

export function usePublicodes(): PublicodesContextType {
  const context = useContext(PublicodesContext);
  if (!context) {
    throw new Error("usePublicodes must be used within a PublicodesProvider");
  }
  return context as PublicodesContextType;
}
