import { sources } from "./type";

export const getRelatedItemsBody = (
  searchString: string,
  size: number | undefined = 10
): any => {
  return {
    query: {
      bool: {
        filter: [
          { term: { excludeFromSearch: false } },
          { term: { isPublished: true } },
          {
            bool: {
              should: sources.map((source) => ({ term: { source } })),
            },
          },
        ],
        must: {
          more_like_this: {
            fields: ["title", "text"],
            like: searchString,
            max_query_terms: 12,
            min_term_freq: 1,
          },
        },
      },
    },
    size,
  };
};
