import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_ERROR_500_MESSAGE, NotFoundError } from "../../utils";
import { getGenericContributionsGroupByThemes } from "../contributions";

export class ContributionsController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async getGenericContributions() {
    try {
      const response = await getGenericContributionsGroupByThemes();
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
