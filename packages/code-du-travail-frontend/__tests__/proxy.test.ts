/**
 * @jest-environment node
 */
import { proxy } from "../proxy";
import { trackAiChatbotRequest } from "../src/modules/analytics/ai-chatbot-tracking";

jest.mock("../src/modules/analytics/ai-chatbot-tracking", () => ({
  trackAiChatbotRequest: jest.fn(() => true),
}));

// Le proxy ne se sert que de `NextResponse.next()` (et de `new NextResponse`
// pour les preflight CORS) : un objet minimal avec des headers suffit.
jest.mock("next/server", () => {
  class NextResponse {
    status: number;
    headers: Map<string, string>;
    constructor(_body: unknown, init?: { status?: number; headers?: unknown }) {
      this.status = init?.status ?? 200;
      this.headers = new Map();
    }
    static next() {
      return new NextResponse(null);
    }
  }
  return { NextResponse };
});

const mockTrack = trackAiChatbotRequest as jest.MockedFunction<
  typeof trackAiChatbotRequest
>;

const makeRequest = (pathname: string, userAgent = "Mozilla/5.0") =>
  ({
    method: "GET",
    headers: new Headers({ "user-agent": userAgent }),
    nextUrl: { pathname },
  }) as unknown as Parameters<typeof proxy>[0];

const makeEvent = () =>
  ({ waitUntil: jest.fn() }) as unknown as Parameters<typeof proxy>[1];

describe("proxy — télémétrie chatbots IA", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("requête de page : la télémétrie est déclenchée avec la requête et l'event", () => {
    const request = makeRequest(
      "/outils/indemnite-licenciement",
      "Mozilla/5.0 (compatible; ChatGPT-User/1.0)"
    );
    const event = makeEvent();

    const response = proxy(request, event);

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(request, event);
    // Le proxy continue de poser ses headers de sécurité : la télémétrie ne
    // court-circuite rien.
    expect(response.headers.get("Content-Security-Policy")).toBeDefined();
  });

  test("route API : pas de télémétrie", () => {
    proxy(makeRequest("/api/health"), makeEvent());

    expect(mockTrack).not.toHaveBeenCalled();
  });
});
