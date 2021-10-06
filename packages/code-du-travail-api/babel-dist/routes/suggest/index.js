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
const { SUGGESTIONS } = require("@socialgouv/cdtn-elasticsearch");
const { getSuggestQuery } = require("./suggest.elastic.js");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${_v.CDTN_ADMIN_VERSION}_${SUGGESTIONS}`;
const router = new Router({ prefix: _v.API_BASE_URL });
const minQueryLength = 2;
const suggestionsSize = 5;
/**
 * Return the search suggestion
 *
 * @example
 * http://localhost:1337/api/v1/suggest?q=aba
 *
 * @returns {Object} List of matching suggestions.
 */ router.get("/suggest", async (ctx) => {
  const { q = "", size = suggestionsSize } = ctx.request.query;
  if (q.length >= minQueryLength) {
    const body = getSuggestQuery(q, size);
    const response = await _elasticsearch.default.search({ body, index });
    ctx.body = response.body.hits.hits.map((t) => t._source.title);
  } else {
    ctx.body = [];
  }
});
var _default = router;
exports.default = _default;
