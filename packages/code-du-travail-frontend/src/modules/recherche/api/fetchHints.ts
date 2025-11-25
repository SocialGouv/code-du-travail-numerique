import { cache } from "react";
import { HintsData } from "../modal/types";
import { REVALIDATE_CACHING_TIME } from "src/config";

const fetchHintsInternal = async (): Promise<HintsData> => {
  const response = await fetch("/api/hints", {
    next: {
      revalidate: REVALIDATE_CACHING_TIME,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hints");
  }

  return response.json();
};

export const fetchHints = cache(fetchHintsInternal);
