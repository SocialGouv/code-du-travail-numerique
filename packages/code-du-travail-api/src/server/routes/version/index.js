const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the API version
 *
 * @example
 * http://localhost:1337/api/v1/version
 *
 * @returns {string} The current api version.
 */
router.get("/version", ctx => {
  const version =
    process.env.VERSION || require("../../../../package.json").version;
  ctx.body = { version };
});

module.exports = router;
