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
  return {
    cdtnSimulators: tools.filter(
      (tool) => tool.enable || process.env.IS_PRODUCTION_DEPLOYMENT !== "true"
    ),
    externalTools: externalTools.filter(
      (tools) => tools.title === "Mon compte formation"
    ),
  };
}
