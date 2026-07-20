import { NpsController } from "../controller";
import { sendNpsEvent } from "../service";
import { captureException } from "@sentry/nextjs";
import { NpsTrigger } from "../../../../modules/nps/constants";

jest.mock("../service");
jest.mock("@sentry/nextjs", () => ({ captureException: jest.fn() }));
jest.mock("next/server", () => {
  class NextResponse {
    status: number;
    body: unknown;
    headers: Map<string, string>;
    constructor(body: unknown, init?: ResponseInit) {
      this.body = body;
      this.status = init?.status ?? 200;
      this.headers = new Map(Object.entries(init?.headers ?? {}));
    }
    static json(body: unknown, init?: ResponseInit) {
      return {
        status: init?.status ?? 200,
        headers: new Map(Object.entries(init?.headers ?? {})),
        json: async () => body,
      };
    }
  }
  return { NextResponse };
});

const mockSendNpsEvent = sendNpsEvent as jest.MockedFunction<
  typeof sendNpsEvent
>;

const makeRequest = (
  body: unknown,
  invalidJson = false,
  userAgent: string | null = "jest-UA"
): Request =>
  ({
    headers: {
      get: (name: string) =>
        name.toLowerCase() === "user-agent" ? userAgent : null,
    },
    json: async () => {
      if (invalidJson) throw new SyntaxError("Unexpected token");
      return body;
    },
  }) as unknown as Request;

describe("NpsController.post()", () => {
  beforeEach(() => jest.clearAllMocks());

  it("relaie la note en 204 (event nps_submitted posé en dur côté service)", async () => {
    mockSendNpsEvent.mockResolvedValue();
    const res = await new NpsController(
      makeRequest({
        score: 9,
        trigger: NpsTrigger.EXIT_INTENT,
        slug: "contribution/conges-payes",
      })
    ).post();

    expect(res.status).toBe(204);
    expect(mockSendNpsEvent).toHaveBeenCalledWith({
      score: 9,
      trigger: NpsTrigger.EXIT_INTENT,
      slug: "contribution/conges-payes",
      userAgent: "jest-UA",
    });
  });

  it.each([
    ["trigger inconnu", { score: 5, trigger: "hand", slug: "a" }],
    ["score hors bornes", { score: 11, trigger: "copy", slug: "a" }],
    ["score non entier", { score: 4.5, trigger: "copy", slug: "a" }],
    ["score manquant", { trigger: "copy", slug: "a" }],
    ["trigger manquant", { score: 5, slug: "a" }],
    ["slug manquant", { score: 5, trigger: "copy" }],
    ["clé inattendue", { score: 5, trigger: "copy", slug: "a", event: "x" }],
  ])("retourne 400 (%s) sans relayer", async (_label, body) => {
    const res = await new NpsController(makeRequest(body)).post();
    expect(res.status).toBe(400);
    expect(mockSendNpsEvent).not.toHaveBeenCalled();
  });

  it("retourne 400 pour un JSON invalide", async () => {
    const res = await new NpsController(makeRequest(null, true)).post();
    expect(res.status).toBe(400);
  });

  it("reste en 204 même si le relai Matomo échoue (fire-and-forget)", async () => {
    mockSendNpsEvent.mockRejectedValue(new Error("matomo down"));
    const res = await new NpsController(
      makeRequest({
        score: 8,
        trigger: NpsTrigger.MAIN,
        slug: "modeles-de-courriers/lettre-de-demission",
      })
    ).post();
    expect(res.status).toBe(204);
    expect(captureException).not.toHaveBeenCalled();
  });
});
