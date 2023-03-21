import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../utils";
import { getDocsCount } from "./service";

export type GetDocsCount = any;

export class DocsCountController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      const docsCounts = await getDocsCount();
      const response: GetDocsCount = docsCounts;
      this.res.status(200).json(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.res.status(404).json({ message: "No docs has been counted" });
      } else {
        this.res.status(500).json({
          message: "Error during getting fetching the number of docs",
        });
      }
    }
  }
}
