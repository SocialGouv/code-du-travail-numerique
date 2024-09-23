/** @jest-environment node */

import { getSitemapData } from "../service";

jest.mock("../../contributions/fetch", () => ({
  fetchAllContributions: async () => {
    return Promise.resolve({
      hits: {
        total: 6,
        hits: [
          {
            _source: {
              idcc: "0044",
              type: "content",
              content: "content1",
              title: "title1",
              source: "contribution",
              slug: "44-slug-content1",
            },
          },
          {
            _source: {
              idcc: "0000",
              type: "content",
              content: "content1",
              title: "title1",
              source: "contribution",
              slug: "slug-content1",
            },
          },
          {
            _source: {
              idcc: "0016",
              type: "content",
              content: "content1",
              title: "title1",
              source: "contribution",
              slug: "16-slug-content1",
            },
          },
          {
            _source: {
              idcc: "0000",
              type: "content",
              content: "content2",
              title: "title2",
              source: "contribution",
              slug: "slug-content2",
            },
          },
          {
            _source: {
              idcc: "0016",
              type: "content",
              content: "content2",
              title: "title2",
              source: "contribution",
              slug: "16-slug-content2",
            },
          },
          {
            _source: {
              idcc: "0000",
              type: "content",
              content: "content3",
              title: "title3",
              source: "contribution",
              slug: "slug-content3",
            },
          },
        ],
      },
    });
  },
}));

describe("Sitemap", () => {
  it("getSitemapData returns empty array if contrib does not exists", async () => {
    const result = await getSitemapData();
    expect(Object.keys(result)).toEqual([
      "themes",
      "tools",
      "modeles",
      "contributions",
      "agreements",
      "informations",
    ]);
    expect(result.tools[0]).toEqual({
      _id: "14",
      displayTool: true,
      slug: "indemnite-licenciement",
      title: "Indemnité de licenciement",
    });
    expect(result.contributions).toEqual([
      {
        agreements: [
          {
            content: "content1",
            idcc: "0044",
            slug: "44-slug-content1",
            source: "contribution",
            title: "title1",
            type: "content",
          },
          {
            content: "content1",
            idcc: "0016",
            slug: "16-slug-content1",
            source: "contribution",
            title: "title1",
            type: "content",
          },
        ],
        generic: {
          content: "content1",
          idcc: "0000",
          slug: "slug-content1",
          source: "contribution",
          title: "title1",
          type: "content",
        },
      },
      {
        agreements: [
          {
            content: "content2",
            idcc: "0016",
            slug: "16-slug-content2",
            source: "contribution",
            title: "title2",
            type: "content",
          },
        ],
        generic: {
          content: "content2",
          idcc: "0000",
          slug: "slug-content2",
          source: "contribution",
          title: "title2",
          type: "content",
        },
      },
      {
        agreements: [],
        generic: {
          content: "content3",
          idcc: "0000",
          slug: "slug-content3",
          source: "contribution",
          title: "title3",
          type: "content",
        },
      },
    ]);
  });
});
