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

export type NewsLink =
  | { type: "cdtn"; source: string; slug: string; title: string }
  | { type: "external"; title: string; url: string };

export type NewsReference = { type: "legi"; title: string; url: string };

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
  image?: NewsImage & { url: string };
  references: NewsReference[];
  modifiedTime?: string;
};

export type NewsSummary = Pick<
  NewsElasticDocument,
  "title" | "content" | "date" | "slug"
>;
