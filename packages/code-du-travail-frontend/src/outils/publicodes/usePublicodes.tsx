import { useContext } from "react";

import { PublicodesContext } from "./context";
import { PublicodesContextType, PublicodesResult } from "./types";

export function usePublicodes<
  T extends PublicodesResult
>(): PublicodesContextType<T> {
  const context = useContext(PublicodesContext);
  if (!context) {
    throw new Error("usePublicodes must be used within a PublicodesProvider");
  }
  return context as PublicodesContextType<T>;
}
