import elasticsearchClient from "../../conf/elasticsearch.js";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";
import { parseIdcc } from "../../../../code-du-travail-data";

const Router = require("koa-router");
const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");
const getIdccBody = require("./idcc.elastic");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

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
router.get("/idcc", async (ctx) => {
  const query = ctx.request.query.q;

  // if only digit within query we make it a pure idcc search (like 1234)
  const idccQuery = /^\d+$/.test(query) ? parseIdcc(query) : undefined;

  const body = getIdccBody({ query, idccQuery });

  const response = await elasticsearchClient.search({ body, index });
  ctx.body = { ...response.body };
});

export default router;
