import { NextApiRequest, NextApiResponse } from "next";
import { AgreementsController } from "../../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new AgreementsController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
