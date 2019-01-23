const Router = require("koa-router");
const fetch = require("node-fetch").default;

const codeDuTravailNumerique = require("../data_sources/code_du_travail_numerique.js");
const cdtnAnnuaire = require("../data_sources/cdtn_annuaire.js");
const adresseApiEndPoint = "https://api-adresse.data.gouv.fr/search";
const router = new Router();
const BASE_URL = `/api/v1`;

/**
 * Return document matching the given source+slug.
 *
 * @example
 * http://localhost:1337/api/v1/item/faq/:slug
 *
 * @param {string} :source The item source.
 * @param {string} :slug The item slug to fetch.
 * @returns {Object} Result.
 */
router.get(`${BASE_URL}/items/:source/:slug`, async ctx => {
  const item = await codeDuTravailNumerique.getSingleItem({
    source: ctx.params.source,
    slug: ctx.params.slug,
    _source: [
      "title",
      "url",
      "html",
      "slug", // outils
      "date_debut", // code-du-travail
      "date_fin", // code-du-travail
      "date",
      "slug", // outils
      "path", // code-du-travail
      "id", // idcc, kali
      "tags", // code-du-travail
      "description", // modele de courrier
      "filename", // filename
      "author" // faq
    ]
  });

  const relatedItems =
    ctx.params.source === "faq" ? await searchItemFromTheme(item) : {};

  ctx.body = {
    ...item,
    relatedItems
  };
});

async function searchItemFromTheme(item) {
  const themes = (item._source.tags || [])
    .filter(tag => tag.match(/^themes/))
    .map(theme => theme.split(":")[1]);

  const results = await codeDuTravailNumerique.searchRelatedDocument(
    themes,
    item._id
  );
  if (results.aggregations.bySource.buckets.length === 0) {
    return {};
  }

  const { buckets } = results.aggregations.bySource;

  return buckets.reduce((state, bucket) => {
    if (bucket.doc_count > 0) {
      state[bucket.key] = bucket.bySource.hits.hits;
    }
    return state;
  }, {});
}
/**
 * Return document matching the given ID.
 *
 * @example
 * http://localhost:1337/api/v1/items/:id
 *
 * @param {string} :id The item ID to fetch.
 * @returns {Object} Result.
 */
router.get(`${BASE_URL}/items/:id`, async ctx => {
  ctx.body = await codeDuTravailNumerique.getSingleItem({
    id: ctx.params.id
  });
});

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
