import { DOCUMENTS } from "@socialgouv/cdtn-elasticsearch";
import Router from "koa-router";

import elasticsearchClient from "../../conf/elasticsearch";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";
import { getAllContributions } from "./getContributions.elastic";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX ?? "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

const router = new Router({ prefix: API_BASE_URL });

const getBreadcrumbInFirstPosition = (a, b) =>
  a.position < b.position ? a : b;

const groupByThemes = (acc, item) => {
  if (item.theme in acc) acc[item.theme].push(item);
  else acc[item.theme] = [item];
  return acc;
};

/**
 * Return a list of all the generic contributions
 *
 * @example
 * http://localhost:1337/api/v1/contributions
 *
 * @returns {Array} all the generic contributions.
 */
router.get("/contributions", async (ctx) => {
  const body = getAllContributions();
  const response = await elasticsearchClient.search({
    body,
    index,
  });

  ctx.body = response.body.hits.hits
    .map(({ _source }) => _source)
    .map((contrib) => {
      const { breadcrumbs, ...contribWithTheme } = contrib;
      contribWithTheme.theme = breadcrumbs.reduce(
        getBreadcrumbInFirstPosition
      ).label;
      return contribWithTheme;
    })
    .reduce(groupByThemes, {});
});

export default router;
