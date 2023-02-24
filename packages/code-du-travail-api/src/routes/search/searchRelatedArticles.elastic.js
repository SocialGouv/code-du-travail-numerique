const { SOURCES } = require("@socialgouv/cdtn-utils");

function getRelatedArticlesBody({ query, size = 5 }) {
  return {
    _source: ["title", "slug", "url", "source", "description", "cdtnId"],
    query: {
      bool: {
        filter: [
          { term: { source: `${SOURCES.CDT}` } },
          { term: { isPublished: true } },
        ],
        must: {
          bool: {
            should: [
              {
                multi_match: {
                  boost: 0.1,
                  fields: ["text.french", "title.french"],
                  minimum_should_match: "1<99% 3<75% 6<30%",
                  query: query,
                  type: "cross_fields",
                },
              },
              {
                match: {
                  "title.article_id": {
                    boost: 3,
                    query: query,
                  },
                },
              },
              {
                match: {
                  "text.french_with_synonyms": {
                    query: query,
                  },
                },
              },
            ],
          },
        },
        should: [
          {
            match_phrase: {
              "title.french": {
                boost: 2,
                query: `__start__ ${query}`,
                slop: 1,
              },
            },
          },
          {
            match_phrase: {
              "text.french": {
                boost: 1.5,
                query: query,
              },
            },
          },
          {
            match: {
              "title.french_with_synonyms": {
                query: query,
              },
            },
          },
        ],
      },
    },
    size,
  };
}

module.exports = getRelatedArticlesBody;
