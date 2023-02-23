import { ElasticSearchItem } from "cdtn-types";
import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../utils";
import { getByIdsAgreements } from "../agreements";
import { getByIdsContributions } from "../contributions";
import { getBySlugHighlights } from "../highlights";
import { getByIdsModeles } from "../modeles";
import { getAllThemes } from "../themes";
import { getToolsByIds } from "../tools";

export type GetHomePage = {
  themes: any;
  highlights: any;
  tools: any;
  modeles: ElasticSearchItem[];
  contributions: ElasticSearchItem[];
  agreements: ElasticSearchItem[];
};

export class HomeController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      const themes = await getAllThemes();
      const highlights = await getBySlugHighlights("homepage");
      const tools = await getToolsByIds([
        "d7ad36850a", // simulateur-embauche
        "d8a3605790", // indemnité-licenciement
        "1eea193273", // preavis-demission
        "db8ffe3574", // convention-collective
      ]);
      const modeles = await getByIdsModeles([
        "72bd2d0080", // rupture-du-contrat-en-periode-dessai-par-le-salarie
        "772cb955ce", // rupture-de-periode-dessai-par-lemployeur
        "8122c6c3eb", // convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel
        "9a6cf1b40c", // lettre-de-demission
      ]);
      const contributions = await getByIdsContributions([
        "90c0113ee8", // en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire
        "db4f1fe3fb", // quelle-est-la-duree-du-preavis-en-cas-de-demission
        "eba7a4592f", // les-conges-pour-evenements-familiaux
        "f6247840b2", // est-il-obligatoire-davoir-un-contrat-de-travail-ecrit-et-signe
      ]);
      const agreements = await getByIdsAgreements([
        "39ac98db5d", // 573-commerces-de-gros
        "81c96604dc", // 2609-batiment-etam
        "be72a669a7", // 650-metallurgie-ingenieurs-et-cadres
        "d825ef1df2", // 3239-particuliers-employeurs-et-emploi-a-domicile
      ]);
      const response: GetHomePage = {
        themes,
        highlights,
        tools,
        modeles,
        contributions,
        agreements,
      };
      this.res.status(200).json(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.res.status(404).json({ message: "Home element not found" });
      } else {
        this.res
          .status(500)
          .json({ message: "Error during getting home element" });
      }
    }
  }
}
