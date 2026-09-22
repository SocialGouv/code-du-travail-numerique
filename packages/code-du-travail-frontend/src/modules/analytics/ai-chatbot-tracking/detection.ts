import { WIDGETS_PATH } from "../../../config";
import { AI_CHATBOT_USER_AGENT_PATTERNS } from "./constants";

// Renvoie le nom du chatbot IA reconnu dans le User-Agent, ou null.
// Même règle que Matomo (BotDetector.php) : sous-chaîne, insensible à la casse.
export const detectAiChatbot = (
  userAgent: string | null | undefined
): string | null => {
  if (!userAgent) {
    return null;
  }
  const lowerUserAgent = userAgent.toLowerCase();
  return (
    AI_CHATBOT_USER_AGENT_PATTERNS.find((pattern) =>
      lowerUserAgent.includes(pattern.toLowerCase())
    ) ?? null
  );
};

// Seules les pages HTML nous intéressent : on écarte l'API, les assets Next,
// les widgets embarqués et les fichiers statiques (chemin avec extension).
export const isTrackablePathname = (pathname: string): boolean => {
  if (typeof pathname !== "string" || !pathname.startsWith("/")) {
    return false;
  }
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/")) {
    return false;
  }
  if (WIDGETS_PATH.test(pathname)) {
    return false;
  }
  const lastSegment = pathname.slice(pathname.lastIndexOf("/") + 1);
  if (lastSegment.includes(".")) {
    return false;
  }
  return true;
};
