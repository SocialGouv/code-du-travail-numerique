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
import { ElasticSearchItem } from "../../types";
import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { nonNullable } from "@socialgouv/modeles-social";

export const getAllAgreements = async (): Promise<ElasticAgreement[]> => {
  const body = getAllAgreementsWithContributions();

  const response = await elasticsearchClient.search<ElasticAgreement>({
    body,
    index: elasticDocumentsIndex,
  });

  return response.hits.hits
    .map(({ _source }) => _source)
    .filter(nonNullable)
    .sort(orderByAlpha);
};

export const getBySlugsAgreements = async (
  slugs: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getAgreementsBySlugs(slugs);
  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits.length > 0
    ? response.hits.hits.map(({ _source }) => _source)
    : [];
};

export const getByIdsAgreements = async (
  ids: string[]
): Promise<ElasticSearchItem<{ shortTitle: string }>[]> => {
  const body = getAgreementsByIds(ids);
  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits.length > 0
    ? response.hits.hits.map(({ _source }) => _source)
    : [];
};

export const getBySlugAgreements = async (slug: string) => {
  const body = await getAgreementBySlugBody(slug);

  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `Agreement not found, no agreement match ${slug}y`,
      name: "AGREEMENT_NOT_FOUND",
      cause: null,
    });
  }

  return { ...response.hits.hits[0]._source };
};

const orderByAlpha = (a, b) => {
  return a.shortTitle.localeCompare(b.shortTitle, "fr", {
    ignorePunctuation: true,
  });
};
