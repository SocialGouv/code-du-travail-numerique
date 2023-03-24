import { NextApiRequest, NextApiResponse } from "next";
import { StatsController } from "../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new StatsController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
