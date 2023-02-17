import { elasticsearchClient } from "../utils";
import { getThemeBySlugQuery } from "./queries";

export class ThemesService {
  public async getBySlug(slug: string) {
    const body = getThemeBySlugQuery(slug);
    const response = await elasticsearchClient.search({
      body,
      index,
    });
    if (response.body.hits.hits.length === 0) {
      ctx.throw(404, `there is no theme that match ${slug}`);
    }

    const theme = response.body.hits.hits[0];

    ctx.body = {
      ...theme._source,
    };
    this.res.status(200).json({ voiture: "BMW" });
  }
}
