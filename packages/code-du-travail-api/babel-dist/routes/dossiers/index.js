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
const { SOURCES } = require("@socialgouv/cdtn-sources");
const getItemBySlugBody = require("../items/searchBySourceSlug.elastic");

const router = new Router({ prefix: _v.API_BASE_URL });
const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${_v.CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
/**
 * Return thematic files that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/dossiers/:slug
 *
 * @returns {Object} An object containing the matching thematic file .
 */ router.get("/dossiers/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const body = getItemBySlugBody({ slug, source: SOURCES.THEMATIC_FILES });
  const response = await _elasticsearch.default.search({ body, index });
  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `there is no thematic files that match ${slug}`);
  }
  const thematicFile = response.body.hits.hits[0]._source;
  ctx.body = { ...thematicFile };
});
var _default = router;
exports.default = _default;
