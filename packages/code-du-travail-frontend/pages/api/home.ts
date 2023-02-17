import { NextApiRequest, NextApiResponse } from "next";
import { HomeController } from "../../src/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const controller = new HomeController();
    const data = controller.get();
    res.status(200).json(data);
  }
}
