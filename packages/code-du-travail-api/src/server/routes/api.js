const Router = require("koa-router");

const codeDuTravailNumerique = require("../data_sources/code_du_travail_numerique.js");
const { logger } = require("../utils/logger");

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
  try {
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

    ctx.body = await codeDuTravailNumerique.search({ query, mustNot });
  } catch (error) {
    logger.error(error);
  }
});

router.get(`${BASE_URL}/suggest`, async ctx => {
  try {
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
  } catch (error) {
    logger.error(error);
  }
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
  try {
    ctx.body = await codeDuTravailNumerique.getSingleItem({
      source: ctx.params.source,
      slug: ctx.params.slug
    });
  } catch (error) {
    logger.error(error);
  }
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
  try {
    ctx.body = await codeDuTravailNumerique.getSingleItem({
      id: ctx.params.id
    });
  } catch (error) {
    logger.error(error);
  }
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
  try {
    ctx.body = await codeDuTravailNumerique.getDocsCount();
  } catch (error) {
    logger.error(error);
  }
});

router.get(`${BASE_URL}/idcc`, async ctx => {
  try {
    const query = ctx.request.query.q;
    const must = [
      {
        match: {
          ape: {
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
            query: query,
            boost: 2000
          }
        }
      },
      {
        match: {
          ape: {
            query: query,
            boost: 3000
          }
        }
      }
    ];
    const fieldHightlight = { ape: {} };
    ctx.body = await codeDuTravailNumerique.search({
      query,
      must,
      filter,
      should,
      fieldHightlight,
      fragmentSize: 200,
      size: 1000,
      _source: ["title", "url", "ape", "idcc"]
    });
  } catch (error) {
    logger.error(error);
  }
});

module.exports = router;
module.exports.BASE_URL = BASE_URL;
