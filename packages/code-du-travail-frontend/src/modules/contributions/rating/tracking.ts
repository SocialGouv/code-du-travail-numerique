"use client";

// Envoi de la note via une route API first-party (`/api/contribution-rating`)
// qui relaie côté serveur vers Matomo. On n'appelle PAS `sendEvent` /
// `useTracking` : ils taperaient `matomo.php` côté client, ce que les adblockers
// bloquent. Un POST same-origin passe, puis le serveur effectue le fetch
// serveur->serveur invisible des bloqueurs.

import { SOURCES, SourceKeys } from "@socialgouv/cdtn-utils";
import { rateContentAction } from "../../analytics/events";
import { getStoredConsent } from "../../utils/consent";

export const RATING_TRACKING_ENDPOINT = "/api/contribution-rating";

// Relai first-party exposant une méthode `sendEvent` de même forme que
// @socialgouv/matomo-next : l'extraction statique des events (`cdtn-stats`) le
// catalogue donc via sa règle `.sendEvent` existante — SANS règle dédiée — alors
// qu'il POST en réalité vers notre API interne (contournement adblock).
// `category`/`action` servent au catalogue ; seuls `source`, `slug` et `value`
// partent réellement sur le réseau, le serveur étant seul propriétaire de
// l'identité de l'event et de l'URL canonique (cf. controller/service).
const firstPartyMatomo = {
  sendEvent: async (event: {
    category: string;
    action: string;
    name: string;
    value: number;
    source: SourceKeys;
    slug: string;
  }): Promise<void> => {
    await fetch(RATING_TRACKING_ENDPOINT, {
      method: "POST",
      // keepalive : laisse la requête se terminer même si le composant est
      // démonté juste après le clic (navigation immédiate).
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      // Payload minimal : la source du contenu, son slug et la note. Le serveur
      // construit l'event via le socle commun et reconstruit l'URL canonique
      // (anti-injection : source validée contre l'allowlist).
      body: JSON.stringify({
        source: event.source,
        slug: event.slug,
        value: event.value,
      }),
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
  // Cohérence avec le reste du tracking (opt-out) : on n'émet rien si l'usager a
  // refusé Matomo. On sort aussi côté serveur (pas de `window`) — le `||`
  // court-circuite avant getStoredConsent (qui lit le stockage client, absent en
  // SSR). L'UX (confirmation) reste, elle, active.
  if (typeof window === "undefined" || !getStoredConsent().matomo) return;

  try {
    // La catégorie réelle est déduite côté serveur du type de page ; on
    // documente ici la valeur attendue pour la contribution, seul type de
    // contenu portant aujourd'hui le widget de notation. Le `name` documente
    // l'enveloppe JSON que le serveur construira. La notation vit sur les
    // contributions → source = SOURCES.CONTRIBUTIONS.
    await firstPartyMatomo.sendEvent({
      category: "contribution",
      action: rateContentAction(value),
      name: JSON.stringify({ path: `contribution/${contributionSlug}` }),
      source: SOURCES.CONTRIBUTIONS,
      value,
      slug: contributionSlug,
    });
  } catch {
    // Fire-and-forget : un échec de tracking ne doit jamais casser l'UI.
  }
};
