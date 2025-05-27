import { generateSearchLink } from "../utils";
import { SOURCES } from "@socialgouv/cdtn-utils";

describe("generateSearchLink", () => {
  it("should return the provided URL when source is 'external'", () => {
    const source = "external";
    const slug = "some-slug";
    const url = "https://example.com";

    const result = generateSearchLink(source as any, slug, undefined, url);

    expect(result).toBe(url);
  });

  it("should generate a link without query parameter", () => {
    const source = SOURCES.CDT;
    const slug = "article-l1234-5";

    const result = generateSearchLink(source, slug);

    expect(result).toBe("/code-du-travail/article-l1234-5");
  });

  it("should generate a link with query parameter", () => {
    const source = SOURCES.SHEET_MT;
    const slug = "conges-payes";
    const query = "durée congés";

    const result = generateSearchLink(source, slug, query);

    expect(result).toBe(
      "/fiche-ministere-travail/conges-payes?q=dur%C3%A9e%20cong%C3%A9s"
    );
  });

  it("should handle empty query parameter", () => {
    const source = SOURCES.LETTERS;
    const slug = "demande-conges-payes";
    const query = "";

    const result = generateSearchLink(source, slug, query);

    expect(result).toBe("/modeles-de-courriers/demande-conges-payes");
  });

  it("should handle special characters in query parameter", () => {
    const source = SOURCES.THEMES;
    const slug = "conges-et-absences";
    const query = "congés & RTT";

    const result = generateSearchLink(source, slug, query);

    expect(result).toBe("/themes/conges-et-absences?q=cong%C3%A9s%20%26%20RTT");
  });
});
