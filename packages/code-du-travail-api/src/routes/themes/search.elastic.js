const { SOURCES } = require("@socialgouv/cdtn-types");

function getRootThemesQuery() {
  return {
    _source: ["icon", "children", "title", "slug", "position"],
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

module.exports = {
  getRootThemesQuery,
  getThemeQuery,
};
