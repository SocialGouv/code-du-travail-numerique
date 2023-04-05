import { NextApiRequest, NextApiResponse } from "next";
import { IdccController } from "../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new IdccController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
