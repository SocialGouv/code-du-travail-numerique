const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const { getRootToolsQuery, getToolQuery } = require("./search.elastic.js");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the root tools
 *
 * @example
 * http://localhost:1337/api/v1/tools
 *
 * @returns {Object} An object containing the tools.
 */
router.get("/tools", async ctx => {
  const body = getRootToolsQuery();
  const response = await elasticsearchClient.search({
    index,
    body
  });
  ctx.body = {
    children: response.body.hits.hits.map(t => t._source)
  };
});

/**
 * Return the tool that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/tools/:slug
 *
 * @returns {Object} An object containing the matching tool.
 */

router.get("/tools/:slug", async ctx => {
  const { slug } = ctx.params;
  const body = getToolQuery({ slug });
  const response = await elasticsearchClient.search({
    index,
    body
  });
  if (response.body.hits.hits.length === 0) {
    ctx.throw(404, `there is no tool that matches ${slug}`);
  }

  const tool = response.body.hits.hits[0];

  ctx.body = {
    ...tool._source
  };
});

module.exports = router;
