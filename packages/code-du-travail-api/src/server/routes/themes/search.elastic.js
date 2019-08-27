export function getRootThemesQuery() {
  return {
    _source: ["title", "slug", "position"],
    sort: [{ position: { order: "asc" } }],
    query: {
      bool: {
        must_not: {
          exists: {
            field: "parents"
          }
        }
      }
    }
  };
}

export function getThemeQuery({ slug }) {
  return {
    _source: ["title", "slug", "position", "parents", "children"],
    sort: [{ position: { order: "asc" } }],
    query: {
      term: {
        slug: {
          value: slug,
          boost: 500
        }
      }
    }
  };
}
