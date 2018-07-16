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
        bool: {
          should: [
            {
              match_phrase: {
                'path.french_heavy': {
                  query: query,
                  slop: 1,
                },
              },
            },
            {
              match_phrase: {
                'path.french_light': {
                  query: query,
                  boost: 3,
                  slop: 1,
                },
              },
            },
            {
              match: {
                'path.edge_ngram': {
                  query: query,
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
              match_phrase: {
                'text.french_light': {
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
          ],
        },
      },
      highlight: {
        order: 'score',
        pre_tags: ['<b>'],
        post_tags: ['</b>'],
        fields: {
          'path.french_light': {
            number_of_fragments: 0,
          },
          'path.french_heavy': {
            number_of_fragments: 0,
          },
          'text.french_light': {
            number_of_fragments: 10,
          },
          'text.french_heavy': {
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
            num: query,
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
