import { elasticIndex, elasticsearchClient, NotFoundError } from "../utils";
import {
  getAllContributionBySlug,
  getAllGenericsContributions,
} from "./queries";

export class ContributionsService {
  public async getGeneric() {
    const body = getAllGenericsContributions();

    const response = await elasticsearchClient.search({
      body,
      index: elasticIndex,
    });
    return response.body.hits.hits
      .map(({ _source }) => _source)
      .map((contrib) => {
        contrib.theme = contrib.breadcrumbs[0].label;
        return contrib;
      })
      .reduce(groupByThemes, {});
  }

  public async getBySlug(slug: string) {
    const body = getAllContributionBySlug(slug);

    const response = await elasticsearchClient.search({
      body,
      index: elasticIndex,
    });

    if (response.body.hits.hits.length === 0) {
      throw new NotFoundError({
        message: `There is no contribution that match ${slug}`,
        name: "CONTRIB_NOT_FOUND",
        cause: null,
      });
    }

    return response.body.hits.hits[0]._source.refs;
  }
}

const groupByThemes = (acc, item) => {
  if (item.theme in acc) acc[item.theme].push(item);
  else acc[item.theme] = [item];
  return acc;
};
