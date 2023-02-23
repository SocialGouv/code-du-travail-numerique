import { SOURCES } from "cdtn-types";

export function getHighlightsBySlug(slug: string) {
  return {
    query: {
      bool: {
        filter: [{ term: { source: SOURCES.HIGHLIGHTS } }, { term: { slug } }],
      },
    },
  };
}
