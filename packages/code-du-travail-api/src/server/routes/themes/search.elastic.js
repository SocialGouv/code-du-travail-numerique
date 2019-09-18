function getRootThemesQuery() {
  return {
    _source: ["title", "slug", "position"],
    sort: [{ position: { order: "asc" } }],
    query: {
      bool: {
        must_not: {
          exists: {
            field: "breadcrumbs"
          }
        }
      }
    }
  };
}

function getThemeQuery({ slug }) {
  return {
    _source: ["title", "slug", "position", "breadcrumbs", "children", "refs"],
    sort: [{ position: { order: "asc" } }],
    query: {
      bool: {
        filter: {
          term: {
            slug
          }
        }
      }
    }
  };
}

module.exports = {
  getRootThemesQuery,
  getThemeQuery
};
