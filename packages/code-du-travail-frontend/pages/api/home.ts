import { NextApiRequest, NextApiResponse } from "next";
import { HomeController } from "../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new HomeController(req, res);
  if (req.method === "GET") {
    const data = controller.get();
    res.status(200).json(data);
  }
}
