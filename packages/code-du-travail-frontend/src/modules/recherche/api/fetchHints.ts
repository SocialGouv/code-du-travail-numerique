import { REVALIDATE_CACHING_TIME } from "src/config";
import { HintsData } from "../modal/types";

export const fetchHints = async (): Promise<HintsData> => {
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
