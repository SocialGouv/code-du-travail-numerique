import { NextApiRequest, NextApiResponse } from "next";
import { ModelesController } from "../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new ModelesController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
