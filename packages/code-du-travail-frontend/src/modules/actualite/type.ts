import { NewsElasticDocument } from "@socialgouv/cdtn-types";
import { RelatedItem } from "../documents";

export type NewsImage = {
  filename: string;
  alt: string;
  author?: string;
  license: "free" | "source";
  width?: number;
  height?: number;
  sizeOctet?: number;
};

type NewsExternalLink = {
  type: "external";
  title: string;
  url: string;
  intro?: string;
};

export type NewsLink =
  | {
      type: "cdtn";
      source: string;
      slug: string;
      title: string;
      intro?: string;
    }
  | NewsExternalLink;

export type NewsReference =
  | { type: "legi"; title: string; url: string; intro?: string }
  | NewsExternalLink;

// Lien « Pour aller plus loin » dont l'URL est déjà calculée.
export type NewsFurtherReadingLink = {
  title: string;
  url: string;
  intro?: string;
  external: boolean;
};

// A remplacer par `@socialgouv/cdtn-types` dès la publication des types de l'admin.
export type NewsDocument = NewsElasticDocument & {
  updatedAt?: string;
  image?: NewsImage;
  links?: NewsLink[];
  references?: NewsReference[];
};

export type News = Pick<
  NewsDocument,
  "title" | "meta_title" | "content" | "meta_description" | "date"
> & {
  relatedItems: { items: RelatedItem[]; title: string }[];
  links: NewsFurtherReadingLink[];
  image?: NewsImage & { url: string };
  references: NewsReference[];
  modifiedTime?: string;
};

export type NewsSummary = Pick<
  NewsElasticDocument,
  "title" | "content" | "date" | "slug"
> & {
  image?: NewsImage & { url: string };
};
