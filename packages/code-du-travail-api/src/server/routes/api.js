const Router = require("koa-router");

const codeDuTravailNumerique = require("../data_sources/code_du_travail_numerique.js");

const router = new Router();
const BASE_URL = `/api/v1`;

/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/search?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @returns {Object} Results.
 */
router.get(`${BASE_URL}/search`, async ctx => {
  try {
    let query = ctx.request.query.q;
    ctx.body = await codeDuTravailNumerique.search(query, 5);
  } catch (error) {
    console.trace(error.message);
  }
});

/**
 * Return document matching the given source+slug.
 *
 * @example
 * http://localhost:1337/api/v1/item/faq/:slug
 *
 * @param {string} :source The item source.
 * @param {string} :slug The item slug to fetch.
 * @returns {Object} Result.
 */
router.get(`${BASE_URL}/items/:source/:slug`, async ctx => {
  console.log("params", ctx.params);
  try {
    ctx.body = await codeDuTravailNumerique.getSingleItem({
      source: ctx.params.source,
      slug: ctx.params.slug
    });
  } catch (error) {
    console.trace(error.message);
  }
});

/**
 * Return document matching the given ID.
 *
 * @example
 * http://localhost:1337/api/v1/items/:id
 *
 * @param {string} :id The item ID to fetch.
 * @returns {Object} Result.
 */
router.get(`${BASE_URL}/items/:id`, async ctx => {
  try {
    ctx.body = await codeDuTravailNumerique.getSingleItem({
      id: ctx.params.id
    });
  } catch (error) {
    console.trace(error.message);
  }
});

/**
 * Return document matching the given ID.
 *
 * @example
 * http://localhost:1337/api/v1/items/:id
 *
 * @param {string} :id The item ID to fetch.
 * @returns {Object} Result.
 */
router.get(`${BASE_URL}/docsCount`, async ctx => {
  try {
    ctx.body = await codeDuTravailNumerique.getDocsCount();
  } catch (error) {
    console.trace(error.message);
  }
});
module.exports = router;
