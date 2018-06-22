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
                'tags.french': {
                  query: query,
                  boost: 3,
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
            {
              match_phrase: {
                'bloc_textuel.french': {
                  query: query,
                  boost: 3,
                  slop: 1,
                },
              },
            },
            {
              match: {
                'bloc_textuel.edge_ngram': {
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
          'tags.french': {
            number_of_fragments: 0,
          },
          'tags.edge_ngram': {
            number_of_fragments: 0,
          },
          'bloc_textuel.french': {
            number_of_fragments: 0,
          },
          'bloc_textuel.edge_ngram': {
            number_of_fragments: 0,
          },
        },
      },
      suggest: {
        text: query,
        suggestion: {
          phrase: {
            field: 'bloc_textuel',
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
