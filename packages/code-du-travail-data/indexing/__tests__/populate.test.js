import { getDuplicateSlugs, flattenTags, makeSlug } from "../populate";

describe("getDuplicateSlug", () => {
  test("should return an empty array if there is no duplicate slug", () => {
    const documents = [
      [
        { slug: "slug-1", source: "cdt" },
        { slug: "slug-2", source: "cdt" }
      ],
      [
        { slug: "slug-1", source: "contribution" },
        { slug: "slug-2", source: "contribution" }
      ]
    ];
    const duplicateSlugs = getDuplicateSlugs(documents);
    expect(Object.entries(duplicateSlugs).length).toBe(0);
  });

  test("should return an array of duplicated slug", () => {
    const documents = [
      [
        { slug: "slug-1", source: "cdt" },
        { slug: "slug-2", source: "cdt" }
      ],
      [
        { slug: "slug-1", source: "faq" },
        { slug: "slug-1", source: "faq" }
      ],
      [
        { slug: "slug-4", source: "fiche" },
        { slug: "slug-3", source: "fiche" }
      ]
    ];
    const duplicateSlugs = getDuplicateSlugs(documents);
    expect(Object.entries(duplicateSlugs).length).toBe(1);
  });
});

describe("flattenTags", () => {
  test("should return a array of range values", () => {
    const tags = {
      key: "val",
      foo: ["bar", "baz"]
    };
    expect(flattenTags(tags)).toEqual(["key:val", "foo:bar", "foo:baz"]);
  });
});

describe("makeSlug", () => {
  test("should return a slug", () => {
    const title = "my title";
    const tags = {
      key: "val",
      foo: ["bar", "baz"]
    };
    expect(makeSlug(title, flattenTags(tags).join("-"))).toEqual(
      "my-title-sxc4it-rq8-sjg"
    );
  });
});
