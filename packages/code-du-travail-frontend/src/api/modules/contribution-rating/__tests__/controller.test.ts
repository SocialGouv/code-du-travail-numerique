import { ContributionRatingController } from "../controller";
import { sendRatingEvent } from "../service";
import { captureException } from "@sentry/nextjs";
import {
  RATING_MATOMO_ACTION,
  RATING_MATOMO_CATEGORY,
} from "../../../../modules/contributions/rating/constants";

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

const makeRequest = (body: unknown, contentLength?: string): Request =>
  ({
    headers: { get: (k: string) => (k === "content-length" ? contentLength ?? null : null) },
    json: async () => {
      if (typeof body === "string") throw new Error("invalid json");
      return body;
    },
  }) as unknown as Request;

const validBody = {
  category: RATING_MATOMO_CATEGORY,
  action: RATING_MATOMO_ACTION,
  name: "Congés payés",
  url: "https://code.travail.gouv.fr/contribution/conges-payes",
  slug: "conges-payes",
  value: 4,
  label: "Plutôt clair",
};

describe("ContributionRatingController.post()", () => {
  beforeEach(() => jest.clearAllMocks());

  it("retourne 204 et relaie l'event pour un body valide", async () => {
    mockSendRatingEvent.mockResolvedValue();
    const res = await new ContributionRatingController(
      makeRequest(validBody)
    ).post();

    expect(res.status).toBe(204);
    expect(mockSendRatingEvent).toHaveBeenCalledWith({
      category: RATING_MATOMO_CATEGORY,
      action: RATING_MATOMO_ACTION,
      name: "Congés payés",
      value: 4,
      url: "https://code.travail.gouv.fr/contribution/conges-payes",
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

  it("rejette (400) un JSON invalide", async () => {
    const res = await new ContributionRatingController(
      makeRequest("not-json")
    ).post();
    expect(res.status).toBe(400);
  });

  it("rejette (413) un payload trop volumineux", async () => {
    const res = await new ContributionRatingController(
      makeRequest(validBody, "999999")
    ).post();
    expect(res.status).toBe(413);
    expect(mockSendRatingEvent).not.toHaveBeenCalled();
  });

  it("retourne 500 et capture l'exception si le service échoue", async () => {
    const error = new Error("Matomo down");
    mockSendRatingEvent.mockRejectedValue(error);

    const res = await new ContributionRatingController(
      makeRequest(validBody)
    ).post();

    expect(res.status).toBe(500);
    expect(captureException).toHaveBeenCalledWith(error);
  });
});
