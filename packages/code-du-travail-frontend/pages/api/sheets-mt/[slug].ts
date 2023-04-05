import { NextApiRequest, NextApiResponse } from "next";
import { SheetsMtController } from "../../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new SheetsMtController(req, res);
  if (req.method === "GET") {
    controller.getBySlug();
  }
}
