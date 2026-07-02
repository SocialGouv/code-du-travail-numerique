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
  // Slug de la contribution : sert à construire l'URL canonique côté serveur et
  // de nom d'event lisible (`e_n`) dans les rapports Matomo.
  slug: string;
};

export const sendRatingEvent = async (event: RatingEvent): Promise<void> => {
  // URL canonique construite à partir du slug validé : clé de regroupement
  // Matomo stable même si le titre change, et impossible à détourner depuis le
  // client (on n'utilise jamais une URL fournie par lui → pas d'injection ni de
  // fuite de query string).
  const url = `${SITE_URL}/contribution/${event.slug}`;

  const params = new URLSearchParams({
    idsite: PIWIK_SITE_ID,
    rec: "1",
    apiv: "1",
    send_image: "0",
    // `rand` casse le cache HTTP côté Matomo ; pas besoin d'aléa crypto ici.
    rand: `${Date.now()}`,
    e_c: event.category,
    e_a: event.action,
    // Nom d'event = slug : identifiant lisible et stable de la contribution
    // (le titre n'est plus relayé par le client → « juste la note »).
    e_n: event.slug,
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
