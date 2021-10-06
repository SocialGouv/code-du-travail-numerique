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
const { getRelatedItems } = require("../items/getRelatedItems");
const { getSheetMTQuery } = require("./search.elastic.js");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${_v.CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
const router = new Router({ prefix: _v.API_BASE_URL });
/**
 * Return the sheet-mt that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/sheets-mt/:slug
 *
 * @returns {Object} An object containing the matching sheet-mt .
 */ router.get("/sheets-mt/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const body = getSheetMTQuery({ slug });
  const response = await _elasticsearch.default.search({ body, index });
  if (response.body.hits.hits.length === 0) {
    ctx.throw(404, `there is no sheet mt that match ${slug}`);
  }
  const sheetMT = response.body.hits.hits[0];
  const relatedItems = await getRelatedItems({
    covisits: sheetMT._source.covisits,
    settings: sheetMT._source.title,
    slug,
    title: sheetMT._source.title,
  });
  delete sheetMT._source.covisits;
  ctx.body = { ...sheetMT, relatedItems };
});
var _default = router;
exports.default = _default;
