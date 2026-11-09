/**
 * @jest-environment node
 */
import robots from "../../../../app/robots";

const mockConfig = { IS_PROD: false, SITE_URL: "https://code.travail.gouv.fr" };

jest.mock("../../../config", () => ({
  get IS_PROD() {
    return mockConfig.IS_PROD;
  },
  get SITE_URL() {
    return mockConfig.SITE_URL;
  },
}));

describe("robots", () => {
  it("interdit tout hors production", () => {
    mockConfig.IS_PROD = false;
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });

  it("autorise l'indexation en production avec le sitemap", () => {
    mockConfig.IS_PROD = true;
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        disallow: ["/assets/", "/images/", "/recherche"],
      },
      sitemap: "https://code.travail.gouv.fr/sitemap.xml",
    });
  });
});

describe("robots avec une URL terminée par un slash", () => {
  it("ne double pas le slash dans le sitemap", () => {
    mockConfig.IS_PROD = true;
    mockConfig.SITE_URL = "https://code.travail.gouv.fr/";
    expect(robots().sitemap).toBe("https://code.travail.gouv.fr/sitemap.xml");
  });
});
