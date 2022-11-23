import type { Context } from "koa";
import type { Response } from "node-fetch";
import fetch from "node-fetch";

import elasticsearchClient from "../../elasticsearch";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";

import Router from "koa-router";

const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");
const docsCountBody = require("../docs-count/docCount.elastic");

const router = new Router({ prefix: API_BASE_URL });

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX ?? "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

const MATOMO_SITE_ID = process.env.PIWIK_SITE_ID ?? "3";
const MATOMO_URL =
  process.env.PIWIK_URL ?? "https://matomo.fabrique.social.gouv.fr";

router.get("/stats", async (ctx: Context) => {
  if (!MATOMO_SITE_ID && !MATOMO_URL) {
    ctx.throw(500, `There is no matomo`);
    return;
  }

  const {
    body: { aggregations },
  } = await elasticsearchClient.search({ body: docsCountBody, index });
  let nbDocuments = 0;
  const { buckets = [] } = aggregations.sources;
  for (const { doc_count } of buckets) {
    nbDocuments += doc_count;
  }

  const URLS = [
    `${MATOMO_URL}/?module=API&method=VisitsSummary.getVisits&idSite=${MATOMO_SITE_ID}&format=JSON&period=range&date=2020-01-01,today`,
    `${MATOMO_URL}/?module=API&method=Actions.get&idSite=${MATOMO_SITE_ID}&format=JSON&period=range&date=2020-01-01,today`,
  ];
  const promises: Promise<any>[] = URLS.map(async (url) =>
    fetch(url)
      .then(async (data: Response) => data.json())
      .catch((e: Error) => {
        console.error(e);
        return null;
      })
  );
  const [nbVisitData, infoData] = await Promise.all(promises);

  if (!nbVisitData && !infoData) {
    ctx.status = 502;
    ctx.body = {};
  } else {
    ctx.body = {
      nbDocuments,
      nbPageViews: infoData.nb_pageviews,
      nbSearches: infoData.nb_searches,
      nbVisits: nbVisitData.value,
    };
  }
});

export default router;
