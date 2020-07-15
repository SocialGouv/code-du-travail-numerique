const { SOURCES, getSourceByRoute } = require("@socialgouv/cdtn-sources");

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
    "cdtnId",
  ]
) => {
  const [, source, slug] = url.split("/");
  let esSource = getSourceByRoute(source);
  if (!esSource) {
    return;
  }
  if (esSource === SOURCES.SHEET_MT && !slug.includes("#")) {
    esSource = SOURCES.SHEET_MT_PAGE;
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
