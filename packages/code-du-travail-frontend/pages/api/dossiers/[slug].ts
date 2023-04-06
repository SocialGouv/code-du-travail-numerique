import { NextApiRequest, NextApiResponse } from "next";
import { DossiersController } from "../../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new DossiersController(req, res);
  if (req.method === "GET") {
    controller.getBySlug();
  }
}
