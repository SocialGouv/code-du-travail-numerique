import { getRouteBySource, SourceKeys } from "@socialgouv/cdtn-utils";
import { PIWIK_SITE_ID, PIWIK_URL, SITE_URL } from "../../../config";

// Relai serveur->serveur vers l'API de tracking Matomo (`matomo.php`).
// C'est cet endpoint que les adblockers bloquent côté client ; l'exécuter
// côté serveur le rend invisible des bloqueurs. Calqué sur le style de
// `src/api/modules/stats/service.ts` (fetch direct vers PIWIK_URL).

// Délai max du relai. Au-delà on abandonne : le client est en fire-and-forget,
// rien ne doit retenir la fonction serverless si Matomo est lent/injoignable.
const MATOMO_TIMEOUT_MS = 3000;

export type RatingEvent = {
  category: string;
  action: string;
  value: number;
  // Source CDTN du contenu noté (ex. `SOURCES.CONTRIBUTIONS`). Mappée vers sa
  // route canonique (`contribution`, `fiche-service-public`, …) qui préfixe le
  // chemin : deux contenus de sources différentes peuvent porter le même slug,
  // la route les désambiguïse dans Matomo. Validée en amont par le controller
  // (allowlist des sources connues) → cf. controller.
  source: SourceKeys;
  // Slug du contenu : combiné à la route de la source pour construire le chemin
  // canonique (URL + nom d'event lisible `e_n`) dans les rapports Matomo.
  slug: string;
};

export const sendRatingEvent = async (event: RatingEvent): Promise<void> => {
  // Chemin canonique « route/slug » via `getRouteBySource` (le même helper que la
  // recherche) : identité stable et lisible du contenu noté, partagée par l'URL et
  // le nom d'event. La route (issue du mapping, jamais d'une valeur client brute)
  // préfixe le slug pour éviter les collisions entre deux slugs identiques de
  // sources différentes.
  const path = `${getRouteBySource(event.source)}/${event.slug}`;
  // URL canonique construite à partir du chemin validé : clé de regroupement
  // Matomo stable même si le titre change, et impossible à détourner depuis le
  // client (on n'utilise jamais une URL fournie par lui → pas d'injection ni de
  // fuite de query string).
  const url = `${SITE_URL}/${path}`;

  const params = new URLSearchParams({
    idsite: PIWIK_SITE_ID,
    rec: "1",
    apiv: "1",
    send_image: "0",
    // `rand` casse le cache HTTP côté Matomo ; pas besoin d'aléa crypto ici.
    rand: `${Date.now()}`,
    e_c: event.category,
    e_a: event.action,
    // Nom d'event = « route/slug » : identifiant lisible et stable du contenu,
    // préfixé de la route de sa source pour désambiguïser deux slugs identiques
    // de sources différentes (le titre n'est plus relayé par le client → « juste
    // la note »).
    e_n: path,
    e_v: `${event.value}`,
    url,
  });

  // Anonymisé : aucun `_id` (visiteur), aucun `cip` (IP), aucun cookie.
  // Pas de `action_name` : on n'émet qu'un event custom (e_*), pas un pageview ;
  // l'ajouter créerait une action/pageview fantôme dans les rapports.
  const response = await fetch(`${PIWIK_URL}/matomo.php?${params.toString()}`, {
    signal: AbortSignal.timeout(MATOMO_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`Matomo tracking failed: ${response.status}`);
  }
};
