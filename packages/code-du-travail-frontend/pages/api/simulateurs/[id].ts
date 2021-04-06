import modeles from "@socialgouv/modeles-social";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  switch (id) {
    case "preavis-retraite":
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(modeles, undefined, 2));
      return;
    default:
      res.status(404).json({ message: "ressource not found" });
  }
};
