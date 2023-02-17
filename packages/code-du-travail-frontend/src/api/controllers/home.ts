import { NextApiRequest, NextApiResponse } from "next";

export class HomeController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public get() {
    this.res.status(200).json({ voiture: "BMW" });
  }
}
