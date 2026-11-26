import { HintsData } from "../modal/types";

export const fetchHints = async (): Promise<HintsData> => {
  // Freshness is handled by the hints store (`useHints`): always ask the
  // server, which answers from its own cache.
  const response = await fetch("/api/hints", { cache: "no-cache" });

  if (!response.ok) {
    throw new Error("Failed to fetch hints");
  }

  return response.json();
};
