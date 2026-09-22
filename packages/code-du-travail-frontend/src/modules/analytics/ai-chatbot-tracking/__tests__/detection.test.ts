import { detectAiChatbot, isTrackablePathname } from "../detection";

describe("detectAiChatbot", () => {
  test.each([
    ["ChatGPT-User/1.0; +https://openai.com/bot", "ChatGPT-User"],
    [
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0; +https://openai.com/bot)",
      "ChatGPT-User",
    ],
    ["Mozilla/5.0 (compatible; Claude-User/1.0; +claude.ai)", "Claude-User"],
    ["Mozilla/5.0 (compatible; Perplexity-User/1.0)", "Perplexity-User"],
    ["Mozilla/5.0 (compatible; MistralAI-User/1.0)", "MistralAI-User"],
    ["Gemini-Deep-Research", "Gemini-Deep-Research"],
    ["Google-NotebookLM", "Google-NotebookLM"],
    ["google-geminiNOTEBOOK/1.0", "Google-GeminiNotebook"],
  ])(
    "reconnaît %s → %s (sous-chaîne, insensible à la casse)",
    (ua, expected) => {
      expect(detectAiChatbot(ua)).toBe(expected);
    }
  );

  test.each([
    // Navigateurs classiques
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0",
    // Crawlers d'entraînement : hors périmètre du plugin BotTracking
    "Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)",
    "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
    "Mozilla/5.0 (compatible; PerplexityBot/1.0)",
    "Mozilla/5.0 (compatible; Googlebot/2.1)",
    "",
  ])("ignore %s", (ua) => {
    expect(detectAiChatbot(ua)).toBeNull();
  });

  test("null / undefined → null", () => {
    expect(detectAiChatbot(null)).toBeNull();
    expect(detectAiChatbot(undefined)).toBeNull();
  });
});

describe("isTrackablePathname", () => {
  test.each([
    "/",
    "/outils/indemnite-licenciement",
    "/convention-collective/1090-services-de-lautomobile",
    "/fiche-service-public/etudiant-etranger",
  ])("page HTML %s → trackée", (pathname) => {
    expect(isTrackablePathname(pathname)).toBe(true);
  });

  test.each([
    "/api/nps",
    "/api/health/",
    "/_next/static/chunks/main.js",
    "/_next/image?url=x",
    "/widgets/preavis-demission",
    "/robots.txt",
    "/sitemap.xml",
    "/favicon.ico",
    "/static/assets/img/logo.png",
    "relative/path",
    "",
  ])("%s → ignoré", (pathname) => {
    expect(isTrackablePathname(pathname)).toBe(false);
  });
});
