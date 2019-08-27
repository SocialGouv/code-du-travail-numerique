const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
const {
  getTheme,
  getBreadcrumbs,
  getChildren
} = require("@cdt/data...themes/query");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSearchByThemeBody = require("../search/searchByTheme.elastic");
const { getRootThemesQuery, getThemeQuery } = require("./search.elastic.js");

const index = "cdtn_themes";

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
  const response = await elasticsearchClient.search({ index, body });
  ctx.body = response.body;
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
  const response = await elasticsearchClient.search({ index, body });
  if (!response) {
    ctx.throw(404, `there is no theme that match ${slug}`);
  }
  ctx.body = response.body;
});

/**
 * Return the items that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/themes/:slug/items
 *
 * @returns {Object} An object containing the matching theme and its related documents.
 */

router.get("/themes/:slug/items", async ctx => {
  const { slug } = ctx.params;
  const theme = getTheme(slug);
  if (!theme) {
    ctx.throw(404, `there is no theme that match ${slug}`);
  }
  const body = getSearchByThemeBody({ slug });
  const {
    body: { hits }
  } = await elasticsearchClient.search({ index, body });

  if (hits.total.value === 0) {
    ctx.throw(204, `there is no documents associated to the theme ${slug}`);
  }
  ctx.body = {
    ...theme,
    children: getChildren(slug),
    breadcrumbs: getBreadcrumbs(slug),
    documents: hits.hits
  };
});

module.exports = router;
