import { SOURCES } from "cdtn-types";

export const getAllGenericsContributions = (): any => {
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
