import { NextApiRequest, NextApiResponse } from "next";
import { ThemesController } from "../../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new ThemesController(req, res);
  if (req.method === "GET") {
    controller.getBySlug();
  }
}
