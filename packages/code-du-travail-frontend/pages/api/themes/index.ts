import { NextApiRequest, NextApiResponse } from "next";
import { ThemesController, runMiddleware } from "../../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("API Themes", req.method);
  await runMiddleware(req, res);
  console.log("API Themes 2 ", req.method);
  const controller = new ThemesController(req, res);
  if (req.method === "GET") {
    console.log("API Themes 3 ", req.method);
    controller.get();
  }
}
