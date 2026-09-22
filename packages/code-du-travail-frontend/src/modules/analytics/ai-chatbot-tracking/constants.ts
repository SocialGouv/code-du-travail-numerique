// Signatures (sous-chaînes de User-Agent) des chatbots IA reconnues par le
// plugin Matomo « BotTracking » (Matomo ≥ 5.8). Liste alignée sur
// plugins/BotTracking/BotDetector.php côté Matomo : en `recMode=1`, Matomo
// jette tout UA hors de cette liste, inutile donc d'envoyer plus large.
//
// Ce sont les robots qui vont chercher une page pour répondre à un humain
// (ChatGPT-User, Claude-User…). Les crawlers d'entraînement (GPTBot, ClaudeBot,
// PerplexityBot…) ne sont PAS reconnus par ce plugin : hors périmètre ici.
export const AI_CHATBOT_USER_AGENT_PATTERNS = [
  "ChatGPT-User",
  "MistralAI-User",
  "Gemini-Deep-Research",
  "Claude-User",
  "Perplexity-User",
  "Google-NotebookLM",
  "Google-GeminiNotebook",
] as const;

// Libellé « source » affiché dans Matomo (à côté de Cloudflare, CloudFront,
// WordPress pour les intégrations officielles).
export const AI_CHATBOT_TELEMETRY_SOURCE = "cdtn-nextjs-proxy";

// L'envoi est hors du chemin critique (waitUntil), mais on borne quand même :
// un Matomo lent ne doit pas retenir des promesses côté serveur.
export const AI_CHATBOT_TELEMETRY_TIMEOUT_MS = 1000;
