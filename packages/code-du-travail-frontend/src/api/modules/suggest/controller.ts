import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../utils";
import { getSuggestions } from "./service";

export class SuggestController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      let sizeNumber = 5;
      const { q, size } = this.req.query;

      if (size && typeof size === "string") {
        sizeNumber = parseInt(size);
      }

      const response = await getSuggestions(q as string, sizeNumber);
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
