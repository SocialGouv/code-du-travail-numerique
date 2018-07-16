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
        bool: {
          should: [
            {
              match_phrase: {
                'title.french_light': {
                  query: query,
                  boost: 3,
                  slop: 1,
                },
              },
            },
            {
              match_phrase: {
                'title.french_heavy': {
                  query: query,
                  slop: 1,
                },
              },
            },
            {
              match: {
                'title.edge_ngram': {
                  query: query,
                  minimum_should_match: '100%',
                },
              },
            },
            {
              match_phrase: {
                'text.french_light': {
                  query: query,
                  boost: 3,
                  slop: 1,
                },
              },
            },
            {
              match_phrase: {
                'text.french_heavy': {
                  query: query,
                  slop: 1,
                },
              },
            },
            {
              match: {
                'text.edge_ngram': {
                  query: query,
                  minimum_should_match: '100%',
                },
              },
            },
          ],
        },
      },
      highlight: {
        order: 'score',
        pre_tags: ['<b>'],
        post_tags: ['</b>'],
        fields: {
          'text.french_heavy': {
            number_of_fragments: 10,
          },
          'text.french_light': {
            number_of_fragments: 10,
          },
          'title.french_heavy': {
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
