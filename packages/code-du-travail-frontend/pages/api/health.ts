import { NextApiRequest, NextApiResponse } from "next";
import { COMMIT, PACKAGE_VERSION } from "../../src/config";
import { runMiddleware } from "../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res);
  res.status(200).json({
    status: "up and running",
    version: PACKAGE_VERSION,
    commit: COMMIT,
  });
}
