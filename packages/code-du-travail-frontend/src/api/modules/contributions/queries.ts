import { SOURCES } from "@socialgouv/cdtn-utils";

export const getAllContributions = () => {
  return {
    _source: ["title", "shortTitle", "slug", "idcc"],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CONTRIBUTIONS } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 3000,
  };
};

export const getAllGenericsContributions = () => {
  return {
    _source: [
      "title",
      "shortTitle",
      "description",
      "url",
      "slug",
      "breadcrumbs",
      "source",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CONTRIBUTIONS } },
          { term: { isPublished: true } },
        ],
        must: {
          bool: {
            should: [
              {
                bool: {
                  filter: [{ term: { idcc: "0000" } }],
                },
              },
            ],
          },
        },
      },
    },
    size: 200,
  };
};

export function getContributionsBySlugs(slugs: string[]) {
  return {
    _source: [
      "title",
      "shortTitle",
      "description",
      "url",
      "slug",
      "breadcrumbs",
      "source",
      "cdtnId",
      "idcc",
      "ccSupported",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CONTRIBUTIONS } },
          { term: { isPublished: true } },
          { terms: { slug: slugs } },
        ],
      },
    },
    size: 100,
  };
}

export function getContributionsByIds(ids: string[]) {
  return {
    _source: [
      "title",
      "shortTitle",
      "description",
      "url",
      "slug",
      "breadcrumbs",
      "source",
      "cdtnId",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CONTRIBUTIONS } },
          { term: { isPublished: true } },
          { terms: { cdtnId: ids } },
        ],
      },
    },
    size: 100,
  };
}
