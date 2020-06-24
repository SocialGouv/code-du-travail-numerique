const { SOURCES } = require("@cdt/sources");

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
      "covisits",
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
