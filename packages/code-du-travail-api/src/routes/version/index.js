import elasticsearchClient from "../../elasticsearch";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";

const getVersionsBody = require("./versions.elastic");

const Router = require("koa-router");
const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");
const memoizee = require("memoizee");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
const router = new Router({ prefix: API_BASE_URL });

async function _getVersionsBody() {
  const body = getVersionsBody();

  const response = await elasticsearchClient.search({ body, index });
  return response;
}
const getVersions = memoizee(_getVersionsBody, {
  maxAge: 1000 * 5 * 60,
  preFetch: true,
  promise: true,
});

/**
 * Return the API version
 *
 * @example
 * http://localhost:1337/api/v1/version
 *
 * @returns {string} The current api version.
 */
router.get("/version", async (ctx) => {
  const version =
    process.env.VERSION || require("../../../package.json").version;

  const response = await getVersions();

  if (response.body.hits.hits.length == 0) {
    ctx.throw(500, "Cannot read package versions in Elastic.");
  } else {
    const { data } = response.body.hits.hits[0]._source;
    ctx.body = { data, version };
  }
});

export default router;
