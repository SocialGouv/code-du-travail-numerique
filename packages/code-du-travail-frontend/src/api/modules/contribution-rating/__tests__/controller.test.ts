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

// Le contrôleur lit `request.text()` (mesure de taille réelle) puis JSON.parse.
const makeRequest = (body: unknown, rawOverride?: string): Request =>
  ({
    text: async () =>
      rawOverride ?? (typeof body === "string" ? body : JSON.stringify(body)),
  }) as unknown as Request;

const validBody = {
  category: RatingMatomo.CATEGORY,
  action: RatingMatomo.ACTION,
  name: "Congés payés",
  slug: "conges-payes",
  value: 4,
};

describe("ContributionRatingController.post()", () => {
  beforeEach(() => jest.clearAllMocks());

  it("retourne 204 et relaie l'event (avec le slug) pour un body valide", async () => {
    mockSendRatingEvent.mockResolvedValue();
    const res = await new ContributionRatingController(
      makeRequest(validBody)
    ).post();

    expect(res.status).toBe(204);
    expect(mockSendRatingEvent).toHaveBeenCalledWith({
      category: RatingMatomo.CATEGORY,
      action: RatingMatomo.ACTION,
      name: "Congés payés",
      value: 4,
      slug: "conges-payes",
    });
  });

  it("rejette (400) une catégorie/action hors liste blanche, sans appeler le service", async () => {
    const res = await new ContributionRatingController(
      makeRequest({ ...validBody, category: "autre_categorie" })
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

  it("rejette (400) un slug invalide (anti-injection d'URL)", async () => {
    const res = await new ContributionRatingController(
      makeRequest({ ...validBody, slug: "../../evil" })
    ).post();

    expect(res.status).toBe(400);
    expect(mockSendRatingEvent).not.toHaveBeenCalled();
  });

  it("rejette (400) un JSON invalide", async () => {
    const res = await new ContributionRatingController(
      makeRequest("not-json")
    ).post();
    expect(res.status).toBe(400);
  });

  it("rejette (413) un corps trop volumineux (taille réelle, pas l'en-tête)", async () => {
    const res = await new ContributionRatingController(
      makeRequest(undefined, "x".repeat(5000))
    ).post();
    expect(res.status).toBe(413);
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
