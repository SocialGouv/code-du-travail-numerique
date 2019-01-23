const Router = require("koa-router");
const fetch = require("node-fetch").default;

const codeDuTravailNumerique = require("../data_sources/code_du_travail_numerique.js");
const cdtnAnnuaire = require("../data_sources/cdtn_annuaire.js");
const adresseApiEndPoint = "https://api-adresse.data.gouv.fr/search";
const router = new Router();
const BASE_URL = `/api/v1`;

/**
 * Return document matching the given ID.
 *
 * @example
 * http://localhost:1337/api/v1/items/:id
 *
 * @param {string} :id The item ID to fetch.
 * @returns {Object} Result.
 */
router.get(`${BASE_URL}/docsCount`, async ctx => {
  ctx.body = await codeDuTravailNumerique.getDocsCount();
});

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
router.get(`${BASE_URL}/annuaire/search`, async ctx => {
  const { coord, q } = ctx.request.query;
  const results = searchFromCoord(coord) || (await searchFromQuery(q));
  if (results) {
    const [lon, lat] = results;
    ctx.body = await cdtnAnnuaire.getItemsBydistance({
      coord: { lon, lat }
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

async function searchFromQuery(query) {
  if (!query) {
    return false;
  }
  const response = await fetch(
    `${adresseApiEndPoint}/?q=${query}&type=housenumber&limit=1`
  );
  const results = await response.json();
  if (results.features.length === 0) {
    return false;
  }
  return results.features[0].geometry.coordinates;
}

/**
 * Return the API version
 *
 * @example
 * http://localhost:1337/api/v1/version
 *
 * @returns {string} The current api version.
 */
router.get(`${BASE_URL}/version`, ctx => {
  ctx.body = { version: require("../../../package.json").version };
});

module.exports = router;
module.exports.BASE_URL = BASE_URL;
