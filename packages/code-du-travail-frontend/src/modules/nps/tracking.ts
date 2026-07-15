"use client";

// Events Matomo du NPS : uniquement l'affichage et le refus, via le `sendEvent`
// standard (comme les autres tracking.ts du projet : modeles-de-courriers,
// common, feedback…). L'envoi du SCORE n'est PAS du tracking : il passe par
// l'API proxy interne (cf. sendNpsScore.ts).

import { useCallback } from "react";
import { sendEvent } from "@socialgouv/matomo-next";
import { NpsEvent, NpsTrigger } from "./constants";

// Nom d'event Matomo = chemin sans le slash initial (`contribution/mon-slug`) :
// type de page + slug.
const toEventName = (pagePath: string): string => pagePath.replace(/^\/+/, "");

export const useNpsEvents = () => {
  const trackDisplayed = useCallback(
    (trigger: NpsTrigger, pagePath: string) => {
      sendEvent({
        category: NpsEvent.DISPLAYED,
        action: trigger,
        name: toEventName(pagePath),
      });
    },
    []
  );

  const trackRefusal = useCallback((trigger: NpsTrigger, pagePath: string) => {
    sendEvent({
      category: NpsEvent.REFUSAL,
      action: trigger,
      name: toEventName(pagePath),
    });
  }, []);

  return { trackDisplayed, trackRefusal };
};
