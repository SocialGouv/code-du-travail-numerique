function getRelatedItemsBody({ settings, size = 10, sources = [] }) {
  if (sources.length === 0) {
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
            min_term_freq: 1,
            max_query_terms: 12,
            like: settings
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
