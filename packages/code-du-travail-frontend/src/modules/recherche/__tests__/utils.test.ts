import { generateSearchLink } from "../utils";
import { SOURCES } from "@socialgouv/cdtn-utils";

describe("generateSearchLink", () => {
  it("should return the provided URL when source is 'external'", () => {
    const source = "external";
    const slug = "some-slug";
    const url = "https://example.com";

    const result = generateSearchLink(source as any, slug, url);

    expect(result).toBe(url);
  });

  it("should generate a link", () => {
    const source = SOURCES.CDT;
    const slug = "article-l1234-5";

    const result = generateSearchLink(source, slug);

    expect(result).toBe("/code-du-travail/article-l1234-5");
  });

  it("should generate a theme link with parentSlug when provided", () => {
    const source = SOURCES.THEMES;
    const slug = "child-theme";
    const parentSlug = "parent-theme";

    const result = generateSearchLink(source, slug, undefined, parentSlug);

    expect(result).toBe("/themes/parent-theme#child-theme");
  });

  it("should slugify the anchor in theme links for consistency", () => {
    const source = SOURCES.THEMES;
    const slug = "Entretien professionnel (CEP)";
    const parentSlug = "formation";

    const result = generateSearchLink(source, slug, undefined, parentSlug);

    expect(result).toBe("/themes/formation#entretien-professionnel-cep");
  });
});
