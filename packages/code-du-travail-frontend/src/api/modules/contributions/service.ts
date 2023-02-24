import { ElasticSearchItem } from "../../../../../code-du-travail-utils/build";
import { elasticsearchClient, elasticIndex, NotFoundError } from "../../utils";
import {
  getAllGenericsContributions,
  getContributionsBySlugs,
  getAllContributionBySlug,
  getContributionsByIds,
} from "./queries";

export const getGenericContributions = async () => {
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
};

export const getBySlugsContributions = async (
  slugs: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getContributionsBySlugs(slugs);
  const response = await elasticsearchClient.search({
    body,
    index: elasticIndex,
  });
  return response.body.hits.total.value > 0
    ? response.body.hits.hits.map(({ _source }) => _source)
    : [];
};

export const getByIdsContributions = async (
  ids: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getContributionsByIds(ids);
  const response = await elasticsearchClient.search({
    body,
    index: elasticIndex,
  });
  return response.body.hits.total.value > 0
    ? response.body.hits.hits.map(({ _source }) => _source)
    : [];
};

export const getBySlugContributions = async (slug: string) => {
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
};

const groupByThemes = (acc, item) => {
  if (item.theme in acc) acc[item.theme].push(item);
  else acc[item.theme] = [item];
  return acc;
};
