const { getSourceByRoute } = require("@cdt/sources");

// get ES document related to given url
const getDocumentByUrlQuery = (
  url,
  _source = [
    "title",
    "source",
    "slug",
    "description",
    "anchor",
    "url",
    "breadcrumbs"
  ]
) => {
  const [, source, slug] = url.split("/");
  const esSource = getSourceByRoute(source);
  if (!esSource) {
    return;
  }
  return {
    _source,
    size: 1,
    query: {
      bool: {
        must: [
          {
            match: {
              slug: {
                query: slug,
                minimum_should_match: "70%"
              }
            }
          },
          {
            term: {
              source: getSourceByRoute(source)
            }
          }
        ]
      }
    }
  };
};

module.exports = getDocumentByUrlQuery;
