import { getRouteBySource, SourceKeys } from "@socialgouv/cdtn-utils";
import { PIWIK_SITE_ID, PIWIK_URL, SITE_URL } from "../../../config";
import {
  buildPageEvent,
  pageCategoryFromPathname,
  rateContentAction,
} from "../../../modules/analytics/events";
import { MATOMO_TIMEOUT_MS } from "../constants";

// Relai serveur->serveur vers l'API de tracking Matomo (`matomo.php`).
// C'est cet endpoint que les adblockers bloquent côté client ; l'exécuter côté
// serveur le rend invisible des bloqueurs.
//
// L'event est construit par `buildPageEvent`, exactement comme côté client : cet
// event et celui du NPS étaient les deux plus divergents de l'ancien schéma
// (catégorie en dur, note dans l'action, slug nu en `e_n`). Les faire passer par
// le socle commun est la seule façon que la normalisation tienne des deux côtés.
export type RatingEvent = {
  // Source CDTN du contenu noté (ex. `SOURCES.CONTRIBUTIONS`). Mappée vers sa
  // route canonique (`contribution`, `fiche-service-public`, …) qui préfixe le
  // chemin : deux contenus de sources différentes peuvent porter le même slug,
  // la route les désambiguïse. Validée en amont par le controller (allowlist
  // des sources connues) → cf. controller.
  source: SourceKeys;
  // Slug du contenu, combiné à la route de la source pour construire le chemin
  // canonique (URL + `path` du payload).
  slug: string;
  // Note 1-5, bornée par le controller.
  value: number;
  // User-Agent du visiteur : transmis pour que Matomo identifie un vrai
  // navigateur. Sans lui, la requête serveur part avec l'UA par défaut de Node,
  // que Matomo peut classer « bot » et donc ne pas comptabiliser.
  userAgent?: string;
};

export const sendRatingEvent = async ({
  source,
  slug,
  value,
  userAgent,
}: RatingEvent): Promise<void> => {
  // Chemin canonique « route/slug » via `getRouteBySource` : identité stable et
  // lisible du contenu noté. La route vient du mapping, jamais d'une valeur
  // client brute.
  const path = `${getRouteBySource(source)}/${slug}`;
  // URL canonique construite à partir du chemin validé : clé de regroupement
  // Matomo stable même si le titre change, et impossible à détourner depuis le
  // client (on n'utilise jamais une URL fournie par lui → pas d'injection ni de
  // fuite de query string).
  const url = `${SITE_URL}/${path}`;

  // La note voyage à la fois dans l'action (`rate_content_4`) et dans `value`.
  // L'action donne la DISTRIBUTION (combien de 1, combien de 2…), que Matomo
  // sait compter ; `value` donne la moyenne, que Matomo sait agréger. L'action
  // reste le porteur fiable : Matomo n'enregistre pas une `value` de 0.
  const event = buildPageEvent({
    category: pageCategoryFromPathname(`/${path}`),
    action: rateContentAction(value),
    payload: { path },
    value,
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
    e_v: `${value}`,
    url,
  });

  // Anonymisé : aucun `_id` (visiteur), aucun `cip` (IP), aucun cookie. On
  // transmet en revanche le `User-Agent` du visiteur (device detection + évite le
  // classement « bot » qui exclurait l'event des rapports).
  // Pas de `action_name` : on n'émet qu'un event custom (e_*), pas un pageview ;
  // l'ajouter créerait une action/pageview fantôme dans les rapports.
  const response = await fetch(`${PIWIK_URL}/matomo.php?${params.toString()}`, {
    signal: AbortSignal.timeout(MATOMO_TIMEOUT_MS),
    headers: userAgent ? { "User-Agent": userAgent } : undefined,
  });
  if (!response.ok) {
    throw new Error(`Matomo tracking failed: ${response.status}`);
  }
};
