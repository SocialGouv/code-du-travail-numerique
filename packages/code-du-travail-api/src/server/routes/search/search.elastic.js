function getSearchBody({ query, size, excludeSources = [] }) {
  return {
    size: size,
    _source: [
      "title",
      "source",
      "slug",
      "description",
      "anchor",
      "url",
      "breadcrumbs"
    ],
    query: {
      bool: {
        must_not: {
          terms: {
            source: excludeSources
          }
        },
        must: [
          {
            bool: {
              should: [
                {
                  multi_match: {
                    query: query,
                    fields: ["text.french", "title.french"],
                    type: "cross_fields",
                    minimum_should_match: "1<99% 3<75% 6<30%",
                    boost: 0.1
                  }
                },
                {
                  match: {
                    "text.french_with_synonyms": {
                      query: query
                    }
                  }
                }
              ]
            }
          }
        ],
        should: [
          {
            match_phrase: {
              "title.french": {
                query: `__start__ ${query}`,
                slop: 1,
                boost: 2
              }
            }
          },
          {
            match_phrase: {
              "text.french": {
                query: query,
                boost: 1.5
              }
            }
          },
          {
            match: {
              "title.french_with_synonyms": {
                query: query
              }
            }
          },
          {
            match: {
              source: {
                query: "contributions",
                boost: 1.2
              }
            }
          },
          {
            match: {
              source: {
                query: "outils",
                boost: 1.1
              }
            }
          },
          {
            match: {
              source: {
                query: "modeles_de_courriers",
                boost: 1.1
              }
            }
          }
        ]
      }
    }
  };
}

module.exports = getSearchBody;
