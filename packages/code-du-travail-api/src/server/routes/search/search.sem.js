function getSemQuery({ query_vector, size, sources = [] }) {
  if (sources.length === 0) {
    throw new Error("[getSemQuery] sources should not be empty");
  }
  return {
    _source: [
      "title",
      "source",
      "slug",
      "description",
      "url",
      "action",
      "breadcrumbs",
      "cdtnId",
    ],
    query: {
      script_score: {
        query: {
          bool: {
            filter: [
              {
                term: {
                  excludeFromSearch: false,
                },
              },
              {
                bool: {
                  should: sources.map((source) => ({ term: { source } })),
                },
              },
            ],
          },
        },
        script: {
          params: { query_vector: query_vector },
          source: "cosineSimilarity(params.query_vector, 'title_vector') + 1.0",
        },
      },
    },
    size: size,
  };
}

module.exports = getSemQuery;
