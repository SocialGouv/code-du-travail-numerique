import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../utils";
import { getIdccByQuery } from "./service";

export class IdccController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      const { q } = this.req.query;
      const response = await getIdccByQuery(q as string);
      this.res.status(200).json(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.res.status(404).json({ message: "No idcc has been counted" });
      } else {
        this.res.status(500).json({
          message: "Error during fetching idcc",
        });
      }
    }
  }
}
