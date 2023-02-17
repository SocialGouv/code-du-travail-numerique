import { SOURCES } from "cdtn-types";

export function getThemeBySlugQuery(slug: string) {
  return {
    _source: [
      "title",
      "slug",
      "position",
      "breadcrumbs",
      "children",
      "description",
      "refs",
    ],
    query: {
      bool: {
        filter: [
          { term: { slug } },
          { term: { isPublished: true } },
          { term: { source: SOURCES.THEMES } },
        ],
      },
    },
    sort: [{ position: { order: "asc" } }],
  };
}
