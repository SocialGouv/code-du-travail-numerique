import { SOURCES } from "@socialgouv/cdtn-utils";

export function getRootThemesQuery() {
  return {
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.THEMES } },
          { term: { isPublished: true } },
        ],
        must_not: { exists: { field: "breadcrumbs" } },
      },
    },
    sort: [{ position: { order: "asc" } }],
  };
}

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

export function getThemeBySlugsQuery(slugs: string[]) {
  return {
    query: {
      bool: {
        filter: [
          { terms: { slug: slugs } },
          { term: { isPublished: true } },
          { term: { source: SOURCES.THEMES } },
        ],
      },
    },
    sort: [{ position: { order: "asc" } }],
    size: 500,
  };
}
