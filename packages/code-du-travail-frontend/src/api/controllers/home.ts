import { NextApiRequest, NextApiResponse } from "next";
import {
  AgreementsService,
  ContributionsService,
  HighlightsService,
  ModelesService,
  ThemesService,
  ToolsService,
} from "../services";
import { ElasticSearchItem } from "../utils";

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
  private themeService: ThemesService;
  private highlightsService: HighlightsService;
  private toolsService: ToolsService;
  private modelesService: ModelesService;
  private contributionsService: ContributionsService;
  private agreementsService: AgreementsService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
    this.themeService = new ThemesService();
    this.highlightsService = new HighlightsService();
    this.toolsService = new ToolsService();
    this.modelesService = new ModelesService();
    this.contributionsService = new ContributionsService();
    this.agreementsService = new AgreementsService();
  }

  public async get() {
    const themes = await this.themeService.getAll();
    const highlights = await this.highlightsService.getBySlug("homepage");
    const tools = await this.toolsService.getAll(
      undefined,
      "simulateur-embauche,indemnite-licenciement,preavis-demission,convention-collective"
    );
    const modeles = await this.modelesService.getBySlugs([
      "lettre-de-demission",
      "rupture-du-contrat-en-periode-dessai-par-le-salarie",
      "rupture-de-periode-dessai-par-lemployeur",
      "convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel",
    ]);
    const contributions = await this.contributionsService.getBySlugs([
      "quelle-est-la-duree-du-preavis-en-cas-de-demission",
      "les-conges-pour-evenements-familiaux",
      "en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
      "est-il-obligatoire-davoir-un-contrat-de-travail-ecrit-et-signe",
    ]);
    const agreements = await this.agreementsService.getBySlugs([
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
  }
}
