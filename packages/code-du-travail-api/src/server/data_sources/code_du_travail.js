const elasticsearchClient = require('../conf/elasticsearch.js')

const elasticsearchIndexName = 'code_du_travail'

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
        multi_match: {
          query: query,
          fields: [
            'title.french_heavy',
            'title.french_light',
            'title.edge_ngram',
            'text.french_heavy',
            'text.french_light^3',
            'text.edge_ngram',
            'path.french_heavy',
            'path.french_light^2',
            'path.edge_ngram',
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
          'path.french_light': {
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

  const ARTICLE_REF_REGEX = /^[LRD]\d{1,4}-?\d{1,2}?$/i
  if (ARTICLE_REF_REGEX.test(query)) {
    elasticsearchQuery = {
      index: elasticsearchIndexName,
      body: {
        query: {
          term: {
            title: query,
          },
        },
      },
    }
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
