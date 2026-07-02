"use client";

// Envoi de la note via une route API first-party (`/api/contribution-rating`)
// qui relaie côté serveur vers Matomo. On n'utilise PAS `sendEvent` de
// @socialgouv/matomo-next : il taperait `matomo.php` côté client, ce que les
// adblockers bloquent. Un POST same-origin passe, puis le serveur effectue le
// fetch serveur->serveur invisible des adblockers.

import { getStoredConsent } from "../../utils/consent";

export const RATING_TRACKING_ENDPOINT = "/api/contribution-rating";

export type RatingTrackingPayload = {
  contributionSlug: string;
  value: number;
};

export const trackContributionRating = async ({
  contributionSlug,
  value,
}: RatingTrackingPayload): Promise<void> => {
  // Cohérence avec le tracking existant (opt-out) : on n'émet rien si l'usager
  // a refusé Matomo. L'UX (confirmation) reste, elle, active.
  if (typeof window !== "undefined" && !getStoredConsent().matomo) return;

  try {
    // Route API classique : on envoie juste la note et le slug de la
    // contribution. Le serveur valide (zod) puis relaie vers Matomo.
    await fetch(RATING_TRACKING_ENDPOINT, {
      method: "POST",
      // keepalive : laisse la requête se terminer même si le composant est
      // démonté juste après le clic (navigation immédiate).
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: contributionSlug, value }),
    });
  } catch {
    // Fire-and-forget : un échec de tracking ne doit jamais casser l'UI.
  }
};
