const elasticsearchClient = require('../conf/elasticsearch')

/**
 * Return documents matching the given query from the `code_du_travail_numerique` Elasticsearch's indice.
 *
 * @param {string} query The query to search for.
 * @returns {Object} An elasticsearch response.
 */
async function search (query) {

  const elasticsearchQuery = {
    index: 'code_du_travail_numerique',
    body: {
      query: {
        match: {
          bloc_textuel: {
            query: query,
            operator: 'and',
            fuzziness: 'AUTO',
          },
        },
      },
      highlight: {
        pre_tags: ['<b>'],
        post_tags: ['</b>'],
        fields: {
          bloc_textuel: {
            // Highlight the entire field contents.
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
