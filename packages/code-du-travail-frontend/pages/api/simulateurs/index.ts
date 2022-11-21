import { NextApiRequest, NextApiResponse } from "next";
import { fetchTools } from "../../../src/outils";

interface Tools {
  cdtnSimulators: any;
  externalTools: any;
}

export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.json(getTools());
};

export async function getTools(): Promise<Tools> {
  const tools = await fetchTools({
    slugs: [
      "procedure-licenciement",
      "simulateur-embauche",
      "heure-recherche-emploi",
      "convention-collective",
      "preavis-retraite",
      "indemnite-licenciement",
      "preavis-demission",
      "indemnite-precarite",
      "preavis-licenciement",
    ],
  });

  return {
    cdtnSimulators: tools.filter(
      (tool) => tool.enable || !process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
    ),
    externalTools: [
      {
        title: "Mon compte formation",
        description:
          "Consultez en ligne vos droits à la formation, cherchez et réservez une formation",
        url: "https://www.moncompteformation.gouv.fr",
        icon: "Formation",
        action: "Consulter",
        id: "30b4832d-7584-44de-9b93-2ae5ce9dc57c",
      },
    ],
  };
}
