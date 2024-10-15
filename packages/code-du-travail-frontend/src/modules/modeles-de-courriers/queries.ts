import {
  DocumentElasticWithSource,
  MailTemplateDoc,
} from "@socialgouv/cdtn-types";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticResult, fetchDocument } from "../documents";
import { nonNullable } from "@socialgouv/modeles-social";

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
  return response.hits.hits.map(({ _source }) => _source).filter(nonNullable);
};

export const fetchModel = async (
  filter: Record<string, string>
): Promise<
  DocumentElasticResult<DocumentElasticWithSource<MailTemplateDoc>> | undefined
> => {
  return await fetchDocument<
    DocumentElasticWithSource<MailTemplateDoc>,
    keyof DocumentElasticResult<DocumentElasticWithSource<MailTemplateDoc>>
  >(
    [
      "breadcrumbs",
      "title",
      "meta_title",
      "date",
      "type",
      "html",
      "author",
      "filename",
      "filesize",
      "intro",
      "description",
      "metaDescription",
      "references",
    ],
    {
      query: {
        bool: {
          filter: [
            { term: { source: SOURCES.LETTERS } },
            { term: filter},
            { term: { isPublished: true } },
          ],
        },
      },
      size: 1,
    }
  );
};
