const { SOURCES } = require("@socialgouv/cdtn-sources");

function getRootThemesQuery() {
  return {
    _source: ["icon", "children", "title", "slug", "position"],
    query: {
      bool: {
        filter: {
          term: {
            source: SOURCES.THEMES,
          },
        },
        must_not: {
          exists: {
            field: "breadcrumbs",
          },
        },
      },
    },
    sort: [{ position: { order: "asc" } }],
  };
}

function getThemeQuery({ slug }) {
  return {
    _source: [
      "title",
      "id",
      "slug",
      "position",
      "breadcrumbs",
      "children",
      "description",
      "refs",
    ],
    query: {
      bool: {
        filter: {
          term: {
            slug,
          },
        },
      },
    },
    sort: [{ position: { order: "asc" } }],
  };
}

module.exports = {
  getRootThemesQuery,
  getThemeQuery,
};
