const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const {
  getRootThemesQuery,
  getThemeQuery,
  getBySlug
} = require("./search.elastic.js");

const { getSourceByRoute } = require("@cdt/sources");

const indexContenus = "code_du_travail_numerique";
const indexThemes = "cdtn_themes";

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
    index: indexThemes,
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

const extractFromUrl = url => {
  const [source, slug] = url.split("/").filter(Boolean);
  return [getSourceByRoute(source), slug];
};

const toEsRef = async ref => {
  const [source, slug] = extractFromUrl(ref.url);
  const body = getBySlug({ source, slug });
  const response = await elasticsearchClient.search({
    index: indexContenus,
    body
  });
  if (response.body.hits.hits.length) {
    return response.body.hits.hits[0];
  }
};

router.get("/themes/:slug", async ctx => {
  const { slug } = ctx.params;
  const body = getThemeQuery({ slug });
  const response = await elasticsearchClient.search({
    index: indexThemes,
    body
  });
  if (!response || response.body.hits.hits.length === 0) {
    ctx.throw(404, `there is no theme that match ${slug}`);
  }

  const hit = response.body.hits.hits[0];
  const refs = await Promise.all((hit._source.refs || []).map(toEsRef));

  ctx.body = {
    ...hit._source,
    refs
  };
});

module.exports = router;
