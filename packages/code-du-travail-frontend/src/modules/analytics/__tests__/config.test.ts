import { COOKIE_CONFIG, shouldShowCookieBanner } from "../config";

type CookieConfigSnapshot = {
  heatmap: boolean;
  ads: boolean;
  paths?: string[];
};

const snapshotCookieConfig = (): CookieConfigSnapshot => ({
  heatmap: COOKIE_CONFIG.heatmap,
  ads: COOKIE_CONFIG.ads,
  paths: COOKIE_CONFIG.paths ? [...COOKIE_CONFIG.paths] : undefined,
});

const restoreCookieConfig = (snapshot: CookieConfigSnapshot) => {
  COOKIE_CONFIG.heatmap = snapshot.heatmap;
  COOKIE_CONFIG.ads = snapshot.ads;

  if (snapshot.paths === undefined) {
    delete (COOKIE_CONFIG as any).paths;
  } else {
    COOKIE_CONFIG.paths = [...snapshot.paths];
  }
};

describe("analytics cookie config", () => {
  let originalConfig: CookieConfigSnapshot;

  beforeEach(() => {
    originalConfig = snapshotCookieConfig();

    COOKIE_CONFIG.heatmap = true;
    COOKIE_CONFIG.ads = false;
    COOKIE_CONFIG.paths = ["/", "/infographie"];
  });

  afterEach(() => {
    restoreCookieConfig(originalConfig);
  });

  it("shows the banner for exact matching path", () => {
    expect(shouldShowCookieBanner("/infographie")).toBe(true);
  });

  it("does not show the banner when pathname has a trailing slash", () => {
    expect(shouldShowCookieBanner("/infographie/")).toBe(false);
  });

  it("does not show the banner when pathname contains query/hash", () => {
    expect(shouldShowCookieBanner("/infographie?x=1")).toBe(false);
    expect(shouldShowCookieBanner("/infographie#section")).toBe(false);
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
