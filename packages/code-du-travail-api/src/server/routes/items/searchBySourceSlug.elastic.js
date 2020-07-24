function getSearchBody({ source, slug, fields = [] }) {
  return {
    _source: fields,
    query: {
      bool: {
        filter: [
          {
            term: { source },
          },
          {
            term: { slug },
          },
        ],
      },
    },
    size: 1,
  };
}

module.exports = getSearchBody;
