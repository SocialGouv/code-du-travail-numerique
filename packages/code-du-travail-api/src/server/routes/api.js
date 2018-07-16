const Router = require('koa-router')

const all = require('../data_sources/all.js')
const codeDuTravail = require('../data_sources/code_du_travail.js')
const faq = require('../data_sources/faq.js')
const fichesMinistereTravail = require('../data_sources/fiches_ministere_travail.js')
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
 * @returns {Object} Results.
 */
router.get(`${BASE_URL}/search`, async (ctx) => {
  try {
    let query = ctx.request.query.q
    ctx.body = await all.search(query, 5)
  } catch (error) {
    console.trace(error.message)
  }
})

/**
 * Return `code du travail` documents matching the given query.
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @returns {Object} Results.
 */
router.get(`${BASE_URL}/search/code_du_travail`, async (ctx) => {
  try {
    let query = ctx.request.query.q
    ctx.body = await codeDuTravail.search(query, 5)
  } catch (error) {
    console.trace(error.message)
  }
})

/**
 * Return `faq` documents matching the given query.
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @returns {Object} Results.
 */
router.get(`${BASE_URL}/search/faq`, async (ctx) => {
  try {
    let query = ctx.request.query.q
    ctx.body = await faq.search(query, 5)
  } catch (error) {
    console.trace(error.message)
  }
})

/**
 * Return `fiches ministere travail` documents matching the given query.
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @returns {Object} Results.
 */
router.get(`${BASE_URL}/search/fiches_ministere_travail`, async (ctx) => {
  try {
    let query = ctx.request.query.q
    ctx.body = await fichesMinistereTravail.search(query, 5)
  } catch (error) {
    console.trace(error.message)
  }
})

/**
 * Return `fiches service public` documents matching the given query.
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @returns {Object} Results.
 */
router.get(`${BASE_URL}/search/fiches_service_public`, async (ctx) => {
  try {
    let query = ctx.request.query.q
    ctx.body = await fichesServicePublic.search(query, 5)
  } catch (error) {
    console.trace(error.message)
  }
})

module.exports = router
