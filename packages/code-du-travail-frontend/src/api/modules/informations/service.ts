import { EditorialContentElasticDocument } from "@socialgouv/cdtn-types";
import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { fetchInformations } from "./queries";
import { orderByAlpha } from "../../utils/sort";

export const getAllInformations = async <
  K extends keyof EditorialContentElasticDocument
>(
  fields: K[],
  sortBy?: K
): Promise<Pick<EditorialContentElasticDocument, K>[]> => {
  const body = fetchInformations();

  const response = await elasticsearchClient.search<
    Pick<EditorialContentElasticDocument, K>
  >({
    ...body,
    _source: fields,
    index: elasticDocumentsIndex,
  });

  const data = response.hits.hits
    .map(({ _source }) => _source)
    .filter((source) => source !== undefined);
  if (sortBy) {
    return data.sort((a, b) => orderByAlpha(a, b, sortBy));
  }
  return data;
};
