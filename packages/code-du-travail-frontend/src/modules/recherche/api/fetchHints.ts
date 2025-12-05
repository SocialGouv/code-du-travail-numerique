import { cache } from "react";
import { HintsData } from "../modal/types";

const fetchHintsInternal = async (): Promise<HintsData> => {
  const response = await fetch("/api/hints", {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hints");
  }

  return response.json();
};

export const fetchHints = cache(fetchHintsInternal);
