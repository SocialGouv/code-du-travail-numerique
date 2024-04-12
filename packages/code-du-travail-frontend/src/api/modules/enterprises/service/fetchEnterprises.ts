import { ENTERPRISE_API_URL } from "../../../../config";
import { Enterprise } from "../types";

export type Convention = {
  idcc: number;
  shortTitle: string;
  id: string;
  title: string;
  url?: string;
};

export type EnterpriseApiResponse = {
  entreprises?: (Omit<Enterprise, "conventions"> & {
    conventions: Convention[];
  })[];
};

export const fetchEnterprises = async (
  query: string,
  address: string | undefined
): Promise<EnterpriseApiResponse> => {
  const params: { k: string; v: string }[] = [
    { k: "ranked", v: "true" },
    { k: "query", v: encodeURIComponent(query) },
    { k: "convention", v: "false" },
    { k: "open", v: "true" },
    { k: "matchingLimit", v: "0" },
  ];
  if (address) {
    params.push({ k: "address", v: encodeURIComponent(address) });
  }

  const flattenParams = params
    .map(({ k, v }) => (k && v ? `${k}=${v}` : undefined))
    .filter((qp) => qp)
    .join("&");

  const url = `${ENTERPRISE_API_URL}/search?${flattenParams}`;

  const fetchReq = await fetch(url, {
    headers: { referer: "cdtn-api" },
  });

  const jsonResponse: EnterpriseApiResponse = await fetchReq.json();

  return jsonResponse;
};
