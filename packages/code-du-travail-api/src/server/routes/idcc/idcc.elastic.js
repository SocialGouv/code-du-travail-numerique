function getIdccBody({ query }) {
  const boolQuery = {
    filter: [
      {
        term: {
          source: "kali"
        }
      }
    ]
  };
  if (query) {
    boolQuery["must"] = {
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
            prefix: {
              idcc: `${query}`
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
    };
  }
  return {
    size: 1000,
    _source: ["id", "title", "titleShort", "url", "idcc", "slug"],
    query: {
      bool: boolQuery
    },
    sort: [{ "titleShort.keyword": { order: "asc" } }]
  };
}

module.exports = getIdccBody;
