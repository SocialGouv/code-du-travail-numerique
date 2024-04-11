import { Agreement, ElasticSearchItem } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getAllGenericsContributions, getContributionsByIds } from "./queries";
import { fetchAllContributions } from "./fetch";

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

const isGeneric = (contrib) => contrib.idcc === "0000";

function getTitle(agreements: Agreement[], contrib) {
  const idcc = contrib.idcc ?? contrib.slug.split("-")[0];
  const agreement = agreements.find((a) => a.num === parseInt(idcc));
  return agreement
    ? `${contrib.title} - ${agreement.shortTitle}`
    : contrib.title;
}

export const getAllContributionsGroupByQuestion = async (
  agreements: Agreement[]
) => {
  const response = await fetchAllContributions();
  const all = response.body.hits.hits.map(({ _source }) => _source);
  const allGenerics = all
    .filter(isGeneric)
    .sort((a, b) => a.title.localeCompare(b.title));

  return allGenerics.map((generic) => {
    return {
      generic: generic,
      agreements: all
        .filter((contrib) => {
          return !isGeneric(contrib) && contrib.slug.includes(generic.slug);
        })
        .map((contrib) => {
          contrib.title = getTitle(agreements, contrib);
          return contrib;
        })
        .sort((a, b) => a.title.localeCompare(b.title)),
    };
  });
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
