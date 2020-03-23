function getIdccBody({ query }) {
  return {
    size: 50,
    _source: ["id", "title", "shortTitle", "url", "idcc", "slug", "effectif"],
    query: {
      bool: {
        filter: [
          {
            term: {
              source: "conventions_collectives"
            }
          }
        ],
        must: {
          bool: {
            should: [
              {
                match: {
                  "shortTitle.french": {
                    query: `${query}`,
                    fuzziness: "1",
                    boost: ".9"
                  }
                }
              },
              {
                match_phrase_prefix: {
                  "idcc.text": {
                    query: `${query}`
                  }
                }
              },
              {
                match_phrase_prefix: {
                  "title.french": {
                    query: `${query}`
                  }
                }
              }
            ]
          }
        },
        should: {
          rank_feature: {
            field: "effectif",
            log: {
              scaling_factor: 1
            }
          }
        }
      }
    }
  };
}

module.exports = getIdccBody;
