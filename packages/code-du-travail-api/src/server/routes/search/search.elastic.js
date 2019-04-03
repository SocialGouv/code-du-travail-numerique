const getExpressions = require("./search.expressions");

function getSearchBody({ query, size, excludeSources = [] }) {
  return {
    size: size,
    _source: ["title", "source", "slug", "anchor", "url"],
    aggregations: {
      bySource: {
        terms: {
          field: "source",
          include: "snippet"
        },
        aggs: {
          bySource: {
            top_hits: {
              size: 1,
              _source: {
                includes: ["html", "references"]
              }
            }
          }
        }
      }
    },
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
                },
                ...getExpressions(query)
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
              "tags.keywords": {
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

module.exports = getSearchBody;
