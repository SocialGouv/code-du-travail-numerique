const sourcesFilter = require("./sourcesFilter.elastic");

function getSemQuery({ query_vector, size, sources = [] }) {
  if (sources.length === 0) {
    throw new Error("[getSemQuery] sources should not be empty");
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

export function getSemQueryNew({ queryVector, size, sources = [] }) {
  if (sources.length === 0) {
    throw new Error("[getSemQuery] sources should not be empty");
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
      "sectionDisplayMode",
    ],
    knn: {
      boost: 0.5,
      field: "title_vector",
      filter: [
        { term: { excludeFromSearch: false } },
        { term: { isPublished: true } },
        sourcesFilter(sources),
      ],
      k: size,
      num_candidates: 50, // TODO : tune this parameter
      query_vector: queryVector,
    },
  };
}

module.exports = getSemQuery;
