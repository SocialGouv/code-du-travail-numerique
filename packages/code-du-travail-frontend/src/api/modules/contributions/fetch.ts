import { ContributionElasticDocument } from "@socialgouv/cdtn-types";
import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getAllContributions } from "./queries";

export const fetchAllContributions = async <
  K extends keyof ContributionElasticDocument
>(
  fields: K[]
): Promise<Pick<ContributionElasticDocument, K>[]> => {
  const body = getAllContributions();

  const result = await elasticsearchClient.search<
    Pick<ContributionElasticDocument, K>
  >({
    ...body,
    _source: fields,
    index: elasticDocumentsIndex,
  });

  return result.hits.hits
    .map(({ _source }) => _source)
    .filter((source) => source !== undefined);
};
