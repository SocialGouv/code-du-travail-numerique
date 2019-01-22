const Router = require("koa-router");

const codeDuTravailNumerique = require("../data_sources/code_du_travail_numerique.js");
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
  const size = Math.min(ctx.request.query.size || 10, 100);

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
    size,
    _source: ["title", "source", "slug", "anchor", "url"]
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
