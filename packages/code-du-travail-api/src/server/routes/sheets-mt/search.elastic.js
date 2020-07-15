const { SOURCES } = require("@socialgouv/cdtn-sources");

function getSheetMTQuery({ slug }) {
  return {
    _source: [
      "breadcrumbs",
      "date",
      "description",
      "intro",
      "sections",
      "slug",
      "title",
      "url",
      "cdtnId",
    ],
    query: {
      bool: {
        filter: [
          {
            term: { source: SOURCES.SHEET_MT_PAGE },
          },
          {
            term: { slug },
          },
        ],
      },
    },
  };
}

module.exports = {
  getSheetMTQuery,
};
