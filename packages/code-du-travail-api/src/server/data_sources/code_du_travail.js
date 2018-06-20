const elasticsearchClient = require('../conf/elasticsearch')

/**
 * Return documents matching the given query from the `code_du_travail_numerique` Elasticsearch's indice.
 *
 * @param {string} query The query to search for.
 * @returns {Object} An elasticsearch response.
 */
async function search (query) {

  let elasticsearchQuery = {
    index: 'code_du_travail_numerique',
    body: {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: query,
                fields: [
                  'bloc_textuel.french^2',
                  'bloc_textuel.ngram',
                ],
              },
            },
          ],
        },
      },
      highlight: {
        pre_tags: ['<b>'],
        post_tags: ['</b>'],
        fields: {
          'bloc_textuel.french': {
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
      index: 'code_du_travail_numerique',
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
