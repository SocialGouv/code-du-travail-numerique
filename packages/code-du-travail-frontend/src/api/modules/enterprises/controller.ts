import { NextApiRequest, NextApiResponse } from "next";
import { InvalidQueryError } from "../../utils";
import { fetchEnterprises, populateAgreements } from "./service";
import { ApiEnterpriseData } from "./types";
import { ErrorResponse } from "../../types";

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
      const codePostal = this.req.query.cp;
      const codeCommune = this.req.query.cc;

      if (
        !query ||
        typeof query !== "string" ||
        (codePostal && typeof codePostal !== "string") ||
        (codeCommune && typeof codeCommune !== "string")
      ) {
        throw new InvalidQueryError({
          message: "Invalid query",
          name: "INVALID_QUERY",
          cause: { query, codeCommune, codePostal },
        });
      }

      const jsonResponse = await fetchEnterprises(
        query,
        codePostal,
        codeCommune
      );

      const response = await populateAgreements(jsonResponse);

      this.res.status(200).json(response);
    } catch (error) {
      this.res.status(404).json({ message: "Not found" });
    }
  }
}
