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
const getAgreementBody = require("./getAgreementBySlug.elastic");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${_v.CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
const router = new Router({ prefix: _v.API_BASE_URL });
/**
 * Return the convention collective data that matches the given idcc and type
 *
 * @example
 * http://localhost:1337/api/v1/conventions/200/base
 *
 * @param {string} :idcc the IDCC number
 * @param {string} :type the type of texte requested (either none or "base", "attache", "salaire")
 * @returns {Object} some convention data.
 */ router.get("/conventions/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const body = getAgreementBody({ slug });
  const response = await _elasticsearch.default.search({ body, index });
  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `agreement not found, no agreement match ${slug}`);
  }
  ctx.body = { ...response.body.hits.hits[0]._source };
});
var _default = router;
exports.default = _default;
