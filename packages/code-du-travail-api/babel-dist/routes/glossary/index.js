"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var _elasticsearch = _interopRequireDefault(
  require("../../conf/elasticsearch.js")
);
var _v = require("../v1.prefix");
var _glossary = _interopRequireDefault(require("./glossary.elastic"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const Router = require("koa-router");
const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");
const memoizee = require("memoizee");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${_v.CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
const router = new Router({ prefix: _v.API_BASE_URL });
async function _getGlossaryData() {
  const body = (0, _glossary.default)();
  const response = await _elasticsearch.default.search({ body, index });
  return response;
}
const getGlossary = memoizee(_getGlossaryData, {
  maxAge: 1000 * 5 * 60,
  preFetch: true,
  promise: true,
});
/**
 * Return glossary terms that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/glossary
 *
 * @returns {Object} An object containing glossary terms .
 */ router.get("/glossary", async (ctx) => {
  const response = await getGlossary();
  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `there is no glossary data`);
  }
  const glossaryData = response.body.hits.hits[0]._source.data;
  ctx.body = glossaryData;
});
/**
 * Return glossary terms that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/glossary/convention-collective
 *
 * @returns {Object} An object containing glossary terms .
 */ router.get("/glossary/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const response = await getGlossary();
  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `there is no highlights data`);
  }
  const glossaryData = response.body.hits.hits[0]._source.data;
  const [term] = glossaryData.filter((term) => slug === term.slug);
  if (!term) {
    ctx.throw(404, `there is no glossary term that match slug ${slug}`);
  }
  ctx.body = { ...term };
});
var _default = router;
exports.default = _default;
