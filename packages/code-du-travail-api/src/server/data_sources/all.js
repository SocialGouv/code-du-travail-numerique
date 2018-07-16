const elasticsearchClient = require('../conf/elasticsearch.js')

const elasticsearchIndexName = 'all'

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
              multi_match: {
                query: query,
                fields: [
                  'title.edge_ngram',
                  'title.french_heavy',
                  'title.french_light^3',
                  'text.edge_ngram',
                  'text.french_heavy',
                  'text.french_light^3',
                  'path.edge_ngram',
                  'path.french_heavy',
                  'path.french_light',
                  'tags.edge_ngram',
                  'tags.french_heavy',
                  'tags.french_light',
                ],
                type: 'most_fields',
              },
            },
            {
              match_phrase: {
                'title.french_heavy': {
                  query: query,
                  boost: 2,
                  slop: 1,
                },
              },
            },
            {
              match_phrase: {
                'title.french_light': {
                  query: query,
                  boost: 5,
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
                'text.french_heavy': {
                  query: query,
                  boost: 2,
                  slop: 1,
                },
              },
            },
            {
              match_phrase: {
                'text.french_light': {
                  query: query,
                  boost: 5,
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
          ],
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
          'tags.french_light': {
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
