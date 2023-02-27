import { SOURCES } from "@socialgouv/cdtn-utils";

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
