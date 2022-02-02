import { DOCUMENTS } from "@socialgouv/cdtn-elasticsearch";
import Router from "koa-router";
import fetch from "node-fetch";

import elasticsearchClient from "../../conf/elasticsearch";
import type { SearchResponse } from "../type";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";
import type { Agreement } from "./enterprises.elastic";
import getAgreements from "./enterprises.elastic";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX ?? "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

const router = new Router({ prefix: API_BASE_URL });
const ENTERPRISE_API_URL =
  "https://search-recherche-entreprises.fabrique.social.gouv.fr/api/v1";

interface EnterpriseApiResponse {
  entreprises?: {
    conventions: {
      idcc: number;
    }[];
  }[];
}

const populateAgreements = async (
  enterpriseApiResponse: EnterpriseApiResponse
): Promise<unknown> => {
  const idccList: number[] =
    enterpriseApiResponse.entreprises?.flatMap((enterprise) =>
      enterprise.conventions.flatMap((convention) => convention.idcc)
    ) ?? [];

  if (idccList.length > 0) {
    const body = getAgreements(idccList);
    const response = await elasticsearchClient.search<
      SearchResponse<Agreement>
    >({ body, index });

    if (response.body.hits.total.value > 0) {
      const ccnList = response.body.hits.hits.reduce(
        (acc: Record<number, { slug: string }>, curr) => {
          acc[curr._source.num] = { slug: curr._source.slug };
          return acc;
        },
        {}
      );
      return {
        ...enterpriseApiResponse,
        entreprises: enterpriseApiResponse.entreprises?.map((enterprise) => ({
          ...enterprise,
          conventions: enterprise.conventions.map((convention) => ({
            ...convention,
            ...ccnList[convention.idcc],
          })),
        })),
      };
    }
  }
  return enterpriseApiResponse;
};

const makeSearchUrl = (query: string, address: string) => {
  const params: { k: string; v: string }[] = [
    { k: "ranked", v: "true" },
    { k: "query", v: encodeURIComponent(query) },
    { k: "address", v: encodeURIComponent(address) },
    { k: "convention", v: "true" },
    { k: "employer", v: "true" },
    { k: "open", v: "true" },
    { k: "matchingLimit", v: "0" },
  ];

  const flattenParams = params
    .map(({ k, v }) => (k && v ? `${k}=${v}` : undefined))
    .filter((qp) => qp)
    .join("&");

  return `${ENTERPRISE_API_URL}/search?${flattenParams}`;
};

router.get("/enterprises", async (ctx: any) => {
  if (
    !ctx.request.query.q ||
    typeof ctx.request.query.q !== "string" ||
    (ctx.request.query.a && typeof ctx.request.query.a !== "string")
  ) {
    ctx.status = 400;
    return;
  }
  const query: string = ctx.request.query.q;
  const address: string = ctx.request.query.a || "";
  if (query) {
    const url = makeSearchUrl(query, address);

    const response = await fetch(url);

    if (response.status === 200) {
      const jsonResponse: EnterpriseApiResponse = await response.json();
      ctx.body = await populateAgreements(jsonResponse);
    } else {
      ctx.status = response.status;
      ctx.body = response.body;
    }
  }
});

export default router;
