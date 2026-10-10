import { Metadata } from "next/types";

type Props = {
  title: string;
  description: string;
  path?: string;
  overrideCanonical?: string;
  noTitleAdd?: boolean;
  robots?: string;
  // Flux RSS déclaré dans le <head> (<link rel="alternate" type="application/rss+xml">).
  feed?: { href: string; title: string };
  // Page de type « article » (Open Graph) : og:type = article et, si la date
  // ISO 8601 est fournie, article:published_time / article:modified_time.
  article?: { publishedTime?: string; modifiedTime?: string };
  // Image de partage (Open Graph et Twitter). Sans image, c'est l'image par
  // défaut du site qui est utilisée.
  image?: { url: string; alt: string; width?: number; height?: number };
};

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
            ...(article.publishedTime && {
              publishedTime: article.publishedTime,
              modifiedTime: article.modifiedTime ?? article.publishedTime,
            }),
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
