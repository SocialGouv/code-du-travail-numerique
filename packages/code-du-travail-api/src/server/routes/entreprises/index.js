const Router = require("koa-router");

const {
  entrepriseSearchBody,
  mapHit,
  // entrepriseAddressSearchBody,
} = require("./searchEntreprise");
const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");

const index = "cdtn-siren";

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the enterprises that match the search query
 *
 * @example
 * http://localhost:1337/api/v1/entreprises/
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @param {string} querystring.a A `a` querystring param containing a specific postal code or city name to help the search process
 * @param {string} querystring.cc A `q` querystring param containing a boolean to return attach every convention associated to the main company
 * @returns {Object} enterprise search results
 */
router.get("/entreprises", async (ctx) => {
  const { q: query, a: address, cc: withAllConventions } = ctx.query;

  if (!query) {
    ctx.throw(400, `query parameter q is required`);
  }

  const body = entrepriseSearchBody(
    query,
    address,
    withAllConventions ? withAllConventions === "false" : true
  );

  // console.log(JSON.stringify(body, null, 2));

  const response = await elasticsearchClient.search({ body, index });

  // console.log(JSON.stringify(response, null, 2));

  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `enterprises not found, no entreprise matching ${query}`);
  }

  ctx.body = { entreprises: response.body.hits.hits.map(mapHit) };
});

module.exports = router;
