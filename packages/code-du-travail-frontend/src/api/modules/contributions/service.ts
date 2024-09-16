import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getAllGenericsContributions, getContributionsByIds } from "./queries";
import { fetchAllContributions } from "./fetch";
import { ElasticSearchItem } from "../../types";
import { ElasticAgreement } from "@socialgouv/cdtn-types";


export const getGenericContributionsGroupByThemes = async () => {
  const body = getAllGenericsContributions();

  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits
    .map(({ _source }) => _source)
    .map((contrib: any) => {
      contrib.theme = contrib.breadcrumbs[0].label;
      return contrib;
    })
    .reduce(groupByThemes, {});
};

export const getByIdsContributions = async (
  ids: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getContributionsByIds(ids);
  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits.length > 0
    ? response.hits.hits.map(({ _source }) => _source)
    : [];
};

const groupByThemes = (acc, item) => {
  if (item.theme in acc) acc[item.theme].push(item);
  else acc[item.theme] = [item];
  return acc;
};
