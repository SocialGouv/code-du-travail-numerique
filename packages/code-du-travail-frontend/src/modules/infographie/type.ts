import { Breadcrumb, InfographicElasticDocument } from "@socialgouv/cdtn-types";

export type Infographic = Pick<
  InfographicElasticDocument,
  | "title"
  | "meta_title"
  | "description"
  | "meta_description"
  | "date"
  | "transcription"
  | "references"
> & {
  svgFilename: string;
  pdf: {
    filename: string;
    sizeOctet: string;
  };
  breadcrumbs: Breadcrumb[];
};
