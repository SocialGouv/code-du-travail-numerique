import { COOKIE_CONFIG, shouldShowCookieBanner } from "../config";

describe("analytics cookie config", () => {
  const originalPaths = COOKIE_CONFIG.paths
    ? [...COOKIE_CONFIG.paths]
    : undefined;
  const originalHeatmap = COOKIE_CONFIG.heatmap;
  const originalAds = COOKIE_CONFIG.ads;

  beforeEach(() => {
    // Ensure banner is eligible to be shown
    COOKIE_CONFIG.heatmap = true;
    COOKIE_CONFIG.ads = false;
    COOKIE_CONFIG.paths = ["/", "/infographie"];
  });

  afterEach(() => {
    COOKIE_CONFIG.paths = originalPaths;
    COOKIE_CONFIG.heatmap = originalHeatmap;
    COOKIE_CONFIG.ads = originalAds;
  });

  it("shows the banner for exact matching path", () => {
    expect(shouldShowCookieBanner("/infographie")).toBe(true);
  });

  it("shows the banner when pathname has a trailing slash", () => {
    expect(shouldShowCookieBanner("/infographie/")).toBe(true);
  });

  it("shows the banner when pathname contains query/hash (defensive)", () => {
    expect(shouldShowCookieBanner("/infographie?x=1")).toBe(true);
    expect(shouldShowCookieBanner("/infographie#section")).toBe(true);
  });

  it("does not show the banner on widgets paths", () => {
    COOKIE_CONFIG.paths = ["/widgets/foo", "/"];
    expect(shouldShowCookieBanner("/widgets/foo")).toBe(false);
    expect(shouldShowCookieBanner("/widgets/foo/")).toBe(false);
  });

  it("does not show the banner when no tracking feature is enabled", () => {
    COOKIE_CONFIG.heatmap = false;
    COOKIE_CONFIG.ads = false;
    expect(shouldShowCookieBanner("/")).toBe(false);
  });
});
