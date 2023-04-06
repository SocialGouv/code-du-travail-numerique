import { NextApiRequest, NextApiResponse } from "next";
import { ContributionsController, runMiddleware } from "../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
  const controller = new ContributionsController(req, res);
  if (req.method === "GET") {
    controller.getGenericContributions();
  }
}
