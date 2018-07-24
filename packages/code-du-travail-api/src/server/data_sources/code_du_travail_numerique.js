const elasticsearchClient = require('../conf/elasticsearch.js')

const elasticsearchIndexName = 'code_du_travail_numerique'

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
            {
              multi_match: {
                query: query,
                fields: [
                  'all_text.french_stemmed',
                  'all_text.french_exact',
                ],
                operator: 'and',
                type: 'cross_fields',
                cutoff_frequency: 0.0007,
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
          ],
        },
      },
      highlight: {
        order: 'score',
        pre_tags: ['<mark>'],
        post_tags: ['</mark>'],
        fields: {
          'title.french_stemmed': {
            number_of_fragments: 20,
          },
          'title.french_exact': {
            number_of_fragments: 20,
          },
          'all_text.french_stemmed': {
            number_of_fragments: 20,
          },
          'all_text.french_exact': {
            number_of_fragments: 20,
          },
          'all_text.shingle': {
            number_of_fragments: 20,
          },
          'path.french_stemmed': {
            number_of_fragments: 20,
          },
          'path.french_exact': {
            number_of_fragments: 20,
          },
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

module.exports = {
  search,
}
