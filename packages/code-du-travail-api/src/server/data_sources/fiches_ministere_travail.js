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
            // Title.
            {
              match_phrase: {
                'title.french': {
                  query: query,
                  boost: 4,
                  slop: 1,
                },
              },
            },
            {
              match: {
                'title.edge_ngram': {
                  query: query,
                },
              },
            },
            // Text.
            {
              match_phrase: {
                'text.french': {
                  query: query,
                  boost: 3,
                  slop: 1,
                },
              },
            },
            {
              match: {
                'text.edge_ngram': {
                  query: query,
                },
              },
            },
            // Questions.
            {
              match_phrase: {
                'questions.french': {
                  query: query,
                  slop: 1,
                },
              },
            },
            {
              match: {
                'questions.edge_ngram': {
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
          'title.french': {
            number_of_fragments: 10,
          },
          'title.edge_ngram': {
            number_of_fragments: 10,
          },
          'text.french': {
            number_of_fragments: 10,
          },
          'text.edge_ngram': {
            number_of_fragments: 10,
          },
          'questions.french': {
            number_of_fragments: 10,
          },
          'questions.edge_ngram': {
            number_of_fragments: 10,
          },
        },
      },
      suggest: {
        text: query,
        suggestion: {
          phrase: {
            field: 'title',
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
