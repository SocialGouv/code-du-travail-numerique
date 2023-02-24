import { SOURCES } from "../../../../../code-du-travail-utils/build";

export function getHighlightsBySlug(slug: string) {
  return {
    query: {
      bool: {
        filter: [{ term: { source: SOURCES.HIGHLIGHTS } }, { term: { slug } }],
      },
    },
  };
}
