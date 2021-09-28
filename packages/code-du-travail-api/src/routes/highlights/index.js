import elasticsearchClient from "../../conf/elasticsearch.js";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";

const Router = require("koa-router");
const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");
const getHightlightsBody = require("./highlight.elastic");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the highlights that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/highlights/:slug
 *
 * @returns {Object} An object containing the matching theme.
 */

router.get("/highlights/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const body = getHightlightsBody({ slug });

  const response = await elasticsearchClient.search({ body, index });

  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `there is no highlight that matches "${slug}"`);
  }

  ctx.body = response.body.hits.hits[0]._source.refs;
});

export default router;
