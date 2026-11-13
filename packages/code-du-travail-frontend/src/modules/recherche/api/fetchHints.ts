import { cache } from "react";
import { HintsData } from "../modal/types";

const fetchHintsInternal = async (): Promise<HintsData> => {
  // Cached by the browser following the `Cache-Control` of the route.
  const response = await fetch("/api/hints");

  if (!response.ok) {
    throw new Error("Failed to fetch hints");
  }

  return response.json();
};

export const fetchHints = cache(fetchHintsInternal);
