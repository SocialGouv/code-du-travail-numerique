import { Breadcrumb } from "@socialgouv/cdtn-types";

export type ElasticSearchItem<T = void> = {
  description: string;
  source: string;
  title: string;
  slug: string;
  breadcrumbs: Breadcrumb[];
} & T;

export type ErrorResponse = {
  message: string;
};
