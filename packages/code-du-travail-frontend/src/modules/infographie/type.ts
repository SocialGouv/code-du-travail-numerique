// A remplacer par les type du package cdtn-type

import { SOURCES } from "@socialgouv/cdtn-utils";
import { Breadcrumb, DocumentElasticWithSource } from "@socialgouv/cdtn-types";

export type InfographicElasticDocument = DocumentElasticWithSource<
  InfographicTemplateDoc,
  typeof SOURCES.INFOGRAPHICS
>;

export type InfographicTemplateDoc = {
  meta_title: string;
  date: string;
  author: string;
  svgFilename: string;
  svgFilesizeOctet: number;
  pdfFilename: string;
  pdfFilesizeOctet: number;
  description: string;
  meta_description: string;
  transcription: string;
};

export type Infographic = Pick<
  InfographicElasticDocument,
  | "title"
  | "meta_title"
  | "description"
  | "meta_description"
  | "date"
  | "transcription"
> & {
  svgUrl: string;
  pdf: {
    url: string;
    sizeOctet: string;
  };
  breadcrumbs: Breadcrumb[];
};
