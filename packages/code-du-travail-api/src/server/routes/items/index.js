import elasticsearchClient from "../../conf/elasticsearch.js";

const Router = require("koa-router");
const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");

const { API_BASE_URL, CDTN_ADMIN_VERSION } = require("../v1.prefix");
const getItemBySlugBody = require("./searchBySourceSlug.elastic");
const getDocumentByUrlBody = require("./searchByUrl.elastic");
const { getRelatedItems } = require("./getRelatedItems");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

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
router.get("/items/:source/:slug", async (ctx) => {
  const { source, slug } = ctx.params;
  const body = getItemBySlugBody({ slug, source }, true);
  const response = await elasticsearchClient.search({ body, index });

  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `there is no documents that match ${slug} in ${source}`);
  }

  const item = response.body.hits.hits[0];

  const {
    _id,
    _source: { title, covisits },
  } = item;

  const relatedItems = await getRelatedItems({
    covisits,
    settings: [{ _id }],
    slug,
    title,
  });

  delete item._source.title_vector;
  delete item._source.covisits;

  ctx.body = {
    ...item,
    relatedItems,
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
router.get("/items/:id", async (ctx) => {
  const { id } = ctx.params;

  const response = await elasticsearchClient.get({
    id,
    index: index,
    type: "_doc",
  });
  delete response.body._source.title_vector;
  ctx.body = { ...response.body };
});

/**
 * Return document matching the given url.
 *
 * @example
 * http://localhost:1337/api/v1/items?url=:url
 *
 * @param {string} :url The item url.
 * @returns {Object} Result.
 */
router.get("/items", async (ctx) => {
  const { url } = ctx.query;
  const body = getDocumentByUrlBody({ url });
  const response = await elasticsearchClient.search({ body, index });

  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `there is no document that match ${url}`);
  }

  const [item] = response.body.hits.hits;
  delete item.title_vector;
  ctx.body = { ...item };
});

export default router;
