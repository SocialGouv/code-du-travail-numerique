import { orderByAlpha } from "../utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { EditorialContentElasticDocument } from "./type";
import { SOURCES } from "@socialgouv/cdtn-utils";
import {
  DocumentElasticResult,
  fetchDocument,
  RelatedItem,
} from "../documents";

export const fetchAllInformations = async <
  K extends keyof EditorialContentElasticDocument,
>(
  fields: K[],
  sortBy?: K
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

export const fetchInformation = async <
  K extends keyof EditorialContentElasticDocument,
>(
  slug: string,
  fields: K[]
): Promise<
  DocumentElasticResult<Pick<EditorialContentElasticDocument, K>> | undefined
> => {
  const response = await fetchDocument<
    EditorialContentElasticDocument,
    keyof DocumentElasticResult<EditorialContentElasticDocument>
  >(fields, {
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.EDITORIAL_CONTENT } },
          { term: { isPublished: true } },
          { term: { slug } },
        ],
      },
    },
    size: 3000,
    _source: fields,
    index: elasticDocumentsIndex,
  });
  return response;
};

export type InformationData = DocumentElasticResult<
  Pick<
    EditorialContentElasticDocument,
    | "date"
    | "breadcrumbs"
    | "title"
    | "description"
    | "intro"
    | "contents"
    | "references"
  >
>;

export type FormatType = {
  information: InformationData;
  relatedItems: { items: RelatedItem[]; title: string }[];
};

export const format = (
  information: InformationData | undefined
): FormatType | undefined => {
  if (!information) return;

  return {
    information,
    relatedItems: [],
  };
};
