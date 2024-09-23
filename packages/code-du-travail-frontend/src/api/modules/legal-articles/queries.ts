import { SOURCES } from "@socialgouv/cdtn-utils";

export const getLegalArticle = (slug: string) => {
  return {
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CDT } },
          { term: { slug } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 1,
  };
};
