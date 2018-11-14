const Router = require("koa-router");
const fetch = require("node-fetch");

const codeDuTravailNumerique = require("../data_sources/code_du_travail_numerique.js");
const cdtnAnnuaire = require("../data_sources/cdtn_annuaire.js");

const router = new Router();
const BASE_URL = `/api/v1`;

/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/search?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @returns {Object} Results.
 */
router.get(`${BASE_URL}/search`, async ctx => {
  let query = ctx.request.query.q;
  let excludeSources = ctx.request.query.excludeSources;
  let mustNot = [];
  if (excludeSources) {
    mustNot = excludeSources.split(",").map(source => ({
      query_string: {
        default_field: "source",
        query: source.trim()
      }
    }));
  }

  ctx.body = await codeDuTravailNumerique.search({
    query,
    mustNot,
    _source: ["title", "source", "slug", "anchor"]
  });
});

router.get(`${BASE_URL}/suggest`, async ctx => {
  let query = ctx.request.query.q;

  let excludeSources = ctx.request.query.excludeSources;
  let mustNot = [];
  if (excludeSources) {
    mustNot = excludeSources.split(",").map(source => ({
      query_string: {
        default_field: "source",
        query: source.trim()
      }
    }));
  }

  ctx.body = await codeDuTravailNumerique.search({
    query,
    mustNot,
    fragmentSize: 200,
    size: 5,
    _source: ["title", "source", "slug", "anchor"]
  });
});

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
  ctx.body = await codeDuTravailNumerique.getSingleItem({
    source: ctx.params.source,
    slug: ctx.params.slug,
    _source: [
      "title",
      "url",
      "html",
      "date_debut", // code-du-travail
      "date",
      "path", // code-du-travail
      "id", // idcc, kali
      "description", // modele de courrier
      "filename", // filename
      "author" // faq
    ]
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

router.get(`${BASE_URL}/idcc`, async ctx => {
  const query = ctx.request.query.q;
  const must = [
    {
      match: {
        ape: {
          query
        }
      }
    },
    {
      match_phrase_prefix: {
        title: {
          query
        }
      }
    }
  ];
  const filter = [
    {
      term: {
        source: "kali"
      }
    }
  ];
  const should = [
    {
      match: {
        idcc: {
          query: parseInt(query, 10) || "",
          boost: 2000
        }
      }
    },
    {
      match: {
        title: {
          query: query,
          boost: 2000
        }
      }
    }
  ];

  ctx.body = await codeDuTravailNumerique.search({
    query,
    must,
    filter,
    should,
    fragmentSize: 200,
    size: 1000,
    _source: ["title", "url", "ape", "idcc"]
  });
});

/**
 * Return annaire items matching the given departement.
 *
 * @example
 * http://localhost:1337/api/v1/items/:id
 *
 * @param {string} :id The item ID to fetch.
 * @returns {Object} Result.
 */
router.get(`${BASE_URL}/annuaire/search`, async ctx => {
  let lon, lat;
  let coordData = ctx.request.query.coord;
  if (coordData) {
    [lon, lat] = ctx.request.query.coord.split(":");
  } else {
    const address = ctx.request.query.q;
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${address}&type=housenumber&limit=1`
    );
    const results = await response.json();

    [lon, lat] = results.features[0].geometry.coordinates;
  }

  ctx.body = await cdtnAnnuaire.getItemsBydistance({
    coord: { lon, lat }
  });
});

module.exports = router;
module.exports.BASE_URL = BASE_URL;
