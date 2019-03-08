function getIdccBody({ query }) {
  return {
    size: 1000,
    _source: ["title", "url", "idcc"],
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
          multi_match: {
            query,
            fields: ["title.*", "idcc.*"]
          }
        },
        should: [
          {
            match: {
              "title.french_stemmed": {
                query
              }
            }
          }
        ]
      }
    }
  };
}

module.exports = getIdccBody;
