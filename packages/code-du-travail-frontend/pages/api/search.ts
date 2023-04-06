import { NextApiRequest, NextApiResponse } from "next";
import { SearchController, runMiddleware } from "../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
  const controller = new SearchController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
