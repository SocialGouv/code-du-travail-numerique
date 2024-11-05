import {
  DocumentElasticWithSource,
  MailTemplateDoc,
} from "@socialgouv/cdtn-types";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticResult, fetchDocument } from "../documents";

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
    .filter((model) => model !== undefined);
};

export const format = (model) => {
  if (model) {
    model.filesize = Math.round((model.filesize / 1000) * 100) / 100;
    if (model.filename.indexOf(".") > 0) {
      model.extension = model.filename.split(/\.([a-z]{2,4})$/)[1];
    }
  }

  return model;
};

export const fetchModel = async (filter: {
  slug?: string;
  _id?: string;
}): Promise<
  | (DocumentElasticResult<DocumentElasticWithSource<MailTemplateDoc>> & {
      extension: string;
    })
  | undefined
> => {
  const model = await fetchDocument<
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
            { term: filter },
            { term: { isPublished: true } },
          ],
        },
      },
    }
  );

  return format(model);
};
