import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { orderByAlpha } from "../utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";

type Props<K> = {
  fields: K[];
  sortBy?: K;
  size?: number;
};

const baseFilters = [
  { term: { source: SOURCES.CCN } },
  { term: { isPublished: true } },
  { term: { contributions: true } },
];

export const fetchAllAgreements = async <K extends keyof ElasticAgreement>({
  fields,
  sortBy,
  size = 100,
}: Props<K>): Promise<Pick<ElasticAgreement, K>[]> => {
  const response = await elasticsearchClient.search<Pick<ElasticAgreement, K>>({
    query: {
      bool: {
        filter: baseFilters,
      },
    },
    size,
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

type FetchAgreementsByCdtnIdsProps<K> = Props<K> & {
  cdtnIds: string[];
};

export const fetchAgreementsByCdtnIds = async <
  K extends keyof ElasticAgreement,
>({
  fields,
  sortBy,
  cdtnIds,
}: FetchAgreementsByCdtnIdsProps<K>): Promise<Pick<ElasticAgreement, K>[]> => {
  const response = await elasticsearchClient.search<Pick<ElasticAgreement, K>>({
    query: {
      bool: {
        filter: [...baseFilters, { terms: { cdtnId: cdtnIds } }],
      },
    },
    size: cdtnIds.length,
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
