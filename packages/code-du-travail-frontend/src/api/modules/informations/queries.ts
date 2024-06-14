import { SOURCES } from "@socialgouv/cdtn-utils";

export const fetchInformations = () => {
  return {
    _source: ["title", "slug"],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.EDITORIAL_CONTENT } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 3000,
  };
};
