const elasticsearchClient = require('../conf/elasticsearch.js')

const elasticsearchIndexName = 'faq'

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
                'question.french': {
                  query: query,
                  boost: 3,
                  slop: 1,
                },
              },
            },
            {
              match: {
                'question.edge_ngram': {
                  query: query,
                },
              },
            },
            {
              match_phrase: {
                'reponse.french': {
                  query: query,
                  slop: 1,
                },
              },
            },
            {
              match: {
                'reponse.edge_ngram': {
                  query: query,
                },
              },
            },
            {
              match: {
                'theme.french': {
                  query: query,
                },
              },
            },
            {
              match: {
                'theme.edge_ngram': {
                  query: query,
                },
              },
            },
            {
              match: {
                'branche.french': {
                  query: query,
                },
              },
            },
            {
              match: {
                'branche.edge_ngram': {
                  query: query,
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
          'question.french': {
            number_of_fragments: 0,
          },
          'question.edge_ngram': {
            number_of_fragments: 0,
          },
          'reponse.french': {
            number_of_fragments: 0,
          },
          'reponse.edge_ngram': {
            number_of_fragments: 0,
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
