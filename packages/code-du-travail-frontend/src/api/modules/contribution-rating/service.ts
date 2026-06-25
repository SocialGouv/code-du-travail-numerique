import { PIWIK_SITE_ID, PIWIK_URL } from "../../../config";

// Relai serveur->serveur vers l'API de tracking Matomo (`matomo.php`).
// C'est cet endpoint que les adblockers bloquent côté client ; l'exécuter
// côté serveur le rend invisible des bloqueurs. Calqué sur le style de
// `src/api/modules/stats/service.ts` (fetch direct vers PIWIK_URL).

export type RatingEvent = {
  category: string;
  action: string;
  name: string;
  value: number;
  url?: string;
};

export const sendRatingEvent = async (event: RatingEvent): Promise<void> => {
  const params = new URLSearchParams({
    idsite: PIWIK_SITE_ID,
    rec: "1",
    apiv: "1",
    send_image: "0",
    // `rand` casse le cache HTTP côté Matomo ; pas besoin d'aléa crypto ici.
    rand: `${Date.now()}`,
    e_c: event.category,
    e_a: event.action,
    e_n: event.name,
    e_v: `${event.value}`,
    action_name: event.name,
  });
  if (event.url) {
    params.set("url", event.url);
  }

  // Anonymisé : aucun `_id` (visiteur), aucun `cip` (IP), aucun cookie.
  const response = await fetch(`${PIWIK_URL}/matomo.php?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Matomo tracking failed: ${response.status}`);
  }
};
