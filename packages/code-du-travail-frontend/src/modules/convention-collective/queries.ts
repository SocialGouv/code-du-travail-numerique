import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { orderByAlpha } from "../utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";

export const fetchAgreements = async <K extends keyof ElasticAgreement>(
  fields: K[],
  sortBy?: K,
  filters?: {
    cdtnIds?: string[];
  }
): Promise<Pick<ElasticAgreement, K>[]> => {
  const baseFilters: Array<any> = [
    { term: { source: SOURCES.CCN } },
    { term: { isPublished: true } },
    { term: { contributions: true } },
  ];

  if (filters?.cdtnIds) {
    baseFilters.push({ terms: { cdtnId: filters.cdtnIds } });
  }

  const response = await elasticsearchClient.search<Pick<ElasticAgreement, K>>({
    query: {
      bool: {
        filter: baseFilters,
      },
    },
    size: 100,
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
