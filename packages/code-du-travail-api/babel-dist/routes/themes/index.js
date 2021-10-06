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
const { getRootThemesQuery, getThemeQuery } = require("./search.elastic.js");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${_v.CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
const router = new Router({ prefix: _v.API_BASE_URL });
/**
 * Return the root themes
 *
 * @example
 * http://localhost:1337/api/v1/themes
 *
 * @returns {Object} An object containing the matching theme .
 */ router.get("/themes", async (ctx) => {
  const body = getRootThemesQuery({});
  const response = await _elasticsearch.default.search({ body, index });
  ctx.body = { children: response.body.hits.hits.map((t) => t._source) };
});
/**
 * Return the theme that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/themes/:slug
 *
 * @returns {Object} An object containing the matching theme .
 */ router.get("/themes/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const body = getThemeQuery({ slug });
  const response = await _elasticsearch.default.search({ body, index });
  if (response.body.hits.hits.length === 0) {
    ctx.throw(404, `there is no theme that match ${slug}`);
  }
  const theme = response.body.hits.hits[0];
  ctx.body = { ...theme._source };
});
var _default = router;
exports.default = _default;
