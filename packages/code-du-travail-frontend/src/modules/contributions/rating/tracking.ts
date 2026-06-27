"use client";

// Envoi de l'event de notation via une API first-party (`/api/contribution-rating`)
// qui relaie côté serveur vers l'API de tracking Matomo. On n'utilise PAS
// `sendEvent` de @socialgouv/matomo-next ici : il taperait `matomo.php` côté
// client, ce que les adblockers bloquent. Un POST same-origin passe, puis le
// serveur effectue le fetch serveur->serveur invisible des adblockers.

import { getStoredConsent } from "../../utils/consent";
import { RatingMatomo } from "./constants";

export const RATING_TRACKING_ENDPOINT = "/api/contribution-rating";

export type RatingTrackingPayload = {
  contributionTitle: string;
  contributionSlug: string;
  value: number;
};

export const trackContributionRating = async ({
  contributionTitle,
  contributionSlug,
  value,
}: RatingTrackingPayload): Promise<void> => {
  // Cohérence avec le tracking existant (opt-out) : on n'émet rien si l'usager
  // a refusé Matomo. L'UX (confirmation + unicité) reste, elle, active.
  if (typeof window !== "undefined" && !getStoredConsent().matomo) return;

  try {
    // Endpoint en littéral (et non via une variable) pour rester repérable par
    // l'extraction statique des events. On n'envoie ni l'URL ni les libellés :
    // le serveur reconstruit une URL canonique à partir du slug (stable, non
    // falsifiable) et n'a pas besoin du label.
    await fetch("/api/contribution-rating", {
      method: "POST",
      // keepalive : laisse la requête se terminer même si le composant est
      // démonté juste après le clic (navigation immédiate).
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: RatingMatomo.CATEGORY,
        action: RatingMatomo.ACTION,
        name: contributionTitle,
        slug: contributionSlug,
        value,
      }),
    });
  } catch {
    // Fire-and-forget : un échec de tracking ne doit jamais casser l'UI.
  }
};
