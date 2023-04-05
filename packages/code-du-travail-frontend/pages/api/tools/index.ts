import { NextApiRequest, NextApiResponse } from "next";
import { ToolsController } from "../../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new ToolsController(req, res);
  if (req.method === "GET") {
    controller.get();
  }
}
