import { PIWIK_SITE_ID, PIWIK_URL, SITE_URL } from "../../../config";
import {
  buildPageEvent,
  pageCategoryFromPathname,
  submitNpsAction,
} from "../../../modules/analytics/events";
import { MATOMO_TIMEOUT_MS } from "../constants";

// Relai serveur->serveur vers l'API de tracking Matomo (`matomo.php`).
// C'est cet endpoint que les adblockers bloquent côté client ; l'exécuter côté
// serveur le rend invisible des bloqueurs.
//
// L'event passe par `buildPageEvent`, le même constructeur que les hooks client :
// la catégorie n'est plus posée en dur (« nps »), elle est déduite du type de la
// page où l'usager a répondu — un score NPS donné sur une contribution et un
// score donné sur un simulateur deviennent comparables.
export type NpsScoreEvent = {
  // Chemin de la page sans slash initial (`contribution/mon-slug`), validé par
  // le controller. Sert au `path` du payload et à l'URL canonique.
  slug: string;
  // Note 0-10, bornée par le controller.
  score: number;
  // User-Agent du visiteur : transmis pour que Matomo identifie un vrai
  // navigateur. Sans lui, la requête serveur part avec l'UA par défaut de Node,
  // que Matomo peut classer « bot » et donc ne pas comptabiliser.
  userAgent?: string;
};

export const sendNpsEvent = async ({
  slug,
  score,
  userAgent,
}: NpsScoreEvent): Promise<void> => {
  // URL canonique reconstruite à partir du slug validé : clé de regroupement
  // Matomo stable, jamais une URL brute fournie par le client (pas d'injection
  // ni de fuite de query string).
  const url = `${SITE_URL}/${slug}`;

  // Le score voyage dans l'action (`submit_nps_7`) ET dans `value`. L'action
  // donne la distribution, que Matomo compte — indispensable pour un NPS, qui se
  // calcule en répartition promoteurs/détracteurs et non en moyenne. `value`
  // ajoute la moyenne. L'action reste le porteur fiable : Matomo n'enregistre
  // pas une `value` de 0, et 0 est un score NPS valide (le plus détracteur).
  const event = buildPageEvent({
    category: pageCategoryFromPathname(`/${slug}`),
    action: submitNpsAction(score),
    payload: { path: slug },
    value: score,
  });

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
    e_v: `${score}`,
    url,
  });

  // Anonymisé : aucun `_id` (visiteur), aucun `cip` (IP), aucun cookie. On
  // transmet en revanche le `User-Agent` du visiteur (device detection + évite le
  // classement « bot » qui exclurait l'event des rapports).
  const response = await fetch(`${PIWIK_URL}/matomo.php?${params.toString()}`, {
    signal: AbortSignal.timeout(MATOMO_TIMEOUT_MS),
    headers: userAgent ? { "User-Agent": userAgent } : undefined,
  });
  if (!response.ok) {
    throw new Error(`Matomo tracking failed: ${response.status}`);
  }
};
