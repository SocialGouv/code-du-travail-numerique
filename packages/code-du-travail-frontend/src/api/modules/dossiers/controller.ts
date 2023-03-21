import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../utils";
import { getDossiers } from "./service";

export type GetDossiers = any;

export class DossiersController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      const slug = this.req.query.slug as string;
      const result = await getDossiers(slug);
      const response: GetDossiers = result;
      this.res.status(200).json(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.res
          .status(404)
          .json({ message: "No thematic files has been found" });
      } else {
        this.res.status(500).json({
          message: "Error during getting thematic files",
        });
      }
    }
  }
}
