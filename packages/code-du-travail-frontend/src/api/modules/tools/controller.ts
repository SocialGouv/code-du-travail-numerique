import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_ERROR_500_MESSAGE, NotFoundError } from "../../utils";
import { getToolsBySlugs, getToolsByIds } from "./service";

export class ToolsController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      const { ids: idsString } = this.req.query as any;
      const ids = idsString?.split(",");
      const response = await getToolsByIds(ids);
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

  public async getBySlug() {
    try {
      const { slug } = this.req.query as any;
      const response = await getToolsBySlugs(slug);
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
