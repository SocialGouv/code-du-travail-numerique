"use client";

// Envoi de l'event de notation via une API first-party (`/api/contribution-rating`)
// qui relaie côté serveur vers l'API de tracking Matomo. On n'utilise PAS
// `sendEvent` de @socialgouv/matomo-next ici : il taperait `matomo.php` côté
// client, ce que les adblockers bloquent. Un POST same-origin passe, puis le
// serveur effectue le fetch serveur->serveur invisible des adblockers.

import { getStoredConsent } from "../../utils/consent";
import {
  RATING_MATOMO_ACTION,
  RATING_MATOMO_CATEGORY,
  RATING_LABELS,
} from "./constants";

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
    await fetch(RATING_TRACKING_ENDPOINT, {
      method: "POST",
      // keepalive : laisse la requête se terminer même si le composant est
      // démonté juste après le clic (navigation immédiate).
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: RATING_MATOMO_CATEGORY,
        action: RATING_MATOMO_ACTION,
        name: contributionTitle,
        url: typeof window !== "undefined" ? window.location.href : undefined,
        slug: contributionSlug,
        value,
        label: RATING_LABELS[value],
      }),
    });
  } catch {
    // Fire-and-forget : un échec de tracking ne doit jamais casser l'UI.
  }
};
