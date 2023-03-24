import { NextApiRequest, NextApiResponse } from "next";
import { ContributionsController } from "../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new ContributionsController(req, res);
  if (req.method === "GET" && req.query.type === "generic") {
    controller.getGenericContributions();
  }
}
