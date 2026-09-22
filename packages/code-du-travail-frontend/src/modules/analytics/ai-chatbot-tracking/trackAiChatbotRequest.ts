import { detectAiChatbot, isTrackablePathname } from "./detection";
import { sendAiChatbotTelemetry } from "./telemetry";

// Sous-ensemble structurel de NextRequest / NextFetchEvent : évite de dépendre
// de `next/server` ici (testable avec de simples objets).
export type AiChatbotRequestLike = {
  method: string;
  headers: { get(name: string): string | null };
  nextUrl: { pathname: string };
};

export type AiChatbotFetchEventLike = {
  waitUntil?: (promise: Promise<unknown>) => void;
};

// Point d'entrée appelé par le proxy Next sur chaque requête de page.
// Fire-and-forget : la réponse à l'usager n'attend jamais Matomo, et toute
// erreur (timeout, Matomo injoignable, réponse non-ok) est avalée.
// Renvoie true si une télémétrie a été déclenchée (utile pour les tests).
export const trackAiChatbotRequest = (
  request: AiChatbotRequestLike,
  event?: AiChatbotFetchEventLike
): boolean => {
  if (request.method !== "GET") {
    return false;
  }
  const userAgent = request.headers.get("user-agent");
  if (!detectAiChatbot(userAgent) || !userAgent) {
    return false;
  }
  if (!isTrackablePathname(request.nextUrl.pathname)) {
    return false;
  }

  const telemetry = sendAiChatbotTelemetry({
    pathname: request.nextUrl.pathname,
    userAgent,
  }).catch(() => {
    // Volontairement silencieux : la télémétrie bot ne doit jamais remonter
    // d'erreur (ni Sentry, ni logs) pour une page servie normalement.
  });

  // `waitUntil` garde la promesse vivante après l'envoi de la réponse sans la
  // bloquer. Sans lui (tests, runtimes exotiques), on laisse la promesse filer.
  if (event?.waitUntil) {
    event.waitUntil(telemetry);
  }
  return true;
};
