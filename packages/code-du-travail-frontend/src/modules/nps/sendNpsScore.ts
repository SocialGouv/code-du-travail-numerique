"use client";

export const NPS_ENDPOINT = "/api/nps";

type SendNpsScoreInput = {
  // Chemin de la page où la note a été donnée (pathname, avec slash initial).
  pagePath: string;
  // Note 0-10.
  score: number;
};

export const sendNpsScore = async ({
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
      body: JSON.stringify({ score, slug }),
    });
  } catch {
    // Fire-and-forget : un échec ne doit jamais casser l'UI.
  }
};
