import {
  buildAiChatbotTelemetryUrl,
  sendAiChatbotTelemetry,
} from "../telemetry";

jest.mock("../../../../config", () => ({
  PIWIK_SITE_ID: "4",
  PIWIK_URL: "https://matomo.example.test",
  SITE_URL: "https://code.travail.gouv.fr",
  WIDGETS_PATH: /\/widgets\/.*/,
}));

const UA =
  "Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)";

describe("buildAiChatbotTelemetryUrl", () => {
  test("construit un hit BotTracking : recMode=1, url canonique, ua, source", () => {
    const url = buildAiChatbotTelemetryUrl({
      pathname: "/outils/indemnite-licenciement",
      userAgent: UA,
    });

    expect(url.startsWith("https://matomo.example.test/matomo.php?")).toBe(
      true
    );
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("idsite")).toBe("4");
    expect(params.get("rec")).toBe("1");
    expect(params.get("recMode")).toBe("1");
    expect(params.get("url")).toBe(
      "https://code.travail.gouv.fr/outils/indemnite-licenciement"
    );
    expect(params.get("ua")).toBe(UA);
    expect(params.get("source")).toBe("cdtn-nextjs-proxy");
    // Pas de statut si inconnu : Matomo stocke « inconnu » plutôt qu'un 200
    // mensonger.
    expect(params.has("http_status")).toBe(false);
  });

  test("n'envoie aucune donnée personnelle (ni IP, ni visiteur, ni cookie)", () => {
    const params = new URLSearchParams(
      buildAiChatbotTelemetryUrl({ pathname: "/", userAgent: UA }).split("?")[1]
    );
    expect(params.has("cip")).toBe(false);
    expect(params.has("_id")).toBe(false);
    expect(params.has("uid")).toBe(false);
    expect(params.has("token_auth")).toBe(false);
  });

  test("transmet http_status quand il est connu", () => {
    const params = new URLSearchParams(
      buildAiChatbotTelemetryUrl({
        pathname: "/page-inconnue",
        userAgent: UA,
        httpStatus: 404,
      }).split("?")[1]
    );
    expect(params.get("http_status")).toBe("404");
  });
});

describe("sendAiChatbotTelemetry", () => {
  const mockFetch = jest.fn(() => Promise.resolve({ ok: true, status: 204 }));

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  test("appelle matomo.php avec le User-Agent du chatbot et un timeout", async () => {
    await sendAiChatbotTelemetry({ pathname: "/", userAgent: UA });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, init] = mockFetch.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toContain("/matomo.php?");
    expect((init.headers as Record<string, string>)["User-Agent"]).toBe(UA);
    expect(init.signal).toBeDefined();
  });

  test("throw si Matomo répond non-ok", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(
      sendAiChatbotTelemetry({ pathname: "/", userAgent: UA })
    ).rejects.toThrow("500");
  });
});
