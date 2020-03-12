const Router = require("koa-router");
const highlightsData = require("@cdt/data...datafiller/highlights.data.json");

const API_BASE_URL = require("../v1.prefix");
const getEsReferences = require("../search/getEsReferences");

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the highlights that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/themes/:slug
 *
 * @returns {Object} An object containing the matching theme .
 */

router.get("/highlights/:slug", async ctx => {
  const { slug } = ctx.params;
  const highlights = highlightsData.find(
    collection => collection.title === slug
  );
  if (!highlights) {
    ctx.throw(
      404,
      `There is no highlights collection that match the title: "${slug}".`
    );
  }

  const refs = await getEsReferences(highlights.refs).then(references =>
    references.map(reference => reference._source)
  );

  ctx.body = [...refs];
});

module.exports = router;
