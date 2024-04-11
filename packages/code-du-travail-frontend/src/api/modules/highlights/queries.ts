import { SOURCES } from "@socialgouv/cdtn-utils";

export function getHighlightsBySlug(slug: string) {
  return {
    _source: [
      "action",
      "title",
      "shortTitle",
      "breadcrumbs",
      "slug",
      "description",
      "highlight",
      "icon",
    ],
    query: {
      bool: {
        filter: [{ term: { source: SOURCES.HIGHLIGHTS } }, { term: { slug } }],
      },
    },
  };
}
