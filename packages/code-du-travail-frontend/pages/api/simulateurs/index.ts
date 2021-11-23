import externalTools from "@cdt/data...tools/externals.json";
import tools from "@cdt/data...tools/internals.json";
import { NextApiRequest, NextApiResponse } from "next";

interface Tools {
  cdtnSimulators: any;
  externalTools: any;
}

export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.json(getTools());
};

export function getTools(): Tools {
  throw new Error("API throw error test");
}
