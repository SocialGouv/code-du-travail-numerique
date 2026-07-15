"use client";

// Envoi du score NPS via notre API proxy interne (`/api/nps`). Ce n'est PAS du
// tracking : c'est la remontée d'une donnée métier (la note explicitement donnée
// par l'usager au clic sur « Valider »). L'API proxy centralise cet envoi et
// permettra demain de router le score ailleurs (autre backend, base de
// données…) sans toucher au client. Indépendant du consentement Matomo (feedback
// volontaire de l'usager, pas du suivi comportemental).

import { NpsTrigger } from "./constants";

export const NPS_ENDPOINT = "/api/nps";

type SendNpsScoreInput = {
  // Déclencheur ayant amené l'usager à noter (exit_intent / download / copy / main).
  trigger: NpsTrigger;
  // Chemin de la page où la note a été donnée (pathname, avec slash initial).
  pagePath: string;
  // Note 0-10.
  score: number;
};

export const sendNpsScore = async ({
  trigger,
  pagePath,
  score,
}: SendNpsScoreInput): Promise<void> => {
  if (typeof window === "undefined") return;

  // slug = chemin sans le slash initial (`contribution/mon-slug`). L'identité de
  // l'event (nps_submitted) est posée en dur côté API.
  const slug = pagePath.replace(/^\/+/, "");

  try {
    await fetch(NPS_ENDPOINT, {
      method: "POST",
      // keepalive : la requête se termine même si le composant est démonté juste
      // après (fermeture immédiate de la modale à la validation).
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score, trigger, slug }),
    });
  } catch {
    // Fire-and-forget : un échec ne doit jamais casser l'UI.
  }
};
