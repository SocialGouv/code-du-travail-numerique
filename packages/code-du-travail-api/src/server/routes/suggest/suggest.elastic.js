function getSuggestQuery(query, size) {
  return {
    _source: ["title"],
    size: size,
    query: {
      bool: {
        must: [
          {
            match: {
              title: {
                query,
                fuzziness: "auto"
              }
            }
          }
        ],
        should: [
          {
            match_phrase_prefix: {
              "title.text_prefix": {
                query
              }
            }
          },
          {
            rank_feature: {
              field: "ranking",
              log: {
                scaling_factor: 1
              },
              boost: 3
            }
          }
        ]
      }
    }
  };
}

module.exports = { getSuggestQuery };
