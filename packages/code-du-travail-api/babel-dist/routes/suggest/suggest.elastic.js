"use strict";
function getSuggestQuery(query, size) {
  return {
    _source: ["title"],
    query: {
      bool: {
        must: [{ match: { title: { fuzziness: "auto", query } } }],
        should: [
          { match_phrase_prefix: { "title.prefix": { query } } },
          {
            rank_feature: {
              boost: 10,
              field: "ranking",
              log: { scaling_factor: 1 },
            },
          },
        ],
      },
    },
    size: size,
  };
}
module.exports = { getSuggestQuery };
