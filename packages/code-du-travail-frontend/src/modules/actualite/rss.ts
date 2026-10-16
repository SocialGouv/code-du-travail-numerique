import { SITE_URL } from "../../config";
import { toRfc822DateParis } from "../utils/date";
import { toUrl } from "../utils/url";
import type { NewsDocument } from "./type";

export const NEWS_RSS_FEED = {
  href: "/actualite/rss.xml",
  title: "Actualités - Code du travail numérique",
} as const;

export const NEWS_RSS_ITEMS_COUNT = 20;

export type NewsRssItem = Pick<
  NewsDocument,
  "title" | "meta_description" | "date" | "slug" | "image"
>;

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const absoluteUrl = (path: string): string => {
  const base = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  return `${base}${path}`;
};

const tag = (name: string, value: string): string =>
  `<${name}>${escapeXml(value)}</${name}>`;

const mimeFromFilename = (filename: string): string => {
  const extension = filename.split(".").pop()?.toLowerCase();
  if (extension === "webp") return "image/webp";
  if (extension === "png") return "image/png";
  return "image/jpeg";
};

// Image de l'actualité : `enclosure` (RSS 2.0, lu par la plupart des lecteurs)
// et `media:content` (Media RSS, avec les dimensions quand elles sont connues).
const buildImage = (image: NonNullable<NewsRssItem["image"]>): string[] => {
  const url = escapeXml(toUrl(image.filename));
  const type = mimeFromFilename(image.filename);
  const dimensions =
    image.width && image.height
      ? ` width="${image.width}" height="${image.height}"`
      : "";
  return [
    `<enclosure url="${url}" length="${image.sizeOctet ?? 0}" type="${type}"/>`,
    `<media:content url="${url}" medium="image" type="${type}"${dimensions}/>`,
  ];
};

const buildItem = (item: NewsRssItem): string => {
  const url = absoluteUrl(`/actualite/${item.slug}`);
  const pubDate = toRfc822DateParis(item.date);
  const description = item.meta_description?.trim();

  return [
    "<item>",
    tag("title", item.title),
    tag("link", url),
    `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
    // Pas de contenu complet dans le flux : titre, description courte et lien.
    ...(description ? [tag("description", description)] : []),
    // pubDate RFC 822 seul : RSS 2.0 l'impose et le validateur W3C déconseille
    // de le doubler d'un dc:date. Actualité sans date interprétable : incluse,
    // sans pubDate.
    ...(pubDate ? [tag("pubDate", pubDate)] : []),
    ...(item.image ? buildImage(item.image) : []),
    tag("dc:creator", "Code du travail numérique"),
    "</item>",
  ].join("");
};

// Flux RSS 2.0 des actualités publiées. Les items sont supposés déjà triés par
// date décroissante (tri Elasticsearch) ; ceux sans date valide sont rejetés
// en fin de flux.
export const buildNewsRssFeed = (items: NewsRssItem[]): string => {
  const dated = items.filter((item) => toRfc822DateParis(item.date));
  const undated = items.filter((item) => !toRfc822DateParis(item.date));
  const ordered = [...dated, ...undated];

  const lastBuildDate = dated[0] ? toRfc822DateParis(dated[0].date) : undefined;
  const feedUrl = absoluteUrl(NEWS_RSS_FEED.href);
  const listUrl = absoluteUrl("/actualite");
  const title = NEWS_RSS_FEED.title;

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">',
    "<channel>",
    tag("title", title),
    tag("link", listUrl),
    tag(
      "description",
      "Découvrez toutes les actualités liées au code du travail."
    ),
    tag("language", "fr"),
    tag("ttl", "60"),
    // Logo du canal : RSS 2.0 recommande au plus 144 × 400 px.
    "<image>",
    tag("url", absoluteUrl("/static/assets/img/logo-marianne.png")),
    tag("title", title),
    tag("link", listUrl),
    tag("width", "109"),
    tag("height", "40"),
    "</image>",
    `<atom:link rel="self" type="application/rss+xml" href="${escapeXml(feedUrl)}"/>`,
    ...(lastBuildDate ? [tag("lastBuildDate", lastBuildDate)] : []),
    ...ordered.map(buildItem),
    "</channel>",
    "</rss>",
  ].join("");
};
