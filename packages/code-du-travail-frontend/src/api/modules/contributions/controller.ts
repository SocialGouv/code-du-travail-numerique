import { ElasticSearchItem } from "@socialgouv/cdtn-utils";
import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_ERROR_500_MESSAGE, NotFoundError } from "../../utils";
import { getGenericContributions } from "../contributions";

export type GetGenericContributions = {
  contributions: ElasticSearchItem[];
};

export class ContributionsController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async getGenericContributions() {
    try {
      const contributions = await getGenericContributions();
      const response: GetGenericContributions = {
        contributions,
      };
      this.res.status(200).json(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.res.status(404).json({ message: error.message });
      } else {
        this.res.status(500).json({
          message: DEFAULT_ERROR_500_MESSAGE,
        });
      }
    }
  }
}
