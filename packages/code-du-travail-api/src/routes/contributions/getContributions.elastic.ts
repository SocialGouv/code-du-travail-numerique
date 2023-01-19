import { SOURCES } from "@socialgouv/cdtn-sources";

export const getAllContributions = (): any => {
  return {
    _source: [
      "title",
      "shortTitle",
      "description",
      "url",
      "slug",
      "breadcrumbs",
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
