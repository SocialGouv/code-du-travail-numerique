import { SOURCES } from "@socialgouv/cdtn-utils";

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

export function getRelatedThemesBody(query: string, size = 5) {
  return {
    _source: [
      "icon",
      "title",
      "slug",
      "parentSlug",
      "url",
      "source",
      "cdtnId",
      "shortTitle",
      "breadcrumbs",
    ],
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

export function getRelatedArticlesBody(query: string, size = 5) {
  // try to match the actual title format
  const formattedTitle = query.replace(".", "").replace(" ", "").toUpperCase();

  return {
    _source: [
      "title",
      "slug",
      "url",
      "source",
      "description",
      "cdtnId",
      "shortTitle",
    ],
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
                  "title.french": {
                    boost: 3,
                    query: formattedTitle,
                  },
                },
              },
              {
                match: {
                  "text.french_with_synonyms": {
                    query,
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
                query: `__start__ ${formattedTitle}`,
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
                query: formattedTitle,
              },
            },
          },
        ],
      },
    },
    size,
  };
}

export function getSearchBody(query: string, size: number, sources: string[]) {
  return {
    _source: [
      "title",
      "source",
      "slug",
      "parentSlug",
      "description",
      "url",
      "action",
      "breadcrumbs",
      "cdtnId",
      "highlight",
      "sectionDisplayMode",
      "shortTitle",
      "displayTitle",
      "metaDescription",
    ],
    query: withNewsFreshness({
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
          sourcesFilter(sources),
        ],
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
                boost: 0.5,
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
                boost: 2,
                query: SOURCES.CONTRIBUTIONS,
              },
            },
          },
          // {
          //   match: {
          //     source: {
          //       boost: 1.1,
          //       query: SOURCES.SHEET_SP,
          //     },
          //   },
          // },
          {
            match: {
              source: {
                boost: 0.8,
                query: SOURCES.TOOLS,
              },
            },
          },
          {
            match: {
              source: {
                boost: 0.8,
                query: SOURCES.LETTERS,
              },
            },
          },
        ],
      },
    }),
    size,
  };
}

const NEWS_SEARCH_SOURCE_FIELDS = [
  "title",
  "source",
  "slug",
  "description",
  "cdtnId",
  "metaDescription",
];

/**
 * Freshness of a news item, from 1 (published in the last week) down to 0.5
 * two months later, then towards 0. `publishedAt` is the first publication:
 * `date` changes on every republication.
 */
const NEWS_FRESHNESS_DECAY = {
  gauss: {
    publishedAt: {
      origin: "now",
      offset: "7d",
      scale: "60d",
      decay: 0.5,
    },
  },
};

// A news item is only boosted at its freshest: an old one is outdated.
const NEWS_MIN_WEIGHT = 0.9;
const NEWS_FRESHNESS_WEIGHT = 0.3;

/**
 * Multiplies the score of news items by 0.9 (stale) to 1.2 (fresh), other
 * documents are left untouched.
 */
export const withNewsFreshness = (query: object) => ({
  function_score: {
    query,
    functions: [
      {
        filter: { term: { source: SOURCES.NEWS } },
        weight: NEWS_MIN_WEIGHT,
      },
      {
        filter: { term: { source: SOURCES.NEWS } },
        ...NEWS_FRESHNESS_DECAY,
        weight: NEWS_FRESHNESS_WEIGHT,
      },
    ],
    score_mode: "sum",
    boost_mode: "multiply",
  },
});

// Minimum BM25 score of the title match: filters out news that only share a
// generic word with the query ("travail", "salarié", "contrat"...).
export const NEWS_MIN_SCORE = 4.5;

// Only recent news are promoted to the top results.
const NEWS_PROMOTION_MAX_AGE = "now-180d/d";

/**
 * Recent news whose title contains every word of the query, the most relevant
 * and freshest first. Used to promote a news item in the top results, which
 * are otherwise filled by presearch and prequalified results.
 */
export function getNewsSearchBody(query: string, size = 1) {
  return {
    _source: NEWS_SEARCH_SOURCE_FIELDS,
    min_score: NEWS_MIN_SCORE,
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.NEWS } },
          { term: { excludeFromSearch: false } },
          { term: { isPublished: true } },
          { range: { publishedAt: { gte: NEWS_PROMOTION_MAX_AGE } } },
        ],
        must: {
          dis_max: {
            queries: [
              { match: { "title.french": { query, operator: "and" } } },
              {
                match: {
                  "title.french_with_synonyms": { query, operator: "and" },
                },
              },
            ],
          },
        },
      },
    },
    rescore: {
      window_size: 10,
      query: {
        rescore_query: {
          function_score: { ...NEWS_FRESHNESS_DECAY, boost_mode: "replace" },
        },
        score_mode: "multiply",
      },
    },
    size,
  };
}
