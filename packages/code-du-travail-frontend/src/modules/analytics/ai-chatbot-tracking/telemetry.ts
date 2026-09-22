import { PIWIK_SITE_ID, PIWIK_URL, SITE_URL } from "../../../config";
import {
  AI_CHATBOT_TELEMETRY_SOURCE,
  AI_CHATBOT_TELEMETRY_TIMEOUT_MS,
} from "./constants";

export type AiChatbotTelemetry = {
  // Chemin de la page, sans query string ni fragment (même règle que
  // `cleanUrl` côté tracker JS : une seule clé d'URL par page dans Matomo).
  pathname: string;
  // User-Agent brut du chatbot : c'est lui que Matomo classe (BotDetector).
  userAgent: string;
  // Code HTTP de la réponse quand il est connu. Le proxy Next ne connaît pas
  // le statut des pages rendues par l'app : on l'omet alors (Matomo stocke
  // « inconnu ») plutôt que d'envoyer un 200 mensonger.
  httpStatus?: number;
};

// Requête de télémétrie « AI Chatbot » pour le plugin Matomo BotTracking.
// `recMode=1` = mode « bot uniquement » : Matomo ne crée jamais de visite ni
// de session pour ce hit, il alimente seulement les rapports Assistants IA >
// AI Chatbot Overview. Aucune IP (`cip`), aucun identifiant visiteur, aucun
// cookie : uniquement URL + User-Agent (+ statut).
export const buildAiChatbotTelemetryUrl = ({
  pathname,
  userAgent,
  httpStatus,
}: AiChatbotTelemetry): string => {
  const params = new URLSearchParams({
    idsite: PIWIK_SITE_ID,
    rec: "1",
    apiv: "1",
    send_image: "0",
    // `rand` casse le cache HTTP côté Matomo ; pas besoin d'aléa crypto ici.
    rand: `${Date.now()}`,
    recMode: "1",
    url: `${SITE_URL}${pathname}`,
    ua: userAgent,
    source: AI_CHATBOT_TELEMETRY_SOURCE,
  });
  if (httpStatus !== undefined) {
    params.set("http_status", `${httpStatus}`);
  }
  return `${PIWIK_URL}/matomo.php?${params.toString()}`;
};

export const sendAiChatbotTelemetry = async (
  telemetry: AiChatbotTelemetry
): Promise<void> => {
  const response = await fetch(buildAiChatbotTelemetryUrl(telemetry), {
    signal: AbortSignal.timeout(AI_CHATBOT_TELEMETRY_TIMEOUT_MS),
    // `ua` est déjà dans la query ; on aligne aussi le header pour rester
    // cohérent quel que soit le paramètre lu par Matomo.
    headers: { "User-Agent": telemetry.userAgent },
  });
  if (!response.ok) {
    throw new Error(`Matomo AI chatbot telemetry failed: ${response.status}`);
  }
};
