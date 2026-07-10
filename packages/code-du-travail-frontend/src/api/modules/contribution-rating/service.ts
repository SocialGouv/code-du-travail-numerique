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
  // Type de contenu noté (ex. « contribution »). Préfixe le chemin canonique :
  // deux contenus de types différents peuvent porter le même slug, le type les
  // désambiguïse dans les rapports Matomo. Propriété du serveur (jamais fourni
  // par le client) → cf. controller.
  contentType: string;
  // Slug du contenu : combiné au type de contenu pour construire le chemin
  // canonique (URL + nom d'event lisible `e_n`) dans les rapports Matomo.
  slug: string;
};

export const sendRatingEvent = async (event: RatingEvent): Promise<void> => {
  // Chemin canonique « type/slug » : identité stable et lisible du contenu noté,
  // partagée par l'URL et le nom d'event. Le type de contenu préfixe le slug pour
  // éviter les collisions entre deux slugs identiques de types différents.
  const path = `${event.contentType}/${event.slug}`;
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
    // Nom d'event = « type/slug » : identifiant lisible et stable du contenu,
    // préfixé du type de contenu pour désambiguïser deux slugs identiques de
    // types différents (le titre n'est plus relayé par le client → « juste la
    // note »).
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
