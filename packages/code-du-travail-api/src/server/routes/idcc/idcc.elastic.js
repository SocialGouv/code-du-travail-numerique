function getIdccBody({ query }) {
  return {
    _source: [
      "id",
      "title",
      "shortTitle",
      "url",
      "num",
      "slug",
      "effectif",
      "cdtnId",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: "conventions_collectives" } },
          { term: { isPublished: true } },
        ],
        must: {
          bool: {
            should: [
              {
                match: {
                  "shortTitle.french": {
                    boost: ".9",
                    fuzziness: "1",
                    query: `${query}`,
                  },
                },
              },
              {
                match_phrase_prefix: {
                  "num.text": {
                    query: `${query}`,
                  },
                },
              },
              {
                match_phrase_prefix: {
                  "synonyms.french": {
                    query: `${query}`,
                  },
                },
              },
              {
                match_phrase_prefix: {
                  "title.french": {
                    query: `${query}`,
                  },
                },
              },
            ],
          },
        },
        should: {
          rank_feature: {
            field: "effectif",
            log: {
              scaling_factor: 1,
            },
          },
        },
      },
    },
    size: 50,
  };
}
module.exports = getIdccBody;
