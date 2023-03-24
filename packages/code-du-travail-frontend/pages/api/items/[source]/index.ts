import { NextApiRequest, NextApiResponse } from "next";
import { ItemsController } from "../../../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new ItemsController(req, res);
  if (req.method === "GET") {
    controller.getBySource();
  }
}
