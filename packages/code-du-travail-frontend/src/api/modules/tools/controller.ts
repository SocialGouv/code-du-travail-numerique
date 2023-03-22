import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../utils";
import { getToolBySlug, getTools } from "./queries";

export class ToolsController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async getAllTools() {
    try {
      const { ids: idsString, slugs: slugsString } = this.req.query as any;
      const ids = idsString?.split(",");
      const slugs = slugsString?.split(",");
      const response = await getTools(ids, slugs);
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
      const { slug } = this.req.query as any;
      const response = await getToolBySlug(slug);
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
