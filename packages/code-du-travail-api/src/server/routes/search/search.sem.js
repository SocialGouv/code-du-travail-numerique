function getSemQuery({ query_vector, size, sources = [] }) {
  console.log(sources);
  return {
    size: size,
    _source: ["title", "source", "slug", "anchor", "url"],
    query: {
      script_score: {
        query: {
          bool: {
            filter: {
              bool: {
                should: sources.map(source => ({ term: { source } }))
              }
            }
          }
        },
        script: {
          source:
            "cosineSimilarity(params.query_vector, doc['title_vector']) + 1.0",
          params: { query_vector: query_vector }
        }
      }
    }
  };
}

module.exports = getSemQuery;
