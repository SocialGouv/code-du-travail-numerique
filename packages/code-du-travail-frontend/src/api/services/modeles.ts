import { elasticIndex, elasticsearchClient, NotFoundError } from "../utils";
import { getModeleBySlug, getModeles } from "./queries";

export class ModelesService {
  public async getAll() {
    const body = getModeles();
    const response = await elasticsearchClient.search({
      body,
      index: elasticIndex,
    });
    return response.body.hits.total.value > 0
      ? response.body.hits.hits.map(({ _source }) => _source)
      : [];
  }

  public async getBySlug(slug: string) {
    const body = getModeleBySlug(slug);

    const response = await elasticsearchClient.search({
      body,
      index: elasticIndex,
    });

    if (response.body.hits.hits.length === 0) {
      throw new NotFoundError({
        message: `There is no modele that match ${slug}`,
        name: "MODELE_NOT_FOUND",
        cause: null,
      });
    }

    const theme = response.body.hits.hits[0];

    return {
      ...theme._source,
    };
  }
}
