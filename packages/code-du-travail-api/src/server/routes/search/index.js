const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
const getSearch = require("./getSearch");

const router = new Router({ prefix: API_BASE_URL });

/**
 */
/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/search?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @param {string} querystring.excludeSources A `excludeSources` querystring param containing the sources (comma separatied list) to exclude from the results
 * @param {string} querystring.skipSavedResults A `skipSavedResults` querystring param indicates that we skip the savedResults search
 * @returns {Object} Results.
 */
router.get("/search", async ctx => {
  ctx.body = await getSearch(ctx.request.query);
});

module.exports = router;
