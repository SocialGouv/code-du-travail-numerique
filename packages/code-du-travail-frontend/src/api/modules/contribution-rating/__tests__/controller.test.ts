import { ContributionRatingController } from "../controller";
import { sendRatingEvent } from "../service";
import { captureException } from "@sentry/nextjs";
import { RatingMatomoCategory } from "../../../../modules/contributions/rating/constants";

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

// Plain API route: the controller reads `request.json()`. We also simulate an
// invalid JSON body (json() rejects).
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

// Every request carries the content source and its slug, plus one user action.
const content = { source: "contributions", slug: "conges-payes" };
const noteBody = { ...content, type: "note", value: 2 };

const post = (body: unknown, invalidJson = false) =>
  new ContributionRatingController(makeRequest(body, invalidJson)).post();

const expectRejected = async (body: unknown) => {
  const res = await post(body);
  expect(res.status).toBe(400);
  expect(mockSendRatingEvent).not.toHaveBeenCalled();
};

const relayed = (category: string, action: string) => ({
  category,
  action,
  source: "contributions",
  slug: "conges-payes",
  userAgent: "jest-UA",
});

describe("ContributionRatingController.post()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSendRatingEvent.mockResolvedValue();
  });

  describe("note", () => {
    it.each([1, 2, 3])(
      "returns 204 and relays note_%i (server-owned category/action)",
      async (value) => {
        const res = await post({ ...noteBody, value });

        expect(res.status).toBe(204);
        // The score travels as a string in the action, not as `e_v`: Matomo
        // counts the occurrences per score instead of summing values.
        expect(mockSendRatingEvent).toHaveBeenCalledTimes(1);
        expect(mockSendRatingEvent).toHaveBeenCalledWith(
          relayed(RatingMatomoCategory.CLARITY, `note_${value}`)
        );
      }
    );

    it("uses the new clarte_contribution category (never the 5-point one)", async () => {
      await post(noteBody);
      expect(mockSendRatingEvent.mock.calls[0][0].category).toBe(
        "clarte_contribution"
      );
    });

    it.each([0, 4, 5, 2.5, "2"])("rejects (400) the score %p", (value) =>
      expectRejected({ ...noteBody, value })
    );

    it("rejects (400) a note without value", () =>
      expectRejected({ ...content, type: "note" }));
  });

  describe("raison", () => {
    it("emits one Matomo event per reason from a single request", async () => {
      const res = await post({
        ...content,
        type: "raison",
        reasons: ["texte_difficile", "informations_fausses"],
      });

      expect(res.status).toBe(204);
      expect(mockSendRatingEvent).toHaveBeenCalledTimes(2);
      expect(mockSendRatingEvent).toHaveBeenNthCalledWith(
        1,
        relayed(RatingMatomoCategory.CLARITY, "raison_texte_difficile")
      );
      expect(mockSendRatingEvent).toHaveBeenNthCalledWith(
        2,
        relayed(RatingMatomoCategory.CLARITY, "raison_informations_fausses")
      );
    });

    it("accepts all four known reasons", async () => {
      const res = await post({
        ...content,
        type: "raison",
        reasons: [
          "texte_difficile",
          "applicable_situation",
          "comment_appliquer",
          "informations_fausses",
        ],
      });
      expect(res.status).toBe(204);
      expect(mockSendRatingEvent).toHaveBeenCalledTimes(4);
    });

    it.each([
      ["an empty list", []],
      ["an unknown reason", ["autre"]],
      ["a duplicated reason", ["texte_difficile", "texte_difficile"]],
      ["a non-array", "texte_difficile"],
    ])("rejects (400) %s", (_label, reasons) =>
      expectRejected({ ...content, type: "raison", reasons })
    );
  });

  describe("remarque", () => {
    it("relays the remark click", async () => {
      const res = await post({ ...content, type: "remarque" });

      expect(res.status).toBe(204);
      expect(mockSendRatingEvent).toHaveBeenCalledWith(
        relayed(RatingMatomoCategory.CLARITY, "remarque")
      );
    });

    it("rejects (400) extra fields", () =>
      expectRejected({ ...content, type: "remarque", value: 1 }));
  });

  describe("suggestion", () => {
    it("relays the trimmed text in its own category", async () => {
      const res = await post({
        ...content,
        type: "suggestion",
        text: "  Ajoutez un exemple  ",
      });

      expect(res.status).toBe(204);
      expect(mockSendRatingEvent).toHaveBeenCalledWith(
        relayed(RatingMatomoCategory.SUGGESTION, "Ajoutez un exemple")
      );
      expect(mockSendRatingEvent.mock.calls[0][0].category).toBe(
        "clarte_contribution_suggestion"
      );
    });

    it("accepts 500 characters", async () => {
      const res = await post({
        ...content,
        type: "suggestion",
        text: "a".repeat(500),
      });
      expect(res.status).toBe(204);
    });

    it.each([
      ["an empty text", ""],
      ["a blank text", "   "],
      ["a text over 500 characters", "a".repeat(501)],
      ["a non-string text", 42],
    ])("rejects (400) %s", (_label, text) =>
      expectRejected({ ...content, type: "suggestion", text })
    );
  });

  it("rejects (400) an unknown type", () =>
    expectRejected({ ...content, type: "autre" }));

  it("rejects (400) a body without type (legacy 5-point payload)", () =>
    expectRejected({ ...content, value: 4 }));

  it("rejects (400) an unknown source (URL anti-injection)", () =>
    expectRejected({ ...noteBody, source: "evil" }));

  it("rejects (400) an invalid slug (URL anti-injection)", () =>
    expectRejected({ ...noteBody, slug: "../../evil" }));

  it("rejects (400) an unexpected field (strict schema)", () =>
    expectRejected({ ...noteBody, category: "autre_categorie" }));

  it("rejects (400) an invalid JSON body", async () => {
    const res = await post(undefined, true);
    expect(res.status).toBe(400);
    expect(mockSendRatingEvent).not.toHaveBeenCalled();
  });

  it("stays 204 (best-effort) when the relay fails, without 500 nor Sentry", async () => {
    const warn = jest
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    mockSendRatingEvent.mockRejectedValue(new Error("Matomo down"));

    const res = await post({
      ...content,
      type: "raison",
      reasons: ["texte_difficile", "comment_appliquer"],
    });

    expect(res.status).toBe(204);
    // Every reason is still attempted.
    expect(mockSendRatingEvent).toHaveBeenCalledTimes(2);
    expect(captureException).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
