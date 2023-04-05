import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { IS_PROD } from "../config";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["GET"],
});

export function runMiddleware(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    if (IS_PROD) {
      cors(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }

        return resolve(result);
      });
    }
  });
}
