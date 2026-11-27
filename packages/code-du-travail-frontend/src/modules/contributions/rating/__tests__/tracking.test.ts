import {
  RATING_TRACKING_ENDPOINT,
  trackRatingReasons,
  trackRatingRemark,
  trackRatingScore,
  trackRatingSuggestion,
} from "../tracking";
import { RatingReason } from "../constants";
import { isMatomoOptedOut } from "../../../utils/consent";

jest.mock("../../../utils/consent", () => ({
  isMatomoOptedOut: jest.fn(),
}));

const mockIsMatomoOptedOut = isMatomoOptedOut as jest.MockedFunction<
  typeof isMatomoOptedOut
>;

const optedOut = (value: boolean) =>
  mockIsMatomoOptedOut.mockReturnValue(value);

const contributionSlug = "conges-payes-1234";

const lastBody = () => {
  const [, init] = (global.fetch as jest.Mock).mock.calls[0];
  return JSON.parse(init.body);
};

describe("rating/tracking", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 204 });
  });

  it("POSTs only the score to the first-party API route", async () => {
    optedOut(false);

    await trackRatingScore({ contributionSlug, value: 2 });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(RATING_TRACKING_ENDPOINT);
    expect(init.method).toBe("POST");
    expect(init.keepalive).toBe(true);
    expect(init.headers["Content-Type"]).toBe("application/json");
    // Minimal payload: content source, slug and the user action. The Matomo
    // category/action and the canonical URL are added server side.
    expect(lastBody()).toEqual({
      source: "contributions",
      slug: contributionSlug,
      type: "note",
      value: 2,
    });
  });

  it("sends every checked reason in a single request", async () => {
    optedOut(false);

    await trackRatingReasons({
      contributionSlug,
      reasons: [RatingReason.DIFFICULT_TEXT, RatingReason.HOW_TO_APPLY],
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(lastBody()).toEqual({
      source: "contributions",
      slug: contributionSlug,
      type: "raison",
      reasons: ["texte_difficile", "comment_appliquer"],
    });
  });

  it("sends the remark click", async () => {
    optedOut(false);

    await trackRatingRemark({ contributionSlug });

    expect(lastBody()).toEqual({
      source: "contributions",
      slug: contributionSlug,
      type: "remarque",
    });
  });

  it("sends the suggestion text", async () => {
    optedOut(false);

    await trackRatingSuggestion({ contributionSlug, text: "Plus d'exemples" });

    expect(lastBody()).toEqual({
      source: "contributions",
      slug: contributionSlug,
      type: "suggestion",
      text: "Plus d'exemples",
    });
  });

  it("sends nothing on explicit Matomo opt-out", async () => {
    optedOut(true);

    await trackRatingScore({ contributionSlug, value: 3 });
    await trackRatingReasons({
      contributionSlug,
      reasons: [RatingReason.WRONG_INFORMATION],
    });
    await trackRatingRemark({ contributionSlug });
    await trackRatingSuggestion({ contributionSlug, text: "Texte" });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("swallows network errors without throwing", async () => {
    optedOut(false);
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network"));

    await expect(
      trackRatingScore({ contributionSlug, value: 1 })
    ).resolves.toBeUndefined();
    await expect(
      trackRatingSuggestion({ contributionSlug, text: "Texte" })
    ).resolves.toBeUndefined();
  });
});
