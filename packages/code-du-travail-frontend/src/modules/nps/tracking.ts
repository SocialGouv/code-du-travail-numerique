"use client";

// Events du cycle de vie de la modale NPS : affichage, refus « simple »,
// opt-out explicite. L'envoi du SCORE n'est pas ici : il passe par l'API proxy
// interne (cf. sendNpsScore.ts), qui relaie côté serveur pour contourner les
// bloqueurs.
//
// Le déclencheur suffixait l'action dans l'ancien schéma (`display_exit_intent`,
// `refusal_main`…), ce qui multipliait les actions par le nombre de
// déclencheurs. Il devient une clé de payload.

import { useTracking } from "../analytics/events/useTracking";
import { NpsTrigger } from "./constants";

export const useNpsEvents = () => {
  const { track } = useTracking();

  const trackDisplayed = (trigger: NpsTrigger) => {
    track("display_nps", { trigger });
  };

  const trackRefusal = (trigger: NpsTrigger) => {
    track("refuse_nps", { trigger });
  };

  // Opt-out explicite (« Ne pas répondre ») : distinct du refus « simple »
  // (fermeture / Échap / clic hors modale) pour mesurer à part les coupures de
  // sollicitation.
  const trackOptOut = (trigger: NpsTrigger) => {
    track("optout_nps", { trigger });
  };

  return { trackDisplayed, trackRefusal, trackOptOut };
};
