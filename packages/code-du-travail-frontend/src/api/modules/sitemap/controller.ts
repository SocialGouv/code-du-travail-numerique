import { Agreement, ElasticSearchItem, Tool } from "@socialgouv/cdtn-utils";
import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_ERROR_500_MESSAGE, NotFoundError } from "../../utils";
import { getAllAgreements } from "../agreements";
import { getAllContributions } from "../contributions";
import { getAllModeles } from "../modeles";
import { getAllThemesAndSubThemes } from "../themes";
import { getAllTools } from "../tools";

export type GetSitemapPage = {
  themes: any;
  tools: Tool[];
  modeles: ElasticSearchItem[];
  contributions: ElasticSearchItem[];
  agreements: Agreement[];
};

export class SitemapController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      const themes = await getAllThemesAndSubThemes();
      const tools = await getAllTools();
      const modeles = await getAllModeles();
      const contributions = await getAllContributions();
      const agreements = await getAllAgreements();
      const response: GetSitemapPage = {
        themes,
        tools,
        modeles,
        contributions,
        agreements,
      };
      this.res.status(200).json(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.res.status(404).json({ message: error.message });
      } else {
        this.res.status(500).json({
          message: DEFAULT_ERROR_500_MESSAGE,
        });
      }
    }
  }
}
