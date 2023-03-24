import { NextApiRequest, NextApiResponse } from "next";
import { EnterprisesController } from "../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new EnterprisesController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
