import { SOURCES } from "@socialgouv/cdtn-utils";

export function getHighlightsBySlug(slug: string) {
  return {
    query: {
      bool: {
        filter: [{ term: { source: SOURCES.HIGHLIGHTS } }, { term: { slug } }],
      },
    },
  };
}
