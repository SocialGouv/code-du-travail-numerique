const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getIdccBody = require("./idcc.elastic");
const getIdccByNumBody = require("./idccByNum.elastic");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/idcc?q=banlangerie
 * http://localhost:1337/api/v1/idcc?q=843
 * http://localhost:1337/api/v1/idcc?q=1020Z
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @param {string} querystring.num A `num` querystring param containing the num to process.
 * @returns {Object} Results.
 */
router.get("/idcc", async ctx => {
  let body;
  if (ctx.request.query.num) {
    body = getIdccByNumBody({ query: ctx.request.query.num });
  } else {
    body = getIdccBody({ query: ctx.request.query.q });
  }

  ctx.body = await elasticsearchClient.search({ index, body });
});

module.exports = router;
