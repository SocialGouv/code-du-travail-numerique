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
const Router = require("koa-router");
const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");
const getModeleBody = require("./searchModele.elastic");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${_v.CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
const router = new Router({ prefix: _v.API_BASE_URL });
/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/suggest?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @param {string} querystring.excludeSources A `excludeSources` querystring param containing the sources (comma separatied list) to exclude from the results
 * @returns {Object} Results.
 */ router.get("/modeles", async (ctx) => {
  const body = getModeleBody();
  const response = await _elasticsearch.default.search({ body, index });
  if (response.body.hits.total.value > 0) {
    ctx.body = response.body.hits.hits.map(({ _source }) => _source);
  } else {
    ctx.body = [];
  }
});
var _default = router;
exports.default = _default;
