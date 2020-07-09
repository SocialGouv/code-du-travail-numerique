const { getSourceByRoute } = require("@socialgouv/cdtn-sources");

// get ES document related to given url
const getDocumentByUrlQuery = (
  url,
  _source = [
    "title",
    "source",
    "slug",
    "description",
    "url",
    "action",
    "breadcrumbs",
  ]
) => {
  const [, source, slug] = url.split("/");
  const esSource = getSourceByRoute(source);
  if (!esSource) {
    return;
  }
  return {
    _source,
    query: {
      bool: {
        filter: [{ term: { slug } }, { term: { source: esSource } }],
      },
    },
    size: 1,
  };
};

module.exports = getDocumentByUrlQuery;
