function getSearchBody({ query, size, excludeSources = [] }) {
  return {
    size: size,
    _source: ["title", "source", "slug", "anchor", "url"],
    query: {
      bool: {
        must_not: excludeSources.map(source => ({
          query_string: {
            default_field: "source",
            query: source.trim()
          }
        })),
        must: [
          {
            bool: {
              should: [
                {
                  match: {
                    text: {
                      query: query,
                      operator: "and"
                    }
                  }
                }
              ]
            }
          }
        ],
        should: [
          {
            match: {
              title: {
                query: query
              }
            }
          },
          {
            match_phrase: {
              title: {
                query: `__start__ ${query}`,
                slop: 1,
                boost: 2
              }
            }
          },
          {
            match_phrase: {
              text: {
                query: query
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
    },
    highlight: {
      fragment_size: 40,
      order: "score",
      pre_tags: ["<mark>"],
      post_tags: ["</mark>"],
      fields: {
        title: {},
        "title.french_stemmed": {},
        text: {},
        path: {}
      }
    }
  };
}

module.exports = getSearchBody;
