import { NextApiRequest, NextApiResponse } from "next";
import { IdccController, runMiddleware } from "../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res);
  const controller = new IdccController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
