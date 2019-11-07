function getRelatedItemsBody({ index, id, size = 5, sources = [] }) {
  if (sources.lenght === 0) {
    throw new Error("[getRelatedItemsBody] sources should not be empty");
  }
  return {
    size,
    _source: ["title", "source", "slug"],
    query: {
      bool: {
        must: {
          more_like_this: {
            fields: ["title", "text"],
            like: [{ _index: index, _id: id }]
          }
        },
        filter: {
          bool: {
            should: sources.map(source => ({ term: { source } }))
          }
        }
      }
    }
  };
}

module.exports = getRelatedItemsBody;
