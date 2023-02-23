import { SOURCES } from "@socialgouv/cdtn-types";

export function getHighlightsBySlug(slug: string) {
  return {
    query: {
      bool: {
        filter: [{ term: { source: SOURCES.HIGHLIGHTS } }, { term: { slug } }],
      },
    },
  };
}
