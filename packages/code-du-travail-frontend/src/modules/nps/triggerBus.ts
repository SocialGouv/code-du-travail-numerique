"use client";

// Petit bus d'événements découplant les déclencheurs « métier » (Télécharger /
// Copier sur les modèles de courrier) du widget NPS monté globalement. Les
// composants concernés émettent un CustomEvent `window` ; le widget y souscrit.
// Même idiome que `window.dispatchEvent(new Event("cdtn:consent-updated"))`.

import { NpsTrigger } from "./constants";

export const NPS_TRIGGER_EVENT = "cdtn:nps-trigger";

export type NpsTriggerEventDetail = { trigger: NpsTrigger };

export const notifyNpsTrigger = (trigger: NpsTrigger): void => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<NpsTriggerEventDetail>(NPS_TRIGGER_EVENT, {
      detail: { trigger },
    })
  );
};
