import elasticsearchClient from "../../elasticsearch";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";

import Router from "koa-router";
const { SUGGESTIONS } = require("@socialgouv/cdtn-elasticsearch");
const { getSuggestQuery } = require("./suggest.elastic.js");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${SUGGESTIONS}`;

const router = new Router({ prefix: API_BASE_URL });

const minQueryLength = 2;
const suggestionsSize = 5;

/**
 * Return the search suggestion
 *
 * @example
 * http://localhost:1337/api/v1/suggest?q=aba
 *
 * @returns {Object} List of matching suggestions.
 */
router.get("/suggest", async (ctx) => {
  const { q = "", size = suggestionsSize } = ctx.request.query;

  if (q.length >= minQueryLength) {
    const body = getSuggestQuery(q, size);
    const response = await elasticsearchClient.search({
      body,
      index,
    });
    ctx.body = response.body.hits.hits.map((t) => t._source.title);
  } else {
    ctx.body = [];
  }
});

export default router;
