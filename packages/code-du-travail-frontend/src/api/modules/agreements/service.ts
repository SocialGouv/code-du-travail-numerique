import {
  Agreement,
  ElasticSearchItem,
  SearchResponse,
} from "@socialgouv/cdtn-utils";
import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../utils";
import {
  getAgreementBySlugBody,
  getAgreementsByIds,
  getAgreementsBySlugs,
  getAllAgreementsWithContributions,
} from "./queries";

export const getAllAgreements = async (): Promise<Agreement[]> => {
  const body = getAllAgreementsWithContributions();

  const response = await elasticsearchClient.search<SearchResponse<Agreement>>({
    body,
    index: elasticDocumentsIndex,
  });

  return response.body.hits.hits
    .map(({ _source }) => _source)
    .sort(orderByAlpha);
};

export const getBySlugsAgreements = async (
  slugs: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getAgreementsBySlugs(slugs);
  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
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
    index: elasticDocumentsIndex,
  });
  return response.body.hits.total.value > 0
    ? response.body.hits.hits.map(({ _source }) => _source)
    : [];
};

export const getBySlugAgreements = async (slug: string) => {
  const body = await getAgreementBySlugBody(slug);

  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
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

const orderByAlpha = (a, b) => {
  return a.shortTitle.localeCompare(b.shortTitle);
};
