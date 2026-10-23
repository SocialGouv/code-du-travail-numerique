import { Metadata } from "next/types";
import { toIsoDateTimeParis } from "../utils/date";

type Props = {
  title: string;
  description: string;
  path?: string;
  overrideCanonical?: string;
  noTitleAdd?: boolean;
  robots?: string;
  // Flux RSS déclaré dans le <head> (<link rel="alternate" type="application/rss+xml">).
  feed?: { href: string; title: string };
  // Page de type « article » (Open Graph) : og:type = article, og:url = URL
  // canonique et, si la date ISO 8601 est fournie, article:published_time /
  // article:modified_time.
  // article:section reprend la rubrique (ex. « Actualités »).
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
  };
  // Image de partage (Open Graph et Twitter). Sans image, c'est l'image par
  // défaut du site qui est utilisée.
  image?: { url: string; alt: string; width?: number; height?: number };
};

// Open Graph « article » d'un contenu qui émet un JSON-LD `Article`
// (ArticleJsonLd) : même date (minuit Paris) et même rubrique (thème racine).
export const getContentArticle = (
  date?: string,
  breadcrumbs?: { label: string }[]
): NonNullable<Props["article"]> => ({
  publishedTime: toIsoDateTimeParis(date),
  section: breadcrumbs?.[0]?.label,
});

export function generateDefaultMetadata({
  title,
  description,
  overrideCanonical,
  path,
  robots,
  feed,
  article,
  image,
}: Props): Metadata {
  return {
    title: title,
    description: description,
    alternates: {
      canonical: overrideCanonical ?? path,
      ...(feed && {
        types: {
          "application/rss+xml": [{ url: feed.href, title: feed.title }],
        },
      }),
    },
    openGraph: {
      siteName: "Code du travail numérique",
      title: title,
      description: description,
      images: image
        ? [
            {
              url: image.url,
              alt: image.alt,
              ...(image.width && image.height
                ? { width: image.width, height: image.height }
                : {}),
            },
          ]
        : `/static/assets/img/social-preview.png`,
      locale: "fr_FR",
      ...(article
        ? {
            type: "article",
            ...((overrideCanonical ?? path) && {
              url: overrideCanonical ?? path,
            }),
            ...(article.publishedTime && {
              publishedTime: article.publishedTime,
              modifiedTime: article.modifiedTime ?? article.publishedTime,
            }),
            ...(article.section && { section: article.section }),
          }
        : { type: "website" }),
    },
    ...(image && {
      twitter: { card: "summary_large_image", images: [image.url] },
    }),
    ...(robots && {
      robots,
    }),
  };
}
