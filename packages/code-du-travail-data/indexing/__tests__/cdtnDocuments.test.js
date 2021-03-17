import { getDuplicateSlugs } from "../cdtnDocuments";

jest.mock("@socialgouv/cdtn-logger");

describe("getDuplicateSlug", () => {
  test("should return an empty array if there is no duplicate slug", async () => {
    const documents = [
      [
        { slug: "slug-1", source: "cdt" },
        { slug: "slug-2", source: "cdt" },
      ],
      [
        { slug: "slug-1", source: "contribution" },
        { slug: "slug-2", source: "contribution" },
      ],
    ];
    const duplicateSlugs = await getDuplicateSlugs(documents);
    expect(Object.entries(duplicateSlugs).length).toBe(0);
  });

  test("should return an array of duplicated slug", async () => {
    const documents = [
      [
        { slug: "slug-1", source: "cdt" },
        { slug: "slug-2", source: "cdt" },
      ],
      [
        { slug: "slug-1", source: "faq" },
        { slug: "slug-1", source: "faq" },
      ],
      [
        { slug: "slug-4", source: "fiche" },
        { slug: "slug-3", source: "fiche" },
      ],
    ];
    const duplicateSlugs = await getDuplicateSlugs(documents);
    expect(Object.entries(duplicateSlugs).length).toBe(1);
  });
});
