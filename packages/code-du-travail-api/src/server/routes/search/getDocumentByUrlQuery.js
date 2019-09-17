const { getSourceByRoute } = require("@cdt/sources");

// get ES document related to given url
const getDocumentByUrlQuery = url => {
  const [, source, slug] = url.split("/");
  const esSource = getSourceByRoute(source);
  if (!esSource) {
    return;
  }
  return {
    size: 1,
    query: {
      bool: {
        must: [
          {
            match: {
              slug
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
