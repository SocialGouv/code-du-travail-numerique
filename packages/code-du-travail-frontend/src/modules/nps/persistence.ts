"use client";

// Persistance côté client du widget NPS : cookie « déjà répondu » (2 semaines)
// et flag de session « déjà affiché ». Aucune donnée personnelle : de simples
// drapeaux booléens.

import { safeGetItem, safeSetItem } from "../utils/storage";
import {
  NPS_COOKIE_MAX_AGE_DAYS,
  NPS_COOKIE_NAME,
  NPS_HAND_DISMISSED_KEY,
  NPS_SESSION_KEY,
} from "./constants";

// Cookie posé à la validation : tant qu'il est présent, plus aucune
// sollicitation (déclencheurs désactivés). Écriture via `document.cookie` (même
// approche que le flag d'opt-out Google dans utils/consent.ts, pas de dépendance
// js-cookie).
export const hasAnsweredNps = (): boolean => {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith(`${NPS_COOKIE_NAME}=`));
};

export const markNpsAnswered = (): void => {
  if (typeof document === "undefined") return;
  const maxAgeSeconds = NPS_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${NPS_COOKIE_NAME}=1; max-age=${maxAgeSeconds}; path=/; SameSite=Lax`;
};

// Flag de session : garantit qu'un déclencheur automatique ne s'active qu'une
// seule fois par session (répondu ou non). sessionStorage plutôt que
// localStorage : remis à zéro à chaque nouvelle session de navigation.
export const wasNpsShownThisSession = (): boolean => {
  try {
    return (
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(NPS_SESSION_KEY) === "1"
    );
  } catch {
    return false;
  }
};

export const markNpsShownThisSession = (): void => {
  try {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(NPS_SESSION_KEY, "1");
    }
  } catch {
    // sessionStorage indisponible (mode privé strict, quota) : sans gravité,
    // au pire la modale pourra se réafficher une fois de plus dans la session.
  }
};

// Main « congédiée » : l'usager a ouvert la modale via la main puis l'a fermée
// sans noter → la main disparaît définitivement (localStorage, persistant
// au-delà de la session, contrairement au flag de session ci-dessus).
export const isNpsHandDismissed = (): boolean =>
  safeGetItem(NPS_HAND_DISMISSED_KEY) === "1";

export const markNpsHandDismissed = (): void =>
  safeSetItem(NPS_HAND_DISMISSED_KEY, "1");
