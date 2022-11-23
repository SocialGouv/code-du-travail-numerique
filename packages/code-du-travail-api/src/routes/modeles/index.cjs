import elasticsearchClient from "../../elasticsearch";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";

import Router from "koa-router";
const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");
const getModeleBody = require("./searchModele.elastic");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/suggest?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @param {string} querystring.excludeSources A `excludeSources` querystring param containing the sources (comma separatied list) to exclude from the results
 * @returns {Object} Results.
 */
router.get("/modeles", async (ctx) => {
  const body = getModeleBody();
  const response = await elasticsearchClient.search({ body, index });
  if (response.body.hits.total.value > 0) {
    ctx.body = response.body.hits.hits.map(({ _source }) => _source);
  } else {
    ctx.body = [];
  }
});

export default router;
