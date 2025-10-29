import { elasticDocumentsIndex } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticResult, fetchDocument } from "../documents";
import { Infographic } from "./type";
import { InfographicElasticDocument } from "@socialgouv/cdtn-types";

export const fetchInfographic = async <
  K extends keyof InfographicElasticDocument,
>(
  slug: string,
  fields: K[]
): Promise<
  DocumentElasticResult<Pick<InfographicElasticDocument, K>> | undefined
> => {
  return await fetchDocument<
    InfographicElasticDocument,
    keyof DocumentElasticResult<InfographicElasticDocument>
  >(fields, {
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.INFOGRAPHICS } },
          { term: { isPublished: true } },
          { term: { slug } },
        ],
      },
    },
    size: 3000,
    _source: fields,
    index: elasticDocumentsIndex,
  });
};

export const format = ({
  title,
  meta_title,
  date,
  description,
  meta_description,
  svgFilename,
  pdfFilename,
  pdfFilesizeOctet,
  transcription,
  breadcrumbs,
}: Pick<
  InfographicElasticDocument,
  | "breadcrumbs"
  | "title"
  | "meta_title"
  | "date"
  | "svgFilename"
  | "pdfFilename"
  | "pdfFilesizeOctet"
  | "description"
  | "meta_description"
  | "transcription"
>): Infographic => ({
  title,
  meta_title,
  date,
  description,
  meta_description,
  svgFilename: svgFilename,
  pdf: {
    filename: pdfFilename,
    sizeOctet: pdfFilesizeOctet.toString(),
  },
  transcription,
  breadcrumbs,
});
