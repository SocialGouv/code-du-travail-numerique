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
};

export function generateDefaultMetadata({
  title,
  description,
  overrideCanonical,
  path,
  robots,
  feed,
  article,
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
      images: `/static/assets/img/social-preview.png`,
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
    ...(robots && {
      robots,
    }),
  };
}
