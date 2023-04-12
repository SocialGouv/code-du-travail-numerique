import { NextApiRequest, NextApiResponse } from "next";
import { GlossaryController, runMiddleware } from "../../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
  const controller = new GlossaryController(req, res);
  if (req.method === "GET") {
    controller.getBySlug();
  }
}
