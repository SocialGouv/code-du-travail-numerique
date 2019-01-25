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
            match: {
              "title.light_stemmed": {
                query: query
              }
            }
          },
          {
            match_phrase: {
              "title.light_stemmed": {
                query: `_start_ ${query}`
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
            query_string: {
              query: '(title:"fonction publique") OR (title:"agent public")',
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
      fragment_size: 40,
      fields: {
        title: {},
        "title.light": {},
        "title.ligth_stemmed": {},
        text: {},
        path: {}
      }
    }
  };
}

module.exports = getSearchBody;
