const Router = require("koa-router");

const codeDuTravailNumerique = require("../data_sources/code_du_travail_numerique.js");
const router = new Router();
const BASE_URL = `/api/v1`;

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
  ctx.body = await codeDuTravailNumerique.getDocsCount();
});

/**
 * Return the API version
 *
 * @example
 * http://localhost:1337/api/v1/version
 *
 * @returns {string} The current api version.
 */
router.get(`${BASE_URL}/version`, ctx => {
  ctx.body = { version: require("../../../package.json").version };
});

module.exports = router;
module.exports.BASE_URL = BASE_URL;
