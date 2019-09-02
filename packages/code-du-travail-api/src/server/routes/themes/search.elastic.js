function getRootThemesQuery() {
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

function getThemeQuery({ slug }) {
  return {
    _source: ["title", "slug", "position", "breadcrumbs", "children", "refs"],
    sort: [{ position: { order: "asc" } }],
    query: {
      term: {
        slug: {
          value: slug
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
