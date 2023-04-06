import { NextApiRequest, NextApiResponse } from "next";
import { ItemsController, runMiddleware } from "../../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
  const controller = new ItemsController(req, res);
  if (req.method === "GET") {
    controller.getAll();
  }
}
