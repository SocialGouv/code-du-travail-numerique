import externalTools from "@cdt/data...tools/externals.json";
import tools from "@cdt/data...tools/internals.json";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.json(getTools());
};

export function getTools() {
  return {
    cdtnSimulators: tools.filter(
      (tool) => tool.enable || process.env.IS_PRODUCTION_DEPLOYMENT !== "true"
    ),
    externalTools: externalTools.filter(
      (tools) => tools.title === "Mon compte formation"
    ),
  };
}
