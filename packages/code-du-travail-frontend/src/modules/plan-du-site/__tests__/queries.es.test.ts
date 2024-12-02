/** @jest-environment node */

import { fetchSitemapData } from "../queries";

jest.mock("../../contributions/queries", () => ({
  fetchContributions: async () => {
    return Promise.resolve([
      {
        idcc: "0044",
        title: "title1",
        slug: "44-slug-content1",
      },
      {
        idcc: "0000",
        title: "title1",
        slug: "slug-content1",
      },
      {
        idcc: "0016",
        title: "title1",
        slug: "16-slug-content1",
      },
      {
        idcc: "0000",
        title: "title2",
        slug: "slug-content2",
      },
      {
        idcc: "0016",
        title: "title2",
        slug: "16-slug-content2",
      },

      {
        idcc: "0000",
        title: "title3",
        slug: "slug-content3",
      },
    ]);
  },
}));

describe("Sitemap", () => {
  it("getSitemapData returns empty array if contrib does not exists", async () => {
    const result = await fetchSitemapData();
    expect(Object.keys(result)).toEqual([
      "themes",
      "tools",
      "modeles",
      "contributions",
      "agreements",
      "informations",
    ]);
    expect(result.tools[0]).toEqual({
      root: {
        slug: "indemnite-licenciement",
        title: "Indemnité de licenciement",
      },
    });
    expect(result.contributions).toEqual([
      {
        children: [
          {
            slug: "44-slug-content1",
            title: "title1",
          },
          {
            slug: "16-slug-content1",
            title: "title1",
          },
        ],
        root: {
          slug: "slug-content1",
          title: "title1",
        },
      },
      {
        children: [
          {
            slug: "16-slug-content2",
            title: "title2",
          },
        ],
        root: {
          slug: "slug-content2",
          title: "title2",
        },
      },
      {
        children: [],
        root: {
          slug: "slug-content3",
          title: "title3",
        },
      },
    ]);
  });
});
