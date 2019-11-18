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
      "url"
    ],
    query: {
      bool: {
        filter: {
          term: {
            "slug.asKeyword": slug
          }
        }
      }
    }
  };
}

module.exports = {
  getSheetMTQuery
};
