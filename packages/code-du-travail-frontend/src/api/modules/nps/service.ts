import { NpsEvent, NpsTrigger } from "../../../modules/nps/constants";
import { PIWIK_SITE_ID, PIWIK_URL, SITE_URL } from "../../../config";
import { MATOMO_TIMEOUT_MS } from "../";

// Relai serveur->serveur vers l'API de tracking Matomo (`matomo.php`).
// C'est cet endpoint que les adblockers bloquent côté client ; l'exécuter côté
// serveur le rend invisible des bloqueurs. Calqué sur
// src/api/modules/contribution-rating/service.ts.
export type NpsScoreEvent = {
  // Déclencheur ayant amené l'usager à noter (validé par le controller).
  trigger: NpsTrigger;
  // Chemin de la page sans slash initial (`contribution/mon-slug`), validé par
  // le controller (charset strict, sans query string). Sert au nom d'event et à
  // l'URL canonique.
  slug: string;
  // Note 0-10.
  score: number;
  // User-Agent du visiteur : transmis pour que Matomo identifie un vrai
  // navigateur. Sans lui, la requête serveur part avec l'UA par défaut de Node,
  // que Matomo peut classer « bot » et donc ne pas comptabiliser.
  userAgent?: string;
};

export const sendNpsEvent = async ({
  trigger,
  slug,
  score,
  userAgent,
}: NpsScoreEvent): Promise<void> => {
  // URL canonique reconstruite à partir du slug validé : clé de regroupement
  // Matomo stable, jamais une URL brute fournie par le client (pas d'injection
  // ni de fuite de query string).
  const url = `${SITE_URL}/${slug}`;

  const params = new URLSearchParams({
    idsite: PIWIK_SITE_ID,
    rec: "1",
    apiv: "1",
    send_image: "0",
    // `rand` casse le cache HTTP côté Matomo ; pas besoin d'aléa crypto ici.
    rand: `${Date.now()}`,
    // Catégorie en dur : cette API ne relaie QUE la soumission d'une note NPS.
    e_c: NpsEvent.SUBMITTED,
    e_a: trigger,
    e_n: slug,
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
