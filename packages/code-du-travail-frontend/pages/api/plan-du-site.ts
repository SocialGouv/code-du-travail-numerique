import { NextApiRequest, NextApiResponse } from "next";
import { SitemapController, runMiddleware } from "../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
  const controller = new SitemapController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
