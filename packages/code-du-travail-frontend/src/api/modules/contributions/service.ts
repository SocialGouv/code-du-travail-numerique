import {
  ElasticSearchContributionGeneric,
  ElasticSearchItem,
} from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import {
  getAllContributions,
  getAllGenericsContributions,
  getContributionsByIds,
  getContributionsBySlugs,
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

const isGeneric = (contrib) =>
  (contrib.idcc && contrib.idcc === "0000") ||
  (!contrib.idcc && !contrib.split);

export const getAllContributionsGroupByQuestion = async () => {
  const body = getAllContributions();

  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  const all = response.body.hits.hits.map(({ _source }) => _source);
  const allGenerics = all.filter(isGeneric);

  return allGenerics.map((generic) => {
    return {
      generic: generic,
      CCs: all.filter((contrib) => {
        return !isGeneric(contrib) && contrib.slug.includes(generic.slug);
      }),
    };
  });
};

export const getBySlugsContributions = async (
  slugs: string[]
): Promise<ElasticSearchContributionGeneric[]> => {
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
