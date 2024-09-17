import { RelatedItemSettings } from "./service";
import { sources } from "./type";

export const getRelatedItemsBody = (
  settings: RelatedItemSettings[],
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
            like: settings,
            max_query_terms: 12,
            min_term_freq: 1,
          },
        },
      },
    },
    size,
  };
};
