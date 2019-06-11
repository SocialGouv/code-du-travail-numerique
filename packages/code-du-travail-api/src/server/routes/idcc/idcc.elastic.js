function getIdccBody({ query }) {
  return {
    size: 1000,
    _source: ["id", "title", "url", "idcc", "slug"],
    query: {
      bool: {
        filter: [
          {
            term: {
              source: "kali"
            }
          }
        ],
        must: {
          bool: {
            should: [
              {
                match: {
                  "title.french": {
                    query: `${query}`,
                    fuzziness: "AUTO",
                    boost: ".9"
                  }
                }
              },
              {
                multi_match: {
                  query: `${query}`,
                  fields: "idcc.*"
                }
              },
              {
                match_phrase_prefix: {
                  "title.french_stemmed": {
                    query: `${query}`
                  }
                }
              }
            ]
          }
        }
      }
    }
  };
}

module.exports = getIdccBody;
