const { SOURCES } = require("@cdt/sources");

function getRelatedArticlesBody(query) {
  return {
    size: 5,
    _source: ["title", "slug", "url"],
    query: {
      bool: {
        filter: {
          term: {
            source: `${SOURCES.CDT}`
          }
        },
        must: {
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
                    query: query,
                    boost: 3
                  }
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
        },
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
          }
        ]
      }
    }
  };
}

module.exports = getRelatedArticlesBody;
