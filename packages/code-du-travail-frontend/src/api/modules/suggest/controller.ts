import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError, DEFAULT_ERROR_500_MESSAGE } from "../../utils";
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
      let query = "";
      const { q, size } = this.req.query;
      if (q && typeof q === "string") {
        query = q;
      }

      if (!size) {
        sizeNumber = 5;
      }
      if (size && typeof size === "string") {
        sizeNumber = parseInt(size);
      }

      const response = await getSuggestions(query, sizeNumber);
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
