const { SOURCES } = require("@socialgouv/cdtn-sources");

function getSearchBody({ query, size, sources = [] }) {
  if (sources.length === 0) {
    throw new Error("[getSearchBody] sources should not be empty");
  }

  // if convention collectives are required
  // we only return the one with contributions
  const sourceFilter = sources.includes(SOURCES.CCN)
    ? {
        bool: {
          should: [
            // contents other than CCN
            { terms: { source: sources.filter((s) => s != SOURCES.CCN) } },
            // OR ( CCN source AND contributions )
            sources.includes(SOURCES.CCN)
              ? {
                  bool: {
                    must: [
                      { term: { source: SOURCES.CCN } },
                      { term: { contributions: true } },
                    ],
                  },
                }
              : {},
          ],
        },
      }
    : { terms: { source: sources } };

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
              ],
            },
          },
        ].concat(sourceFilter),
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
                query: "contributions",
              },
            },
          },
          {
            match: {
              source: {
                boost: 1.1,
                query: "outils",
              },
            },
          },
          {
            match: {
              source: {
                boost: 1.1,
                query: "modeles_de_courriers",
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
