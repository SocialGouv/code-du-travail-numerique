// Constructeur unique de tout event Matomo du site. Fonction PURE et sans
// dépendance React/DOM : c'est ce qui permet aux deux relais serveur
// (`/api/nps`, `/api/contribution-rating`) d'émettre exactement le même contrat
// que les hooks client. Ces deux events étaient les plus divergents de l'ancien
// schéma — les faire passer ici est la seule façon que la normalisation tienne.

import type { EventAction } from "./actions";
import type { PageCategory } from "./categories";
import { serializeEventPayload, type EventPayload } from "./payload";

export type PageEventInput = {
  /** Type de la page où l'event se produit. */
  category: PageCategory;
  /** Ce que l'usager a fait. */
  action: EventAction;
  /** Contexte. Toutes les clés sont optionnelles. */
  payload?: EventPayload;
  /**
   * Métrique numérique agrégeable (`sum_event_value` / `avg_event_value`).
   *
   * DOUBLON D'AGRÉGATION, jamais le seul porteur d'une information : Matomo ne
   * conserve pas une `value` de 0 (matomo-org/matomo#11204). Toute donnée passée
   * ici DOIT aussi figurer dans le payload — c'est le payload qui fait foi.
   */
  value?: number;
};

export type PageEvent = {
  category: string;
  action: string;
  name: string;
  value?: number;
};

/**
 * Construit le triplet Matomo `{category, action, name}` (+ `value`) à partir du
 * contrat normalisé.
 *
 * `name` est toujours renseigné (au minimum `"{}"`) : Matomo jette les noms
 * falsy, cf. `payload.ts`.
 */
export const buildPageEvent = ({
  category,
  action,
  payload,
  value,
}: PageEventInput): PageEvent => {
  const event: PageEvent = {
    category,
    action,
    name: serializeEventPayload(payload),
  };

  // `value` reste absent plutôt que présent à 0 quand elle n'a pas de sens :
  // Matomo intègre les valeurs manquantes et les zéros différemment dans
  // `avg_event_value`.
  if (typeof value === "number" && Number.isFinite(value)) {
    event.value = value;
  }

  return event;
};
