const Router = require("koa-router");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");

const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const getHightlightsBody = require("./highlight.elastic");
const getEsReferences = require("../search/getEsReferences");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the highlights that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/highlights/:slug
 *
 * @returns {Object} An object containing the matching theme .
 */

router.get("/highlights/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const body = getHightlightsBody();

  const response = await elasticsearchClient.search({ body, index });

  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `there is no highlights data`);
  }
  const highlightsData = response.body.hits.hits[0]._source.data;
  const highlights = highlightsData.find(
    (collection) => collection.title === slug
  );
  if (!highlights) {
    ctx.throw(
      404,
      `There is no highlights collection that match the title: "${slug}".`
    );
  }

  const refs = await getEsReferences(highlights.refs).then((references) =>
    references.map((reference) => reference._source)
  );

  ctx.body = [...refs];
});

module.exports = router;
