import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { orderByAlpha } from "../utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";

export const fetchAllAgreements = async <K extends keyof ElasticAgreement>(
  fields: K[],
  sortBy?: K
): Promise<Pick<ElasticAgreement, K>[]> => {
  const response = await elasticsearchClient.search<Pick<ElasticAgreement, K>>({
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CCN } },
          { term: { isPublished: true } },
          { term: { contributions: true } },
        ],
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
