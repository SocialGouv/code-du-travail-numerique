const Router = require("koa-router");
const fetch = require("node-fetch");

const codeDuTravailNumerique = require("../data_sources/code_du_travail_numerique.js");
const cdtnAnnuaire = require("../data_sources/cdtn_annuaire.js");
const adresseApiEndPoint = "https://api-adresse.data.gouv.fr/search";
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
  const item = await codeDuTravailNumerique.getSingleItem({
    source: ctx.params.source,
    slug: ctx.params.slug,
    _source: [
      "title",
      "url",
      "html",
      "date_debut", // code-du-travail
      "date_fin", // code-du-travail
      "date",
      "path", // code-du-travail
      "id", // idcc, kali
      "tags", // code-du-travail
      "description", // modele de courrier
      "filename", // filename
      "author" // faq
    ]
  });
  // console.log(items)

  let relatedItems = {};
  if (ctx.params.source === "faq") {
    const themes = (item._source.tags || [])
      .filter(tag => tag.match(/^themes/))
      .map(theme => theme.split(":")[1]);

    relatedItems = await getRelatedItems(themes);
  }

  ctx.body = {
    ...item,
    relatedItems
  };
});

/**
 * Return document matching the given ID.
 *
 * @example
 * http://localhost:1337/api/v1/items/themes?themes[]=id1&themes[]=id2
 *
 * @param {string} :id The item ID to fetch.
 * @returns {Object} Result.
 * @example
 *
 * {
 *   code_du_travail: [
 *    {
 *      _source: {
 *        source: {
 *          title: 'title',
 *          slug: 'slug',
 *          text: 'text',
 *           source: 'code_du_travail'
 *         }
 *       }
 *    }
 *   ],
 *   modele_de_courrier: [
 *    {
 *      _source: {
 *        source: {
 *          title: 'title',
 *          slug: 'slug',
 *          text: 'text',
 *           source: 'modele_de_courrier'
 *         }
 *       }
 *    }
 *   ],
 * }
 *
 */
router.get(`${BASE_URL}/themes/`, async ctx => {
  let { themes } = ctx.request.query;

  if (!themes.map) {
    themes = [themes];
  }

  ctx.body = await getRelatedItems(themes);
});

async function getRelatedItems(themes) {
  const results = await codeDuTravailNumerique.searchRelatedDocument(themes);
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

module.exports = router;
module.exports.BASE_URL = BASE_URL;
