import { SOURCES } from "@socialgouv/cdtn-utils";

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
        must_not: {
          exists: {
            field: "split",
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

export const getAllContributionBySlug = (slug: string) => {
  return {
    query: {
      bool: {
        filter: [
          { term: { slug } },
          { term: { source: SOURCES.CONTRIBUTIONS } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 1,
  };
};
