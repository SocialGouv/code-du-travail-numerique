import { DOCUMENTS } from "@socialgouv/cdtn-elasticsearch";
import Router from "koa-router";
import fetch from "node-fetch";

import elasticsearchClient from "../../conf/elasticsearch.js";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";
import getAgreementsHighlight from "./enterprises.elastic";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

const router = new Router({ prefix: API_BASE_URL });
const ENTERPRISE_API_URL =
  "https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1";

const populateAgreements = async (
  enterpriseApiResponse: unknown
): Promise<unknown> => {
  if ((enterpriseApiResponse.entreprises?.length ?? 0) === 0) {
    return enterpriseApiResponse;
  }
  const idccList: number[] = enterpriseApiResponse.entreprises.flatMap(
    (enterprise) =>
      enterprise.conventions.flatMap((convention) => convention.idcc)
  );

  if (idccList.length > 0) {
    const body = getAgreementsHighlight(idccList);
    const response = await elasticsearchClient.search({ body, index });

    if (response.body.hits.total.value > 0) {
      const ccnListWithHighlight = response.body.hits.hits.reduce(
        (acc, curr) => {
          acc[curr._source.num] = { highlight: curr._source.highlight };
          return acc;
        },
        {}
      );
      return {
        ...enterpriseApiResponse,
        entreprises: enterpriseApiResponse.entreprises.map((enterprise) => ({
          ...enterprise,
          conventions: enterprise.conventions.map((convention) => ({
            ...convention,
            ...(ccnListWithHighlight[convention.idcc] ?? {}),
          })),
        })),
      };
    }

    return enterpriseApiResponse;
  }
};

router.get("/enterprises", async (ctx) => {
  const query = ctx.request.query.q;
  const address = ctx.request.query.a;
  if (
    !query ||
    typeof query !== "string" ||
    (address && typeof address !== "string")
  ) {
    ctx.status = 400;
    return;
  }
  if (query) {
    const url = `${ENTERPRISE_API_URL}/search?q=${encodeURIComponent(query)}${
      address ? `&a=${encodeURIComponent(address)}` : ""
    }&onlyWithConvention=true`;

    const response = await fetch(url);

    if (response.status === 200) {
      const jsonResponse = await response.json();
      ctx.body = await populateAgreements(jsonResponse);
    } else {
      ctx.status = response.status;
      ctx.body = response.body;
    }
  }
});

export default router;
