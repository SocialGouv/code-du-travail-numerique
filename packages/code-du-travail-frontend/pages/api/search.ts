import { NextApiRequest, NextApiResponse } from "next";
import { SearchController } from "../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new SearchController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
