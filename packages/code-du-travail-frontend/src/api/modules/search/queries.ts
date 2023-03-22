import { SOURCES } from "@socialgouv/cdtn-utils";

export function getSemQuery({ query_vector, size, sources }) {
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
          params: { query_vector: query_vector },
          source: "cosineSimilarity(params.query_vector, 'title_vector') + 1.0",
        },
      },
    },
    size: size,
  };
}

// if convention collectives are required
// we only return the one with contributions
export const sourcesFilter = (sources) =>
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
