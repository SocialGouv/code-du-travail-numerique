import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import {
  getAgreementBySlug,
  getAgreementsByIds,
  getAgreementsBySlugs,
  getAllAgreementsQuery,
} from "./queries";
import { ElasticSearchItem } from "../../types";
import { AgreementDoc, ElasticAgreement } from "@socialgouv/cdtn-types";
import {orderByAlpha} from "../../utils/sort";

export const getAllAgreements = async <K extends keyof ElasticAgreement>(
  fields: K[],
  sortBy?: K
): Promise<Pick<ElasticAgreement, K>[]> => {
  const body = getAllAgreementsQuery();

  const response = await elasticsearchClient.search<Pick<ElasticAgreement, K>>({
    ...body,
    _source: fields,
    index: elasticDocumentsIndex,
  });

  const data = response.hits.hits
    .map(({ _source }) => _source)
    .filter((item) => item !== undefined);
  if (sortBy) {
    data.sort((a, b) => orderByAlpha(a, b, sortBy));
  }
  return data;
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
  const body = await getAgreementBySlug(slug);

  const response = await elasticsearchClient.search<AgreementDoc[]>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    return;
  }

  return { ...response.hits.hits[0]._source };
};
