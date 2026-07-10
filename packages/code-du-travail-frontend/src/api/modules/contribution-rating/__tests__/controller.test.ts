import { ContributionRatingController } from "../controller";
import { sendRatingEvent } from "../service";
import { captureException } from "@sentry/nextjs";
import { RatingMatomo } from "../../../../modules/contributions/rating/constants";

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

const mockSendRatingEvent = sendRatingEvent as jest.MockedFunction<
  typeof sendRatingEvent
>;

// Route API classique : le contrôleur lit `request.json()`. On simule aussi le
// cas d'un JSON invalide (json() rejette).
const makeRequest = (body: unknown, invalidJson = false): Request =>
  ({
    json: async () => {
      if (invalidJson) throw new SyntaxError("Unexpected token");
      return body;
    },
  }) as unknown as Request;

// Le client envoie la source du contenu, son slug et la note.
const validBody = { source: "contributions", slug: "conges-payes", value: 4 };

describe("ContributionRatingController.post()", () => {
  beforeEach(() => jest.clearAllMocks());

  it("retourne 204 et relaie l'event (catégorie/action côté serveur) pour un body valide", async () => {
    mockSendRatingEvent.mockResolvedValue();
    const res = await new ContributionRatingController(
      makeRequest(validBody)
    ).post();

    expect(res.status).toBe(204);
    expect(mockSendRatingEvent).toHaveBeenCalledWith({
      category: RatingMatomo.CATEGORY,
      action: RatingMatomo.ACTION,
      source: "contributions",
      value: 4,
      slug: "conges-payes",
    });
  });

  it("rejette (400) une source inconnue (anti-injection d'URL)", async () => {
    const res = await new ContributionRatingController(
      makeRequest({ ...validBody, source: "evil" })
    ).post();

    expect(res.status).toBe(400);
    expect(mockSendRatingEvent).not.toHaveBeenCalled();
  });

  it("rejette (400) une note hors bornes", async () => {
    const res = await new ContributionRatingController(
      makeRequest({ ...validBody, value: 9 })
    ).post();

    expect(res.status).toBe(400);
    expect(mockSendRatingEvent).not.toHaveBeenCalled();
  });

  it("rejette (400) une note non entière", async () => {
    const res = await new ContributionRatingController(
      makeRequest({ ...validBody, value: 3.5 })
    ).post();

    expect(res.status).toBe(400);
    expect(mockSendRatingEvent).not.toHaveBeenCalled();
  });

  it("rejette (400) un slug invalide (anti-injection d'URL)", async () => {
    const res = await new ContributionRatingController(
      makeRequest({ ...validBody, slug: "../../evil" })
    ).post();

    expect(res.status).toBe(400);
    expect(mockSendRatingEvent).not.toHaveBeenCalled();
  });

  it("rejette (400) un champ inattendu (schéma strict : « juste la note »)", async () => {
    const res = await new ContributionRatingController(
      makeRequest({ ...validBody, category: "autre_categorie" })
    ).post();

    expect(res.status).toBe(400);
    expect(mockSendRatingEvent).not.toHaveBeenCalled();
  });

  it("rejette (400) un JSON invalide", async () => {
    const res = await new ContributionRatingController(
      makeRequest(undefined, true)
    ).post();
    expect(res.status).toBe(400);
    expect(mockSendRatingEvent).not.toHaveBeenCalled();
  });

  it("reste en 204 (best-effort) si le relai échoue, sans 500 ni Sentry", async () => {
    const warn = jest
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    mockSendRatingEvent.mockRejectedValue(new Error("Matomo down"));

    const res = await new ContributionRatingController(
      makeRequest(validBody)
    ).post();

    expect(res.status).toBe(204);
    expect(captureException).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
