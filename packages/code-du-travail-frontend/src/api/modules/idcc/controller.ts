import { NextApiRequest, NextApiResponse } from "next";
import {DEFAULT_ERROR_500_MESSAGE} from "../../utils";


// TODO NOT MERGING THIS !
export class IdccController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    console.error("I'm server side !");
    this.res.status(500).json({
      message: DEFAULT_ERROR_500_MESSAGE,
    });
    throw Error;
  }
}
