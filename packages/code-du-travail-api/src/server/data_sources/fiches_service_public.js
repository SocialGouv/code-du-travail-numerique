const elasticsearchClient = require('../conf/elasticsearch.js')

const elasticsearchIndexName = 'fiches_service_public'

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
          should: [
            {
              match_phrase: {
                'title.french': {
                  query: query,
                  boost: 3,
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
            {
              match_phrase: {
                'tags.french': {
                  query: query,
                  slop: 1,
                },
              },
            },
            {
              match: {
                'tags.edge_ngram': {
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
            number_of_fragments: 0,
          },
          'title.edge_ngram': {
            number_of_fragments: 0,
          },
          'tags.french': {
            number_of_fragments: 0,
          },
          'tags.edge_ngram': {
            number_of_fragments: 0,
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
