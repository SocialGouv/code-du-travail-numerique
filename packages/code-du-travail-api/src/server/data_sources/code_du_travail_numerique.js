const elasticsearchClient = require("../conf/elasticsearch.js");
const { logger } = require("../utils/logger");

const elasticsearchIndexName =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

/**
 * Return documents matching the given query from Elasticsearch.
 *
 * @param {string} query The query to search for.
 * @param {int} size The number of results to return.
 * @returns {Object} An elasticsearch response.
 */
async function search({
  query,
  size = 10,
  must = [],
  mustNot = [],
  filter = [],
  should = [],
  fieldHightlight = [],
  fragmentSize = 40,
  ...others
}) {
  let elasticsearchQuery = {
    index: elasticsearchIndexName,
    body: {
      size: size,
      ...others,
      query: {
        bool: {
          filter: [...filter],
          must_not: [...mustNot],
          must: [
            // Fuziness is ignored with multi_match's cross_fields.
            // https://github.com/elastic/elasticsearch/issues/6866
            // Put multi_match clause in standby, use an inner bool with 2 should clauses instead.
            // {
            //   multi_match: {
            //     query: query,
            //     fields: [
            //       'all_text.french_stemmed',
            //       'all_text.french_exact',
            //     ],
            //     operator: 'and',
            //     cutoff_frequency: 0.0007,
            //     type: 'cross_fields',
            //   },
            {
              bool: {
                should: [
                  {
                    match: {
                      "all_text.french_exact": {
                        query: query,
                        operator: "and",
                        cutoff_frequency: 0.0007,
                        fuzziness: "AUTO"
                      }
                    }
                  },
                  {
                    match: {
                      "all_text.french_stemmed": {
                        query: query,
                        operator: "and",
                        cutoff_frequency: 0.0007,
                        fuzziness: "AUTO"
                      }
                    }
                  },
                  ...must
                ]
              }
            }
          ],
          should: [
            {
              multi_match: {
                query: query,
                fields: ["title.french_stemmed", "title.french_exact"],
                type: "most_fields",
                boost: 2000
              }
            },
            {
              match: {
                "all_text.shingle": {
                  query: query,
                  boost: 1500
                }
              }
            },
            {
              multi_match: {
                query: query,
                fields: ["path.french_stemmed", "path.french_exact"],
                type: "most_fields",
                boost: 500
              }
            },
            // Temporarily put "fonction publique" and "agent public" results in a less prominent position.
            // todo: add a disclaimer
            {
              query_string: {
                query:
                  '(title.shingle:"fonction publique") OR (title.shingle:"agent public")',
                boost: -2000
              }
            },
            ...should
          ]
        }
      },
      highlight: {
        order: "score",
        pre_tags: ["<mark>"],
        post_tags: ["</mark>"],
        fragment_size: fragmentSize,
        fields: {
          "title.french_stemmed": {},
          "title.french_exact": {},
          "all_text.french_stemmed": {},
          "all_text.french_exact": {},
          "all_text.shingle": {},
          "path.french_stemmed": {},
          "path.french_exact": {},
          ...fieldHightlight
        }
      }
    }
  };

  return await elasticsearchClient.search(elasticsearchQuery);
}

/**
 * Return number of indexed documents by source
 *
 * @returns {Object} An elasticsearch response.
 */
async function getDocsCount() {
  return await elasticsearchClient
    .search({
      index: elasticsearchIndexName,
      type: elasticsearchIndexName,
      body: {
        size: 0,
        aggs: {
          sources: {
            terms: { field: "source" }
          }
        }
      }
    })
    .then(res => {
      logger.debug(res.aggregations);
      return res.aggregations;
    });
  // (res.hits.total && res.hits.hits[0]) || null);
}

module.exports = {
  getDocsCount,
  search
};
