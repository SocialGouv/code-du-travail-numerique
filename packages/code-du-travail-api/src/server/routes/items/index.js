const Router = require("koa-router");
const { SOURCES } = require("@cdt/sources");

const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const getItemBySlugBody = require("./searchBySourceSlug.elastic");

const getSearch = require("../search/getSearch");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return document matching the given source+slug.
 *
 * @example
 * http://localhost:1337/api/v1/items/:source/:slug
 *
 * @param {string} :source The item source.
 * @param {string} :slug The item slug to fetch.
 * @returns {Object} Result.
 */
router.get("/items/:source/:slug", async ctx => {
  const { source, slug } = ctx.params;

  const body = getItemBySlugBody({ source, slug });
  const response = await elasticsearchClient.search({ index, body });

  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `there is no items that match ${slug} in ${source}`);
  }

  const item = response.body.hits.hits[0];

  // Get current item title to find related items
  const { title } = item._source;
  const relatedItems = await getSearch({
    q: title,
    excludeSources: `${SOURCES.CDT}, ${SOURCES.THEMES}`
  });

  ctx.body = {
    ...item,
    relatedItems
  };
});

/**
 * Return document matching the given id.
 *
 * @example
 * http://localhost:1337/api/v1/items/:id
 *
 * @param {string} :id The item id.
 * @returns {Object} Result.
 */
router.get("/items/:id", async ctx => {
  const { id } = ctx.params;

  const response = await elasticsearchClient.get({
    index: index,
    type: "_doc",
    id
  });
  ctx.body = response.body;
});

module.exports = router;
