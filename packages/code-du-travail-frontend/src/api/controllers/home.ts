import { NextApiRequest, NextApiResponse } from "next";
import { ThemesService } from "../services";

export class HomeController {
  private req: NextApiRequest;
  private res: NextApiResponse;
  private themeService: ThemesService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
    this.themeService = new ThemesService();
  }

  public async getAll() {
    const themes = await this.themeService.getAll();
    //TODO: add highlights, modeles, tools, contributions, agreements
    this.res.status(200).json({ themes });
  }
}
