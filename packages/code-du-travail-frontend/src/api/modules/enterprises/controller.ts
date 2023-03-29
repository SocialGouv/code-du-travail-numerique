import { NextApiRequest, NextApiResponse } from "next";
import { ENTERPRISE_API_URL } from "../../../config";
import {
  DEFAULT_ERROR_500_MESSAGE,
  InvalidQueryError,
  NotFoundError,
} from "../../utils";
import { populateAgreements } from "./service";
import { ApiEnterpriseData, EnterpriseApiResponse } from "./types";

export type GetEnterprises = ApiEnterpriseData;

export class EnterprisesController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      const query = this.req.query.q;
      const address = this.req.query.a;

      if (
        !query ||
        typeof query !== "string" ||
        (address && typeof address !== "string")
      ) {
        throw new InvalidQueryError({
          message: "Invalid query",
          name: "INVALID_QUERY",
          cause: { query, address },
        });
      }

      const url = this.makeSearchUrl(query, address ?? "");

      const fetchReq = await fetch(url, {
        headers: { referer: "cdtn-api" },
      });

      const jsonResponse: EnterpriseApiResponse = await fetchReq.json();

      const response = await populateAgreements(jsonResponse);

      this.res.status(200).json(response);
    } catch (error) {
      this.res.status(404).json({ message: "Not found" });
    }
  }

  private makeSearchUrl = (query: string, address: string) => {
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

    return `${
      ENTERPRISE_API_URL ??
      "https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1"
    }/search?${flattenParams}`;
  };
}
