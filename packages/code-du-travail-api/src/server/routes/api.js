const Router = require('koa-router')

const codeDuTravail = require('../data_sources/code_du_travail.js')
const faq = require('../data_sources/faq.js')
const fichesServicePublic = require('../data_sources/fiches_service_public.js')

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
    let query = ctx.request.query.q
    ctx.body = {
      code_du_travail: {
        results: await codeDuTravail.search(query, 10),
        resultsFormat: 'Elasticsearch response',
      },
      fiches_service_public: {
        results: await fichesServicePublic.search(query, 5),
        resultsFormat: 'Elasticsearch response',
      },
      faq: {
        results: await faq.search(query, 5),
        resultsFormat: 'Elasticsearch response',
      },
    }
  } catch (error) {
    console.trace(error.message)
  }
})

module.exports = router
