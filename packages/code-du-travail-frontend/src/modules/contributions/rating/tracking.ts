"use client";

// Envoi de l'event de notation via une API first-party (`/api/contribution-rating`)
// qui relaie côté serveur vers l'API de tracking Matomo. On n'utilise PAS
// `sendEvent` de @socialgouv/matomo-next : il taperait `matomo.php` côté client,
// ce que les adblockers bloquent. Un POST same-origin passe, puis le serveur
// effectue le fetch serveur->serveur invisible des adblockers.

import { getStoredConsent } from "../../utils/consent";
import { RatingMatomo } from "./constants";

export const RATING_TRACKING_ENDPOINT = "/api/contribution-rating";

// Relai first-party exposant une méthode `sendEvent` de même forme que
// @socialgouv/matomo-next : l'extraction statique des events (`cdtn-stats`) le
// détecte donc via sa règle `.sendEvent` existante, SANS règle dédiée, alors
// qu'il POST en réalité vers notre API interne (contournement adblock).
const firstPartyMatomo = {
  sendEvent: async (event: {
    category: RatingMatomo;
    action: RatingMatomo;
    name: string;
    value: number;
    slug: string;
  }): Promise<void> => {
    await fetch(RATING_TRACKING_ENDPOINT, {
      method: "POST",
      // keepalive : laisse la requête se terminer même si le composant est
      // démonté juste après le clic (navigation immédiate).
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
  },
};

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
    // category/action en enum → résolus statiquement par l'extraction. `value`
    // et `slug` voyagent jusqu'au serveur (l'extraction les ignore) : le slug
    // sert à reconstruire l'URL canonique côté serveur.
    await firstPartyMatomo.sendEvent({
      category: RatingMatomo.CATEGORY,
      action: RatingMatomo.ACTION,
      name: contributionTitle,
      value,
      slug: contributionSlug,
    });
  } catch {
    // Fire-and-forget : un échec de tracking ne doit jamais casser l'UI.
  }
};
