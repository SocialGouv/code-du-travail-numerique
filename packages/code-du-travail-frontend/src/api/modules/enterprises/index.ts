import { DOCUMENTS } from "@socialgouv/cdtn-elasticsearch";
import Router from "koa-router";

import elasticsearchClient from "../../conf/elasticsearch";
import type { SearchResponse } from "../type";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";
import getAgreements from "./enterprises.elastic";
import type { Agreement, ApiEnterpriseData, Enterprise } from "./types";

const fetch = require("node-fetch-commonjs");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX ?? "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

const router = new Router({ prefix: API_BASE_URL });
const ENTERPRISE_API_URL =
  "https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1";

/**
 * Agreement type from @socialgouv/kali-data/data/index.json
 */
type Convention = {
  idcc: number;
  shortTitle: string;
  id: string;
  title: string;
  url?: string;
};

type EnterpriseApiResponse = {
  entreprises?: (Omit<Enterprise, "conventions"> & {
    conventions: Convention[];
  })[];
};

const toAgreement = (convention: Convention): Agreement => ({
  id: convention.id,
  num: convention.idcc,
  shortTitle: convention.shortTitle,
  title: convention.title,
  ...(convention.url ? { url: convention.url } : {}),
});

const populateAgreements = async (
  enterpriseApiResponse: EnterpriseApiResponse
): Promise<ApiEnterpriseData> => {
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
      const agreements = response.body.hits.hits.reduce(
        (acc: Record<number, Agreement>, curr) => {
          acc[curr._source.num] = curr._source;
          return acc;
        },
        {}
      );
      return {
        ...enterpriseApiResponse,
        entreprises: enterpriseApiResponse.entreprises?.map((enterprise) => ({
          ...enterprise,
          conventions: enterprise.conventions.map(
            (convention): Agreement =>
              agreements[convention.idcc] ?? toAgreement(convention)
          ),
        })),
      };
    }
  }
  return {
    ...enterpriseApiResponse,
    entreprises: enterpriseApiResponse.entreprises?.map((enterprise) => ({
      ...enterprise,
      conventions: enterprise.conventions.map(toAgreement),
    })),
  };
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

router.get("/enterprises", async (ctx) => {
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

    const response = await fetch(url, {
      headers: { referer: "cdtn-api" },
    });

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
