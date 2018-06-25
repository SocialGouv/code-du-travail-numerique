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
            // Sous theme.
            {
              match_phrase: {
                'sous_theme.french': {
                  query: query,
                  boost: 2,
                  slop: 1,
                },
              },
            },
            {
              match: {
                'sous_theme.edge_ngram': {
                  query: query,
                },
              },
            },
            // Tags.
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
          'sous_theme.french': {
            number_of_fragments: 10,
          },
          'sous_theme.edge_ngram': {
            number_of_fragments: 10,
          },
          'tags.french': {
            number_of_fragments: 10,
          },
          'tags.edge_ngram': {
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
