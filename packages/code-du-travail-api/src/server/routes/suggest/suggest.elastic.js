function getSearchBody({ query, size = 5, excludeSources = [] }) {
  return {
    size: size,
    _source: ["title", "source", "slug", "anchor", "url"],
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
    },
    highlight: {
      order: "score",
      pre_tags: ["<mark>"],
      post_tags: ["</mark>"],
      fragment_size: 200,
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
