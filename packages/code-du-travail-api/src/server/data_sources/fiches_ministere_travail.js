const elasticsearchClient = require('../conf/elasticsearch.js')

const elasticsearchIndexName = 'fiches_ministere_travail'

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
      min_score: 5,
      query: {
        multi_match: {
          query: query,
          fields: [
            'title.french_heavy',
            'title.french_light^3',
            'title.edge_ngram',
            'text.french_heavy',
            'text.french_light^2',
            'text.edge_ngram',
          ],
          type: 'most_fields',
        },
      },
      highlight: {
        order: 'score',
        pre_tags: ['<b>'],
        post_tags: ['</b>'],
        fields: {
          'text.french_light': {
            number_of_fragments: 10,
          },
          'title.french_light': {
            number_of_fragments: 10,
          },
        },
      },
      suggest: {
        text: query,
        suggestion: {
          phrase: {
            field: 'text',
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
