import { NextApiRequest, NextApiResponse } from "next";
import { HomeController, runMiddleware } from "../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
  const controller = new HomeController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
