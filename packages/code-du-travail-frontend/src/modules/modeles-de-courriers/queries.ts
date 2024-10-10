import {
  DocumentElasticWithSource,
  MailTemplateDoc,
} from "@socialgouv/cdtn-types";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";

export const fetchAllModels = async <
  K extends keyof DocumentElasticWithSource<MailTemplateDoc>,
>(
  fields: K[]
): Promise<Pick<DocumentElasticWithSource<MailTemplateDoc>, K>[]> => {
  const response = await elasticsearchClient.search<
    DocumentElasticWithSource<
      Pick<DocumentElasticWithSource<MailTemplateDoc>, K>
    >
  >({
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.LETTERS } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 1000,
    _source: fields,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits
    .map(({ _source }) => _source)
    .filter((source) => source !== undefined);
};
