const elasticsearchClient = require('../conf/elasticsearch.js')

const elasticsearchIndexName = 'code_du_travail_numerique'
const elasticsearchTypeName = 'code_du_travail_numerique'

/**
 * Return documents matching the given query from Elasticsearch.
 *
 * @param {string} query The query to search for.
 * @param {int} size The number of results to return.
 * @returns {Object} An elasticsearch response.
 */
async function search (query, size) {

  let elasticsearchQuery = {
    index: elasticsearchIndexName,
    body: {
      size: size,
      query: {
        bool: {
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
                      'all_text.french_exact': {
                        query: query,
                        operator: 'and',
                        cutoff_frequency: 0.0007,
                        fuzziness: 'AUTO',
                      },
                    },
                  },
                  {
                    match: {
                      'all_text.french_stemmed': {
                        query: query,
                        operator: 'and',
                        cutoff_frequency: 0.0007,
                        fuzziness: 'AUTO',
                      },
                    },
                  },
                ],
              },
            },
          ],
          should: [
            {
              multi_match: {
                query: query,
                fields: [
                  'title.french_stemmed',
                  'title.french_exact',
                ],
                type: 'most_fields',
                boost: 2000,
              },
            },
            {
              match: {
                'all_text.shingle': {
                  query: query,
                  boost: 1500,
                },
              },
            },
            {
              multi_match: {
                query: query,
                fields: [
                  'path.french_stemmed',
                  'path.french_exact',
                ],
                type: 'most_fields',
                boost: 500,
              },
            },
            // Temporarily put "fonction publique" and "agent public" results in a less prominent position.
            {
              query_string: {
                query: '(title.shingle:"fonction publique") OR (title.shingle:"agent public")',
                boost: -2000,
              },
            },
          ],
        },
      },
      highlight: {
        order: 'score',
        pre_tags: ['<mark>'],
        post_tags: ['</mark>'],
        fragment_size: 40,
        fields: {
          'title.french_stemmed': {},
          'title.french_exact': {},
          'all_text.french_stemmed': {},
          'all_text.french_exact': {},
          'all_text.shingle': {},
          'path.french_stemmed': {},
          'path.french_exact': {},
        },
      },
    },
  }

  try {
    return await elasticsearchClient.search(elasticsearchQuery)
  } catch (error) {
    console.trace(error.message)
  }

}

/**
 * Get a single JSON document from the index based on its id.
 *
 * @param {string} id The item ID to fetch.
 * @returns {Object} An elasticsearch response.
 */
async function getSingleItem (id) {

  let elasticsearchQuery = {
    id: id,
    index: elasticsearchIndexName,
    type: elasticsearchTypeName,
  }

  try {
    return await elasticsearchClient.get(elasticsearchQuery)
  } catch (error) {
    console.trace(error.message)
  }

}

module.exports = {
  getSingleItem,
  search,
}
