import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware, SitemapController } from "../../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
  const controller = new SitemapController(req, res);
  if (req.method === "GET") {
    controller.getAllContributionsMatchingSlug();
  }
}
