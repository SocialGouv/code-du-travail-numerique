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
<<<<<<< HEAD
=======
          },
          {
            bool: {
              should: [
                {
                  match_phrase_prefix: {
                    "title.french": {
                      query: `${query}`
                    }
                  }
                },
                {
                  match: {
                    "shortTitle.french": {
                      query: `${query}`,
                      fuzziness: "1",
                      boost: 0.7
                    }
                  }
                }
              ]
            }
>>>>>>> use should in filter
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
<<<<<<< HEAD
=======
              },
              {
                match: {
                  "shortTitle.french": {
                    query: `${query}`,
                    fuzziness: "1",
                    boost: 0.7
                  }
                }
>>>>>>> use should in filter
              }
            ]
          }
        }
      }
    }
  };
}

module.exports = getIdccBody;
