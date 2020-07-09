const { SOURCES } = require("@socialgouv/cdtn-sources");

function getRootThemesQuery() {
  return {
    _source: ["icon", "children", "title", "slug", "position"],
    sort: [{ position: { order: "asc" } }],
    query: {
      bool: {
        must_not: {
          exists: {
            field: "breadcrumbs",
          },
        },
        filter: {
          term: {
            source: SOURCES.THEMES,
          },
        },
      },
    },
  };
}

function getThemeQuery({ slug }) {
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
    sort: [{ position: { order: "asc" } }],
    query: {
      bool: {
        filter: {
          term: {
            slug,
          },
        },
      },
    },
  };
}

module.exports = {
  getRootThemesQuery,
  getThemeQuery,
};
