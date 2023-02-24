import { SearchResponse, ElasticSearchItem, Agreement } from "cdtn-types";
import { elasticsearchClient, elasticIndex, NotFoundError } from "../../utils";
import {
  getAllAgreementsWithContributions,
  getAgreementsBySlugs,
  getAgreementBySlugBody,
  getAgreementsByIds,
} from "./queries";

export const getAllAgreements = async (): Promise<Agreement[]> => {
  const body = getAllAgreementsWithContributions();

  const response = await elasticsearchClient.search<SearchResponse<Agreement>>({
    body,
    index: elasticIndex,
  });

  return response.body.hits.hits
    .map(({ _source }) => _source)
    .sort(orderByAlphaAndMetalurgieLast);
};

export const getBySlugsAgreements = async (
  slugs: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getAgreementsBySlugs(slugs);
  const response = await elasticsearchClient.search({
    body,
    index: elasticIndex,
  });
  return response.body.hits.total.value > 0
    ? response.body.hits.hits.map(({ _source }) => _source)
    : [];
};

export const getByIdsAgreements = async (
  ids: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getAgreementsByIds(ids);
  const response = await elasticsearchClient.search({
    body,
    index: elasticIndex,
  });
  return response.body.hits.total.value > 0
    ? response.body.hits.hits.map(({ _source }) => _source)
    : [];
};

export const getBySlugAgreements = async (slug: string) => {
  const body = await getAgreementBySlugBody(slug);

  const response = await elasticsearchClient.search({
    body,
    index: elasticIndex,
  });
  if (response.body.hits.total.value === 0) {
    throw new NotFoundError({
      message: `Agreement not found, no agreement match ${slug}y`,
      name: "AGREEMENT_NOT_FOUND",
      cause: null,
    });
  }

  return { ...response.body.hits.hits[0]._source };
};

const orderByAlphaAndMetalurgieLast = (a, b) => {
  if (a.url && !b.url) {
    return -1;
  }
  if (!a.url && b.url) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }

  return 0;
};
