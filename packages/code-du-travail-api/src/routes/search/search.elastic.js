const sourcesFilter = require("./sourcesFilter.elastic");
const { SOURCES } = require("@socialgouv/cdtn-sources");

function getSearchBody({ query, size, sources = [] }) {
  if (sources.length === 0) {
    throw new Error("[getSearchBody] sources should not be empty");
  }

  return {
    _source: [
      "title",
      "source",
      "slug",
      "description",
      "url",
      "action",
      "breadcrumbs",
      "cdtnId",
      "highlight",
    ],
    query: {
      bool: {
        filter: [
          { term: { excludeFromSearch: false } },
          { term: { isPublished: true } },
        ],
        must: [
          {
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
                    "text.french_with_synonyms": {
                      query: query,
                    },
                  },
                },
                {
                  match: {
                    "synonymes.french": {
                      boost: 15,
                      query,
                    },
                  },
                },
              ],
            },
          },
        ].concat(sourcesFilter(sources, query)),
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
          {
            match: {
              source: {
                boost: 1.2,
                query: SOURCES.CONTRIBUTIONS,
              },
            },
          },
          {
            match: {
              source: {
                boost: 1.1,
                query: SOURCES.TOOLS,
              },
            },
          },
          {
            match: {
              source: {
                boost: 1.1,
                query: SOURCES.LETTERS,
              },
            },
          },
        ],
      },
    },
    size: size,
  };
}

module.exports = getSearchBody;
