import { NextApiRequest, NextApiResponse } from "next";
import { GlossaryController } from "../../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new GlossaryController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
