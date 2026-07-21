"use client";

// Events Matomo du NPS : uniquement l'affichage et le refus, via le `sendEvent`
// standard (comme les autres tracking.ts du projet : modeles-de-courriers,
// common, feedback…). L'envoi du SCORE n'est PAS du tracking : il passe par
// l'API proxy interne (cf. sendNpsScore.ts).

import { sendEvent } from "@socialgouv/matomo-next";
import { NPS_CATEGORY, NpsTrigger } from "./constants";

// Nom d'event Matomo = chemin sans le slash initial (`contribution/mon-slug`) :
// type de page + slug.
const toEventName = (pagePath: string): string => pagePath.replace(/^\/+/, "");

export const useNpsEvents = () => {
  const trackDisplayed = (trigger: NpsTrigger, pagePath: string) => {
    sendEvent({
      category: NPS_CATEGORY,
      action: `display_${trigger}`,
      name: toEventName(pagePath),
    });
  };

  const trackRefusal = (trigger: NpsTrigger, pagePath: string) => {
    sendEvent({
      category: NPS_CATEGORY,
      action: `refusal_${trigger}`,
      name: toEventName(pagePath),
    });
  };

  // Opt-out explicite (« Ne pas répondre ») : distinct du refus « simple »
  // (fermeture/Échap/overlay) pour mesurer à part les coupures de session.
  const trackOptOut = (trigger: NpsTrigger, pagePath: string) => {
    sendEvent({
      category: NPS_CATEGORY,
      action: `optout_${trigger}`,
      name: toEventName(pagePath),
    });
  };

  return { trackDisplayed, trackRefusal, trackOptOut };
};
