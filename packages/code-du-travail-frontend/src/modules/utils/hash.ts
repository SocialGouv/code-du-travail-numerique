import { slugify } from "@socialgouv/cdtn-utils";

export const cleanHash = (hash: string): string => {
  if (!hash) return "";

  let cleaned = hash.startsWith("#") ? hash.slice(1) : hash;

  try {
    cleaned = decodeURIComponent(cleaned);
  } catch {
    console.warn("Failed to decode hash:", hash);
  }

  return slugify(cleaned.trim());
};
