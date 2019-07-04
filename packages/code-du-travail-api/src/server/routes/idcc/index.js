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
 * @returns {Object} Results.
 */
router.get("/idcc", async ctx => {
  const body = getIdccBody({ query: ctx.request.query.q });

  const response = await elasticsearchClient.search({ index, body });
  ctx.body = response.body;
});

/**
 * Return the convention collective object that matches the given num
 *
 * @example
 * http://localhost:1337/api/v1/idcc/200
 *
 * @param {string} :num the searched IDCC number
 * @returns {Object} one IDCC object.
 */
router.get("/idcc/:num", async ctx => {
  const body = getIdccByNumBody({ query: ctx.params.num });

  const response = await elasticsearchClient.search({ index, body });

  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `no IDCC found for num ${ctx.params.num}`);
  }

  ctx.body = { ...response.body.hits.hits[0] };
});

module.exports = router;
