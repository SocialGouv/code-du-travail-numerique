import {
  trackContributionRating,
  RATING_TRACKING_ENDPOINT,
} from "../tracking";
import { getStoredConsent } from "../../../utils/consent";
import {
  RATING_MATOMO_CATEGORY,
  RATING_MATOMO_ACTION,
} from "../constants";

jest.mock("../../../utils/consent", () => ({
  getStoredConsent: jest.fn(),
}));

const mockGetStoredConsent = getStoredConsent as jest.MockedFunction<
  typeof getStoredConsent
>;

const consent = (matomo: boolean) =>
  mockGetStoredConsent.mockReturnValue({
    matomo,
    sea: false,
    matomoHeatmap: false,
  });

describe("rating/tracking", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 204 });
  });

  it("POST l'event sur l'endpoint first-party avec le bon payload", async () => {
    consent(true);

    await trackContributionRating({
      contributionTitle: "Congés payés",
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
    expect(body).toMatchObject({
      category: RATING_MATOMO_CATEGORY,
      action: RATING_MATOMO_ACTION,
      name: "Congés payés",
      slug: "conges-payes-1234",
      value: 4,
      label: "Clair",
    });
  });

  it("n'émet rien si le consentement Matomo est refusé", async () => {
    consent(false);

    await trackContributionRating({
      contributionTitle: "Congés payés",
      contributionSlug: "conges-payes-1234",
      value: 4,
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("avale les erreurs réseau sans lever", async () => {
    consent(true);
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network"));

    await expect(
      trackContributionRating({
        contributionTitle: "Congés payés",
        contributionSlug: "conges-payes-1234",
        value: 3,
      })
    ).resolves.toBeUndefined();
  });
});
