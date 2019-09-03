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

function getBySlug({ source, slug }) {
  return {
    query: {
      bool: {
        must: {
          match: {
            slug
          }
        },
        filter: {
          term: {
            source
          }
        }
      }
    }
  };
}

module.exports = {
  getRootThemesQuery,
  getThemeQuery,
  getBySlug
};
