import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../utils";
import { getGlossary } from "./service";

export class GlossaryController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      const response = await getGlossary();
      this.res.status(200).json(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.res.status(404).json({ message: error.message });
      } else {
        this.res.status(500).json({
          message: "Error during getting glossary",
        });
      }
    }
  }

  public async getBySlug(slug: string) {
    try {
      const glossaryData = await getGlossary();

      const [term] = glossaryData.filter((term) => slug === term.slug);

      if (!term) {
        throw new NotFoundError({
          message: `there is no glossary term that match slug ${slug}`,
          name: "GLOSSARY_TERM_NOT_FOUND",
          cause: null,
        });
      }
      const response = { ...term };

      this.res.status(200).json(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.res.status(404).json({ message: error.message });
      } else {
        this.res.status(500).json({
          message: "Error during getting fetching the number of docs",
        });
      }
    }
  }
}
