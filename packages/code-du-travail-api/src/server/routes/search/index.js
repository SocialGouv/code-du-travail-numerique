const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
const getSearch = require("./getSearch");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const getRelatedThemesBody = require("./searchRelatedThemes.elastic");
const getRelatedArticlesBody = require("./searchRelatedArticles.elastic");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const router = new Router({ prefix: API_BASE_URL });

/**
 */
/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/search?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @param {string} querystring.excludeSources A `excludeSources` querystring param containing the sources (comma separatied list) to exclude from the results
 * @param {string} querystring.skipSavedResults A `skipSavedResults` querystring param indicates that we skip the savedResults search
 * @returns {Object} Results.
 */
router.get("/search", async ctx => {
  const documents = await getSearch(ctx.request.query);
  const searchThemeBody = getRelatedThemesBody(ctx.request.query.q);
  const searchCDTBody = getRelatedArticlesBody(ctx.request.query.q);
  const themeResponse = await elasticsearchClient.search({
    index,
    body: searchThemeBody
  });
  const cdtResponse = await elasticsearchClient.search({
    index,
    body: searchCDTBody
  });
  ctx.body = {
    documents: documents,
    articles: cdtResponse.body.hits.hits.map(({ _source }) => _source),
    themes: themeResponse.body.hits.hits.map(({ _source }) => _source)
  };
});

module.exports = router;
