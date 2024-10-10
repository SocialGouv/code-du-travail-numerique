import { NextApiRequest, NextApiResponse } from "next";
import { InvalidQueryError } from "../../utils";
import { fetchEnterprises, populateAgreements } from "./service";
import { ApiEnterpriseData } from "./types";
import { ErrorResponse } from "../../types";
import { captureException } from "@sentry/nextjs";

export class EnterprisesController {
  private req: NextApiRequest;
  private res: NextApiResponse<ApiEnterpriseData | ErrorResponse>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      const query = this.req.query.q;
      const postCode = this.req.query.cp;

      if (
        !query ||
        typeof query !== "string" ||
        (postCode && typeof postCode !== "string")
      ) {
        throw new InvalidQueryError({
          message: "Invalid query",
          name: "INVALID_QUERY",
          cause: { query, postCode },
        });
      }

      const postCodeArray = postCode ? postCode.split(",") : [];

      const jsonResponse = await fetchEnterprises(query, postCodeArray);

      const response = await populateAgreements(jsonResponse);
      this.res.status(200).json(response);
    } catch (error) {
      console.error(error);
      captureException(error);
      this.res.status(500).json({ message: error.toString() });
    }
  }
}
