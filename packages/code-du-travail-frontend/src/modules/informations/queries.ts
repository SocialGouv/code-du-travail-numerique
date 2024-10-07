import { orderByAlpha } from "../utils/sort";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { EditorialContentElasticDocument } from "@socialgouv/cdtn-types";
import { SOURCES } from "@socialgouv/cdtn-utils";

export const fetchAllInformations = async <
  K extends keyof EditorialContentElasticDocument,
>(
  fields: K[],
  sortBy?: K,
): Promise<Pick<EditorialContentElasticDocument, K>[]> => {
  const response = await elasticsearchClient.search<
    Pick<EditorialContentElasticDocument, K>
  >({
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.EDITORIAL_CONTENT } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 3000,
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
