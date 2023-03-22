import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../utils";
import { getThemeBySlugQuery, getThemes } from "./queries";

export class ThemesController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      const response = await getThemes();
      this.res.status(200).json(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.res.status(404).json({ message: error.message });
      } else {
        this.res.status(500).json({
          message: "Error during fetching data",
        });
      }
    }
  }

  public async getBySlug() {
    try {
      const { slug } = this.req.query;
      const response = await getThemeBySlugQuery(slug as string);
      this.res.status(200).json(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.res.status(404).json({ message: error.message });
      } else {
        this.res.status(500).json({
          message: "Error during fetching data",
        });
      }
    }
  }
}
