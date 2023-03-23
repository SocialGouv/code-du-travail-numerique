import { SOURCES } from "@socialgouv/cdtn-utils";

export function getSemQuery(queryVector: any, sources: any, size: number) {
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
      "sectionDisplayMode",
    ],
    query: {
      script_score: {
        query: {
          bool: {
            filter: [
              { term: { excludeFromSearch: false } },
              { term: { isPublished: true } },
              sourcesFilter(sources),
            ],
          },
        },
        script: {
          params: { query_vector: queryVector },
          source: "cosineSimilarity(params.query_vector, 'title_vector') + 1.0",
        },
      },
    },
    size: size,
  };
}

// if convention collectives are required
// we only return the one with contributions
export const sourcesFilter = (sources: any) =>
  sources.includes(SOURCES.CCN)
    ? {
        bool: {
          should: [
            // contents other than CCN
            // we want a boost here to avoid noise from CCNs
            {
              terms: {
                boost: 30,
                source: sources.filter((s) => s != SOURCES.CCN),
              },
            },
            // OR ( CCN source AND contributions )
            {
              bool: {
                must: [
                  { term: { source: SOURCES.CCN } },
                  { term: { contributions: true } },
                  {
                    rank_feature: {
                      boost: 10,
                      field: "effectif",
                    },
                  },
                ],
              },
            },
          ],
        },
      }
    : { terms: { source: sources } };

export function getRelatedThemesBody(query, size = 5) {
  return {
    _source: ["icon", "title", "slug", "url", "source", "cdtnId"],
    query: {
      bool: {
        filter: [
          { term: { source: `${SOURCES.THEMES}` } },
          { term: { isPublished: true } },
        ],
        must: {
          match: {
            title: {
              fuzziness: "auto",
              query: `${query}`,
            },
          },
        },
        should: {
          match: {
            "breadcrumbs.label": {
              fuzziness: "auto",
              query: `${query}`,
            },
          },
        },
      },
    },
    size,
  };
}

export function getRelatedArticlesBody(query: any, size = 5) {
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

export function getSearchBody(query, size, sources = []) {
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
      "sectionDisplayMode",
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
                      boost: 30,
                      query,
                    },
                  },
                },
              ],
            },
          },
        ].concat(sourcesFilter(sources) as any),
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
