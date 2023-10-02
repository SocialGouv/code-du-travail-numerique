import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError, DEFAULT_ERROR_500_MESSAGE } from "../../utils";
import { getAllThemes, getBySlugThemes } from "./service";

export class ThemesController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    console.log("API Themes 11 ");
    try {
      console.log("API Themes 12");
      const response = await getAllThemes();
      this.res.status(200).json(response);
    } catch (error) {
      console.error("API Themes ERROR", error);
      if (error instanceof NotFoundError) {
        this.res.status(404).json({ message: error.message });
      } else {
        this.res.status(500).json({
          message: DEFAULT_ERROR_500_MESSAGE,
        });
      }
    }
  }

  public async getBySlug() {
    try {
      const { slug } = this.req.query;
      const response = await getBySlugThemes(slug as string);
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
