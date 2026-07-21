"use client";

// Persistance côté client du widget NPS : cookie « déjà répondu » (2 semaines)
// et flag de session « déjà affiché ». Aucune donnée personnelle : de simples
// drapeaux booléens.

import {
  NPS_COOKIE_MAX_AGE_DAYS,
  NPS_COOKIE_NAME,
  NPS_HAND_DISMISSED_KEY,
  NPS_SESSION_KEY,
} from "./constants";
import {
  safeGetSessionItem,
  safeSetSessionItem,
} from "../utils/session.storage";

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
  return safeGetSessionItem(NPS_SESSION_KEY) === "1";
};

export const markNpsShownThisSession = (): void => {
  safeSetSessionItem(NPS_SESSION_KEY, "1");
};

// Main « congédiée » : l'usager a explicitement refusé via « Ne pas répondre »
// → la main disparaît pour le reste de la session.
export const isNpsHandDismissed = (): boolean =>
  safeGetSessionItem(NPS_HAND_DISMISSED_KEY) === "1";

export const markNpsHandDismissed = (): void =>
  safeSetSessionItem(NPS_HAND_DISMISSED_KEY, "1");

// Opt-out volontaire (bouton « Ne pas répondre ») : coupe toute sollicitation
// NPS pour le reste de la session — la main ET les déclencheurs automatiques.
// Portée session (sessionStorage), pas le cookie 2 semaines : l'usager n'a pas
// répondu, on ne le bloque que sur cette session de navigation.
export const dismissNpsForSession = (): void => {
  markNpsHandDismissed();
  markNpsShownThisSession();
};
