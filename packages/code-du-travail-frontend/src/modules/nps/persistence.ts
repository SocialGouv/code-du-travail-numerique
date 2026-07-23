"use client";

// Persistance côté client du widget NPS : cookies « déjà répondu » (2 semaines)
// et « ne pas répondre » (1 jour), plus flag de session « déjà affiché ».
// Aucune donnée personnelle : de simples drapeaux booléens.

import {
  NPS_COOKIE_MAX_AGE_DAYS,
  NPS_COOKIE_NAME,
  NPS_OPTOUT_COOKIE_MAX_AGE_DAYS,
  NPS_OPTOUT_COOKIE_NAME,
  NPS_SESSION_KEY,
} from "./constants";
import {
  safeGetSessionItem,
  safeSetSessionItem,
} from "../utils/session.storage";

// Drapeaux booléens en cookie, écrits via `document.cookie` (même approche que
// le flag d'opt-out Google dans utils/consent.ts, pas de dépendance js-cookie).
const hasFlagCookie = (name: string): boolean => {
  if (typeof document === "undefined") return false;
  // Comparaison stricte du nom (pas de startsWith sur la chaîne brute) pour
  // éviter un faux positif sur un cookie dont le nom partage le même préfixe.
  // Séparateur « ; » (avec espace) conforme à document.cookie ; le trim reste
  // en défense au cas où un navigateur omettrait l'espace.
  return document.cookie
    .split("; ")
    .some((cookie) => cookie.split("=")[0].trim() === name);
};

const setFlagCookie = (name: string, maxAgeDays: number): void => {
  if (typeof document === "undefined") return;
  // max-age ≤ 0 supprimerait le cookie au lieu de le poser : on ne pose rien
  // (warn plutôt que throw : ne pas casser un handler de clic en production
  // pour une constante mal configurée).
  if (maxAgeDays <= 0) {
    console.warn(
      `setFlagCookie: maxAgeDays doit être > 0 (reçu ${maxAgeDays}), cookie ${name} non posé`
    );
    return;
  }
  const maxAgeSeconds = maxAgeDays * 24 * 60 * 60;
  // Secure uniquement en https : en dev local (http), le cookie serait
  // silencieusement rejeté par le navigateur.
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=1; max-age=${maxAgeSeconds}; path=/; SameSite=Lax${secure}`;
};

// Cookie posé à la validation : tant qu'il est présent, plus aucune
// sollicitation (déclencheurs désactivés).
export const hasAnsweredNps = (): boolean => hasFlagCookie(NPS_COOKIE_NAME);

export const markNpsAnswered = (): void =>
  setFlagCookie(NPS_COOKIE_NAME, NPS_COOKIE_MAX_AGE_DAYS);

// Flag de session : garantit qu'un déclencheur automatique ne s'active qu'une
// seule fois par session (répondu ou non). sessionStorage plutôt que
// localStorage : remis à zéro à chaque nouvelle session de navigation.
export const wasNpsShownThisSession = (): boolean => {
  return safeGetSessionItem(NPS_SESSION_KEY) === "1";
};

export const markNpsShownThisSession = (): void => {
  safeSetSessionItem(NPS_SESSION_KEY, "1");
};

// Opt-out volontaire (bouton « Ne pas répondre ») : coupe toute sollicitation
// NPS — main ET déclencheurs automatiques — pendant 1 jour. Cookie et non
// sessionStorage : le sessionStorage est propre à chaque onglet, un nouvel
// onglet re-sollicitait l'usager qui venait pourtant de refuser.
export const hasOptedOutNps = (): boolean =>
  hasFlagCookie(NPS_OPTOUT_COOKIE_NAME);

export const markNpsOptedOut = (): void =>
  setFlagCookie(NPS_OPTOUT_COOKIE_NAME, NPS_OPTOUT_COOKIE_MAX_AGE_DAYS);
