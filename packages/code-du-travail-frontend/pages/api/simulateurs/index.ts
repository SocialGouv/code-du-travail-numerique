import {
  externals as externalTools,
  internals as tools,
} from "@socialgouv/modeles-social";
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

// {
//   "title": "Mon compte formation",
//   "description": "Consultez en ligne vos droits à la formation, cherchez et réservez une formation",
//   "url": "https://www.moncompteformation.gouv.fr",
//   "icon": "Formation",
//   "action": "Consulter",
//   "id": "30b4832d-7584-44de-9b93-2ae5ce9dc57c"
// }
