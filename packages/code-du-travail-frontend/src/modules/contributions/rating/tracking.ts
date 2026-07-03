"use client";

// Envoi de la note via une route API first-party (`/api/contribution-rating`)
// qui relaie côté serveur vers Matomo. On n'appelle PAS le `sendEvent` de
// @socialgouv/matomo-next : il taperait `matomo.php` côté client, ce que les
// adblockers bloquent. Un POST same-origin passe, puis le serveur effectue le
// fetch serveur->serveur invisible des adblockers.

import { getStoredConsent } from "../../utils/consent";
import { RatingMatomo } from "./constants";

export const RATING_TRACKING_ENDPOINT = "/api/contribution-rating";

// Relai first-party exposant une méthode `sendEvent` de même forme que
// @socialgouv/matomo-next : l'extraction statique des events (`cdtn-stats`) le
// catalogue donc via sa règle `.sendEvent` existante — SANS règle dédiée —
// alors qu'il POST en réalité vers notre API interne (contournement adblock).
// `category`/`action` (enum → résolus statiquement) servent au catalogue ; seuls
// `slug` et `value` partent réellement sur le réseau, le serveur étant seul
// propriétaire de category/action et de l'URL canonique (cf. controller/service).
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
      // Payload minimal « juste la note » : le serveur ajoute category/action et
      // reconstruit l'URL canonique depuis le slug (anti-injection).
      body: JSON.stringify({ slug: event.slug, value: event.value }),
    });
  },
};

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
    // category/action en enum → résolus statiquement par l'extraction. Le `name`
    // documente l'`e_n` réel (le slug, posé côté serveur). `slug`/`value` sont
    // les seules données réellement transmises.
    await firstPartyMatomo.sendEvent({
      category: RatingMatomo.CATEGORY,
      action: RatingMatomo.ACTION,
      name: contributionSlug,
      value,
      slug: contributionSlug,
    });
  } catch {
    // Fire-and-forget : un échec de tracking ne doit jamais casser l'UI.
  }
};
