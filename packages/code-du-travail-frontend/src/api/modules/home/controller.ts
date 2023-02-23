import { ElasticSearchItem } from "cdtn-types";
import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../utils";
import { getBySlugsAgreements } from "../agreements";
import { getBySlugsContributions } from "../contributions";
import { getBySlugHighlights } from "../highlights";
import { getBySlugsModeles } from "../modeles";
import { getAllThemes } from "../themes";
import { getAllTools } from "../tools";

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
    // modifier en passant en fonction
    try {
      const themes = await getAllThemes();
      const highlights = await getBySlugHighlights("homepage");
      const tools = await getAllTools(
        // modifier en passant un array
        "df,dsds,dsds,dsds",
        "simulateur-embauche,indemnite-licenciement,preavis-demission,convention-collective"
      );
      const modeles = await getBySlugsModeles([
        "lettre-de-demission", // modfier en passant les id
        "rupture-du-contrat-en-periode-dessai-par-le-salarie",
        "rupture-de-periode-dessai-par-lemployeur",
        "convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel",
      ]);
      const contributions = await getBySlugsContributions([
        "quelle-est-la-duree-du-preavis-en-cas-de-demission",
        "les-conges-pour-evenements-familiaux",
        "en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
        "est-il-obligatoire-davoir-un-contrat-de-travail-ecrit-et-signe",
      ]);
      const agreements = await getBySlugsAgreements([
        "2609-batiment-etam",
        "650-metallurgie-ingenieurs-et-cadres",
        "3239-particuliers-employeurs-et-emploi-a-domicile",
        "573-commerces-de-gros",
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
        this.res.status(404).json({ message: "Not found" });
      } else {
        this.res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
