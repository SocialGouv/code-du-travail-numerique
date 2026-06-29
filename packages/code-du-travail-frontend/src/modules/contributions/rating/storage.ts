// Dédoublonnage persistant de la notation : on retient les slugs des
// contributions déjà notées dans le localStorage pour qu'un rechargement de
// page ne permette pas de renvoyer un nouvel event (anti vote-stuffing côté
// client ; le serveur reste, lui, la seule source de vérité d'anti-abus).

import { safeGetItem, safeSetItem } from "../../utils/storage";
import { RATING_STORAGE_KEY } from "./constants";

const readRatedSlugs = (): string[] => {
  const raw = safeGetItem(RATING_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((s): s is string => typeof s === "string")
      : [];
  } catch {
    return [];
  }
};

export const isContributionRated = (slug: string): boolean =>
  readRatedSlugs().includes(slug);

export const markContributionRated = (slug: string): void => {
  const slugs = readRatedSlugs();
  if (slugs.includes(slug)) return;
  slugs.push(slug);
  safeSetItem(RATING_STORAGE_KEY, JSON.stringify(slugs));
};
