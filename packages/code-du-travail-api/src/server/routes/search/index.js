const fetch = require("node-fetch").default;

const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
 
const router = new Router({ prefix: API_BASE_URL });

/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/search?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @param {string} querystring.excludeSources A `excludeSources` querystring param containing the sources (comma separatied list) to exclude from the results
 * @returns {Object} Results.
 */
router.get("/search", async ctx => {
  const query = ctx.request.query.q;
  const response = await fetch(
    http://0.0.0.0:5000/api/search?q=${query}`
  );
  const results = await response.json();
  ctx.body = {
    ...results
  };
});

module.exports = router;
