import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { ContributionElasticDocument } from "@socialgouv/cdtn-types";
import { SOURCES } from "@socialgouv/cdtn-utils";

export const fetchAllContributions = async <
  K extends keyof ContributionElasticDocument
>(
  fields: K[]
): Promise<Pick<ContributionElasticDocument, K>[]> => {
  const result = await elasticsearchClient.search<
    Pick<ContributionElasticDocument, K>
  >({
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CONTRIBUTIONS } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 3000,
    _source: fields,
    index: elasticDocumentsIndex,
  });

  return result.hits.hits
    .map(({ _source }) => _source)
    .filter((source) => source !== undefined);
};
