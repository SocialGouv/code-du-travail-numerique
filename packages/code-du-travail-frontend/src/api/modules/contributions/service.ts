import { ElasticSearchItem } from "@socialgouv/cdtn-utils";
import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import {
  getAllGenericsContributions,
  getContributionsBySlugs,
  getAllContributionBySlug,
  getContributionsByIds,
} from "./queries";

export const getGenericContributionsGroupByThemes = async () => {
  const body = getAllGenericsContributions();

  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  return response.body.hits.hits
    .map(({ _source }) => _source)
    .map((contrib) => {
      contrib.theme = contrib.breadcrumbs[0].label;
      return contrib;
    })
    .reduce(groupByThemes, {});
};

export const getGenericsContributions = async () => {
  const body = getAllGenericsContributions();

  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  return response.body.hits.hits.map(({ _source }) => _source);
};

export const getBySlugsContributions = async (
  slugs: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getContributionsBySlugs(slugs);
  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
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
    index: elasticDocumentsIndex,
  });
  return response.body.hits.total.value > 0
    ? response.body.hits.hits.map(({ _source }) => _source)
    : [];
};

const groupByThemes = (acc, item) => {
  if (item.theme in acc) acc[item.theme].push(item);
  else acc[item.theme] = [item];
  return acc;
};
