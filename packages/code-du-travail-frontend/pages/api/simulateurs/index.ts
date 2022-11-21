import { externals as externalTools, internals as tools } from "@socialgouv/modeles-social";
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
      (tool) => tool.enable || !process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
    ),
    externalTools: externalTools.filter(
      (tools) => tools.title === "Mon compte formation"
    ),
  };
}
