function getDocumentByUrlBody({ url }) {
  return {
    size: 1,
    query: {
      bool: {
        filter: {
          term: {
            url
          }
        }
      }
    },
    _source: ["raw", "intro", "sections"]
  };
}

module.exports = getDocumentByUrlBody;
