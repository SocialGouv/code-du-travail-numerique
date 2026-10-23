import {
  NewsElasticDocument,
  NewsElasticLink,
  NewsTemplateImage,
  NewsTemplateReference,
} from "@socialgouv/cdtn-types";
import { RelatedItem } from "../documents";

export type NewsImage = NewsTemplateImage;

// « Contenus liés » d'une actualité.
export type NewsLink = NewsElasticLink;

export type NewsReference = NewsTemplateReference;

// Un export antérieur aux liens et références de l'admin n'a ni `links` ni
// `references` (seulement `linkedContent`).
export type NewsDocument = Omit<NewsElasticDocument, "links" | "references"> &
  Partial<Pick<NewsElasticDocument, "links" | "references">>;

export type News = Pick<
  NewsDocument,
  "title" | "meta_title" | "content" | "meta_description" | "date"
> & {
  relatedItems: { items: RelatedItem[]; title: string }[];
  image?: NewsImage & { url: string };
  references: NewsReference[];
  publishedTime?: string;
  modifiedTime?: string;
};

export type NewsSummary = Pick<
  NewsElasticDocument,
  "title" | "content" | "date" | "slug"
> & {
  image?: NewsImage & { url: string };
};
