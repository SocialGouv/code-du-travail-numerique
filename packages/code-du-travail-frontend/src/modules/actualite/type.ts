import { NewsElasticDocument } from "@socialgouv/cdtn-types";
import { RelatedItem } from "../documents";

export type News = Pick<
  NewsElasticDocument,
  "title" | "meta_title" | "content" | "meta_description" | "date"
> & {
  relatedItems: { items: RelatedItem[]; title: string }[];
};

export type NewsSummary = Pick<
  NewsElasticDocument,
  "title" | "content" | "date" | "slug"
>;
