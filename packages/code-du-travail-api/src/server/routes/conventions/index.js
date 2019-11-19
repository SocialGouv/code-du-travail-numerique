const Router = require("koa-router");
const { AGREEMENTS } = require("@cdt/data/indexing/esIndexName");

const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${AGREEMENTS}`;

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the convention collective data that matches the given idcc and type
 *
 * @example
 * http://localhost:1337/api/v1/conventions/200/base
 *
 * @param {string} :idcc the IDCC number
 * @param {string} :type the type of texte requested (either none or "base", "attache", "salaire")
 * @returns {Object} some convention data.
 */
router.get("/conventions/:id/:type*", async ctx => {
  const { id, type = "base" } = ctx.params;

  const body = {
    size: 1,
    query: {
      bool: {
        must: [{ match: { conventionId: id } }],
        filter: [{ term: { type } }]
      }
    }
  };

  const response = await elasticsearchClient.search({ index, body });

  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `No document found for kali id ${id} and type ${type}`);
  }

  ctx.body = { ...response.body.hits.hits[0] };
});

module.exports = router;
