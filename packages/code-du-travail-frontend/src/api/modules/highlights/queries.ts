import { SOURCES } from "@socialgouv/cdtn-utils";

export function getHighlightsBySlug(slug: string) {
  return {
    _source: ["refs"],
    query: {
      bool: {
        filter: [{ term: { source: SOURCES.HIGHLIGHTS } }, { term: { slug } }],
      },
    },
  };
}
