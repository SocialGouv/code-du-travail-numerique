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
    _source: ["title", "slug", "position", "parents", "children", "refs"],
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
    //_source: ["title", "slug", "position", "parents", "children", "refs"],
    //sort: [{ position: { order: "asc" } }],
    query: {
      bool: {
        must: [
          {
            term: {
              source: {
                value: source
              }
            }
          },
          {
            match: {
              slug
            }
          }
        ]
      }
    }
  };
}

module.exports = {
  getRootThemesQuery,
  getThemeQuery,
  getBySlug
};
