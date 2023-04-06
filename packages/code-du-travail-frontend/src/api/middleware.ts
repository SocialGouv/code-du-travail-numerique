import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { IS_PROD } from "../config";

const cors = Cors({ origin: IS_PROD ? false : "*" });

export function runMiddleware(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
