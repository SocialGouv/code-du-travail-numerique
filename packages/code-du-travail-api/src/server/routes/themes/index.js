const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const { getRootThemesQuery, getThemeQuery } = require("./search.elastic.js");
const getEsReferences = require("../search/getEsReferences");

const index = process.env.ELASTICSEARCH_THEME_INDEX || "cdtn_themes";

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the root themes
 *
 * @example
 * http://localhost:1337/api/v1/themes
 *
 * @returns {Object} An object containing the matching theme .
 */
router.get("/themes", async ctx => {
  const body = getRootThemesQuery({});
  const response = await elasticsearchClient.search({
    index,
    body
  });
  ctx.body = {
    children: response.body.hits.hits.map(t => t._source)
  };
});

/**
 * Return the theme that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/themes/:slug
 *
 * @returns {Object} An object containing the matching theme .
 */

router.get("/themes/:slug", async ctx => {
  const { slug } = ctx.params;
  const body = getThemeQuery({ slug });
  const response = await elasticsearchClient.search({
    index,
    body
  });
  if (response.body.hits.hits.length === 0) {
    ctx.throw(404, `there is no theme that match ${slug}`);
  }

  const theme = response.body.hits.hits[0];
  const refs = await getEsReferences(theme._source.refs);

  ctx.body = {
    ...theme._source,
    refs: refs.map(({ _source }) => _source)
  };
});

module.exports = router;
