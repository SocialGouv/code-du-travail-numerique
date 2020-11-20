function getDocumentByUrlBody({ url }) {
  return {
    _source: ["raw", "intro", "sections"],
    query: {
      bool: {
        filter: [{ term: { url } }, { term: { isPublished: true } }],
      },
    },
    size: 1,
  };
}

module.exports = getDocumentByUrlBody;
