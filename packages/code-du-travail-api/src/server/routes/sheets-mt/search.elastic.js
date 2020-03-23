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
  };
}

module.exports = {
  getSheetMTQuery,
};
