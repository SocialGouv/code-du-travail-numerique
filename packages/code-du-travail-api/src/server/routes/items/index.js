const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getItemBySlugBody = require("./searchBySourceSlug.elastic");
const getRelatedDocumentBody = require("./relatedDocument.elastic");

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
  const results = await elasticsearchClient.search({ index, body });

  if (results.hits.total === 0) {
    ctx.throw(404, `there is no items that match ${slug} in ${source}`);
  }

  const item = results.hits.hits[0];
  const relatedItems =
    ctx.params.source === "faq" ? await searchItemsFromTheme(item) : {};

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

  ctx.body = await elasticsearchClient.get({
    index: index,
    type: index,
    id
  });
});

/**
 * Return documents matching item themes, grouped by source.
 *
 * @param {object} :item The item
 * @returns {Object} Result: documents that match item's themes, group by source.
 */
async function searchItemsFromTheme(item) {
  const themes = (item._source.tags || [])
    .filter(tag => tag.match(/^themes/))
    .map(theme => theme.split(":")[1]);

  if (themes.length === 0) {
    return {};
  }

  const body = getRelatedDocumentBody({ themes, id: item._id });
  const results = await elasticsearchClient.search({ index, body });

  if (results.aggregations.bySource.buckets.length === 0) {
    return {};
  }

  const { buckets } = results.aggregations.bySource;

  return buckets.reduce(
    (state, bucket) =>
      bucket.doc_count > 0
        ? { ...state, [bucket.key]: bucket.bySource.hits.hits }
        : state,
    {}
  );
}

module.exports = router;
