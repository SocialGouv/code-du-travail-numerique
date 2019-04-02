function getFacetsBody({ query }) {
  return {
    size: 0,
    aggregations: {
      document_count: {
        terms: {
          field: "source",
          exclude: ["snippet"]
        }
      }
    },
    query: {
      bool: {
        must: [
          {
            bool: {
              should: [
                {
                  multi_match: {
                    query: query,
                    fields: ["text.french", "title.french"],
                    type: "cross_fields",
                    minimum_should_match: "3<75% 6<30%",
                    boost: 0.1
                  }
                },
                {
                  match: {
                    "title.article_id": {
                      query: query
                    }
                  }
                },
                {
                  match: {
                    "text.french_stemmed": {
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
              "tags.theme": {
                query: `theme:${query}`
              }
            }
          },
          {
            match: {
              path: {
                query: query
              }
            }
          },
          {
            match: {
              "title.french_stemmed": {
                query: query
              }
            }
          },
          {
            query_string: {
              query:
                '(title.french_stemmed:"fonction publique") OR (title.french_stemmed:"agent public")',
              boost: -2000
            }
          }
        ]
      }
    }
  };
}

module.exports = getFacetsBody;
