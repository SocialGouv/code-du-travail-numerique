"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var _elasticsearch = _interopRequireDefault(
  require("../../conf/elasticsearch.js")
);
var _v = require("../v1.prefix");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const getVersionsBody = require("./versions.elastic");
const Router = require("koa-router");
const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");
const memoizee = require("memoizee");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${_v.CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
const router = new Router({ prefix: _v.API_BASE_URL });
async function _getVersionsBody() {
  const body = getVersionsBody();
  const response = await _elasticsearch.default.search({ body, index });
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
 */ router.get("/version", async (ctx) => {
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
var _default = router;
exports.default = _default;
