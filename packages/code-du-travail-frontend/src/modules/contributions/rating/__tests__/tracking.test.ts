import { trackContributionRating, RATING_TRACKING_ENDPOINT } from "../tracking";
import { isMatomoOptedOut } from "../../../utils/consent";

jest.mock("../../../utils/consent", () => ({
  isMatomoOptedOut: jest.fn(),
}));

const mockIsMatomoOptedOut = isMatomoOptedOut as jest.MockedFunction<
  typeof isMatomoOptedOut
>;

const optedOut = (value: boolean) =>
  mockIsMatomoOptedOut.mockReturnValue(value);

describe("rating/tracking", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 204 });
  });

  it("POST « juste la note » sur la route API first-party", async () => {
    optedOut(false);

    await trackContributionRating({
      contributionSlug: "conges-payes-1234",
      value: 4,
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(RATING_TRACKING_ENDPOINT);
    expect(init.method).toBe("POST");
    expect(init.keepalive).toBe(true);
    expect(init.headers["Content-Type"]).toBe("application/json");

    const body = JSON.parse(init.body);
    // Payload minimal : la source du contenu, son slug + la note. La
    // catégorie/action Matomo et l'URL canonique sont ajoutées côté serveur.
    expect(body).toEqual({
      source: "contributions",
      slug: "conges-payes-1234",
      value: 4,
    });
  });

  it("n'émet rien en cas d'opt-out Matomo explicite", async () => {
    optedOut(true);

    await trackContributionRating({
      contributionSlug: "conges-payes-1234",
      value: 4,
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("avale les erreurs réseau sans lever", async () => {
    optedOut(false);
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network"));

    await expect(
      trackContributionRating({
        contributionSlug: "conges-payes-1234",
        value: 3,
      })
    ).resolves.toBeUndefined();
  });
});
