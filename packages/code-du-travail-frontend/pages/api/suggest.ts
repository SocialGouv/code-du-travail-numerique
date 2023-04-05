import { NextApiRequest, NextApiResponse } from "next";
import { SuggestController } from "../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new SuggestController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
