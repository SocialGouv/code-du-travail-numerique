import { DOCUMENTS } from "@socialgouv/cdtn-elasticsearch";
import Router from "koa-router";

import elasticsearchClient from "../../conf/elasticsearch";
import type { Agreement } from "../enterprises/types";
import type { SearchResponse } from "../type";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";
import {
  getAgreementBySlugBody,
  getAllAgreementsWithContributions,
} from "./getAgreements.elastic";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX ?? "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

const router = new Router({ prefix: API_BASE_URL });

const orderByAlphaAndMetalurgieLast = (a, b) => {
  if (a.url && !b.url) {
    return -1;
  }
  if (!a.url && b.url) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }

  return 0;
};

/**
 * Return alist of all the convention collective
 *
 * @example
 * http://localhost:1337/api/v1/conventions
 *
 * @returns {Array} all the conventions.
 */
router.get("/conventions/with-contributions", async (ctx) => {
  const body = getAllAgreementsWithContributions();
  const response = await elasticsearchClient.search<SearchResponse<Agreement>>({
    body,
    index,
  });

  ctx.body = response.body.hits.hits
    .map(({ _source }) => _source)
    .sort(orderByAlphaAndMetalurgieLast);
});

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
router.get("/conventions/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const body = getAgreementBySlugBody(slug);
  const response = await elasticsearchClient.search({ body, index });
  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `agreement not found, no agreement match ${slug}`);
  }

  ctx.body = { ...response.body.hits.hits[0]._source };
});

export default router;
