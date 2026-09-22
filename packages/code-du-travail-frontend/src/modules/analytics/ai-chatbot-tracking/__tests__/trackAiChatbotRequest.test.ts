import { trackAiChatbotRequest } from "../trackAiChatbotRequest";
import { sendAiChatbotTelemetry } from "../telemetry";

jest.mock("../telemetry", () => ({
  sendAiChatbotTelemetry: jest.fn(() => Promise.resolve()),
}));

const mockSend = sendAiChatbotTelemetry as jest.MockedFunction<
  typeof sendAiChatbotTelemetry
>;

const CHATGPT_UA =
  "Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)";
const BROWSER_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0";

const makeRequest = ({
  method = "GET",
  userAgent = CHATGPT_UA,
  pathname = "/outils/indemnite-licenciement",
}: {
  method?: string;
  userAgent?: string | null;
  pathname?: string;
} = {}) => ({
  method,
  headers: {
    get: (name: string) => (name === "user-agent" ? userAgent : null),
  },
  nextUrl: { pathname },
});

describe("trackAiChatbotRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("chatbot IA sur une page : télémétrie déclenchée, sans bloquer (waitUntil)", () => {
    const waitUntil = jest.fn();

    const tracked = trackAiChatbotRequest(makeRequest(), { waitUntil });

    expect(tracked).toBe(true);
    expect(mockSend).toHaveBeenCalledWith({
      pathname: "/outils/indemnite-licenciement",
      userAgent: CHATGPT_UA,
    });
    expect(waitUntil).toHaveBeenCalledTimes(1);
    expect(waitUntil.mock.calls[0][0]).toBeInstanceOf(Promise);
  });

  test("fonctionne sans event.waitUntil (promesse laissée filer)", () => {
    expect(trackAiChatbotRequest(makeRequest())).toBe(true);
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  test("une erreur Matomo est avalée : la promesse passée à waitUntil ne rejette pas", async () => {
    mockSend.mockRejectedValueOnce(new Error("Matomo down"));
    const waitUntil = jest.fn();

    trackAiChatbotRequest(makeRequest(), { waitUntil });

    await expect(waitUntil.mock.calls[0][0]).resolves.toBeUndefined();
  });

  test("navigateur classique : rien n'est envoyé", () => {
    expect(trackAiChatbotRequest(makeRequest({ userAgent: BROWSER_UA }))).toBe(
      false
    );
    expect(mockSend).not.toHaveBeenCalled();
  });

  test("sans User-Agent : rien n'est envoyé", () => {
    expect(trackAiChatbotRequest(makeRequest({ userAgent: null }))).toBe(false);
    expect(mockSend).not.toHaveBeenCalled();
  });

  test.each(["/api/nps", "/widgets/preavis-demission", "/robots.txt"])(
    "chatbot IA sur %s : rien n'est envoyé",
    (pathname) => {
      expect(trackAiChatbotRequest(makeRequest({ pathname }))).toBe(false);
      expect(mockSend).not.toHaveBeenCalled();
    }
  );

  test.each(["POST", "HEAD", "OPTIONS"])(
    "méthode %s : rien n'est envoyé",
    (method) => {
      expect(trackAiChatbotRequest(makeRequest({ method }))).toBe(false);
      expect(mockSend).not.toHaveBeenCalled();
    }
  );
});
