const Router = require('koa-router')
const codeDuTravail = require('../data_sources/code_du_travail')

const router = new Router()
const BASE_URL = `/api/v1`

/**
 * Return documents matching the given query from multiple data sources.
 *
 * @example
 * http://localhost:1337/api/v1/search?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @returns {Object} Results by data sources.
 */
router.get(`${BASE_URL}/search`, async (ctx) => {
  try {
    // TODO: use other data sources.
    ctx.body = {
      code_du_travail: {
        results: await codeDuTravail.search(ctx.request.query.q),
        resultsFormat: 'Elasticsearch response',
      },
    }
  } catch (error) {
    console.trace(error.message)
  }
})

module.exports = router
