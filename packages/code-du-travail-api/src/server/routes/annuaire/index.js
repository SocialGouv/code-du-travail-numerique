const Router = require("koa-router");
const fetch = require("node-fetch").default;
const API_BASE_URL = require("../api").BASE_URL;

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getAnnuaireBody = require("./annuaire.elastic");

const router = new Router({ prefix: API_BASE_URL });
const index = process.env.ELASTICSEARCH_ANNUAIRE_INDEX || "cdtn_annuaire";
const routeName = "/annuaire";

// todo @lionelb move to constant file
const defaultMaxSearchDistance = "30km";
const adresseApiEndPoint = "https://api-adresse.data.gouv.fr/search";

/**
 * Return annaire items matching the given address
 * adress could be a coord or a string.
 *
 * @example
 * http://localhost:1337/api/v1/annuaire/search?coord=lon:lat
 * http://localhost:1337/api/v1/annuaire/search?q=address to search
 *
 * @param {string} :base coord or address for geo search
 * @returns {Object} Result.
 */
router.get(`${routeName}/search`, async ctx => {
  const { coord, q } = ctx.request.query;
  const results =
    searchFromCoord(coord) || (await searchFromQuery(adresseApiEndPoint, q));
  if (results) {
    const [lon, lat] = results;
    const body = getAnnuaireBody({
      distance: defaultMaxSearchDistance,
      coord: { lon, lat }
    });
    ctx.body = await elasticsearchClient.search({
      index,
      body
    });
  } else {
    ctx.body = { total: 0, hits: { hits: [] } };
  }
});

function searchFromCoord(coord) {
  if (!coord) {
    return false;
  }
  return coord.split(":");
}

async function searchFromQuery(endpoint, query) {
  if (!query) {
    return false;
  }
  const response = await fetch(
    `${endpoint}/?q=${query}&type=housenumber&limit=1`
  );
  const results = await response.json();
  if (results.features.length === 0) {
    return false;
  }
  return results.features[0].geometry.coordinates;
}

module.exports = router;
