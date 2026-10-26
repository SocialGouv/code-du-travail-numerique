import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { getRouteBySource, SourceKeys, SOURCES } from "@socialgouv/cdtn-utils";
import {
  DocumentElasticResult,
  fetchDocument,
  RelatedItem,
  Source,
} from "../documents";
import { LinkedContent } from "@socialgouv/cdtn-types/build/elastic/related-items";
import { toUrl } from "../utils/url";
import { getNewsModifiedTime, getNewsPublishedTime } from "./dates";
import { News, NewsDocument, NewsLink, NewsSummary } from "./type";

export const fetchNewsList = async <K extends keyof NewsDocument>(
  fields: K[],
  filters?: {
    cdtnIds?: string[];
    page?: number;
    pageSize?: number;
  }
): Promise<{
  items: Pick<NewsDocument, K>[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}> => {
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 4;
  const from = (page - 1) * pageSize;

  const baseFilters: Record<string, unknown>[] = [
    { term: { source: SOURCES.NEWS } },
    { term: { isPublished: true } },
  ];

  if (filters?.cdtnIds) {
    baseFilters.push({ terms: { cdtnId: filters.cdtnIds } });
  }

  const response = await elasticsearchClient.search<Pick<NewsDocument, K>>({
    query: {
      bool: {
        filter: baseFilters,
      },
    },
    from,
    size: pageSize,
    // Même jour : la plus récemment publiée d'abord (sans `publishedAt`, en
    // dernier).
    sort: [
      { date: { order: "desc" } },
      { publishedAt: { order: "desc", unmapped_type: "date" } },
    ],
    _source: fields,
    index: elasticDocumentsIndex,
  });

  const items = response.hits.hits
    .map(({ _source }) => _source)
    .filter((model) => model !== undefined);

  const total =
    typeof response.hits.total === "number"
      ? response.hits.total
      : (response.hits.total?.value ?? 0);
  const totalPages = Math.ceil(total / pageSize);

  return {
    items,
    total,
    totalPages,
    page,
    pageSize,
  };
};

export const fetchNews = async <K extends keyof NewsDocument>(
  slug: string,
  fields: K[]
): Promise<DocumentElasticResult<Pick<NewsDocument, K>> | undefined> => {
  return await fetchDocument<
    NewsDocument,
    keyof DocumentElasticResult<NewsDocument>
  >(fields, {
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.NEWS } },
          { term: { isPublished: true } },
          { term: { slug } },
        ],
      },
    },
    size: 1,
    _source: fields,
    index: elasticDocumentsIndex,
  });
};

export const formatSummary = ({
  image,
  ...news
}: Pick<
  NewsDocument,
  "title" | "content" | "date" | "slug" | "image"
>): NewsSummary => ({
  ...news,
  image: image ? { ...image, url: toUrl(image.filename) } : undefined,
});

export const format = ({
  title,
  meta_title,
  date,
  updatedAt,
  publishedAt,
  content,
  meta_description,
  linkedContent,
  image,
  links,
  references,
}: Pick<
  NewsDocument,
  | "title"
  | "meta_title"
  | "date"
  | "updatedAt"
  | "publishedAt"
  | "content"
  | "meta_description"
  | "linkedContent"
  | "image"
  | "links"
  | "references"
>): News => {
  const toRelatedItem = (link: NewsLink): RelatedItem =>
    link.type === "external"
      ? {
          title: link.title,
          source: SOURCES.EXTERNALS,
          url: link.url,
          external: true,
          ...(link.intro ? { intro: link.intro } : {}),
        }
      : {
          title: link.title,
          source: link.source as Source,
          url: `/${getRouteBySource(link.source as SourceKeys)}/${link.slug}`,
          ...(link.intro ? { intro: link.intro } : {}),
        };

  // Les « Contenus liés » de l'admin (`links` : contenus CDTN et liens
  // externes, dans l'ordre saisi). Un export antérieur n'a que `linkedContent`.
  const items = links
    ? links.map(toRelatedItem)
    : linkedContent.map((item: LinkedContent) =>
        toRelatedItem({ type: "cdtn", ...item })
      );

  const categories: Array<{
    title: string;
    filter: (i: RelatedItem) => boolean;
  }> = [
    {
      title: "Simulateurs",
      filter: (i) => i.source === SOURCES.TOOLS,
    },
    {
      title: "Modèles de courriers",
      filter: (i) => i.source === SOURCES.LETTERS,
    },
    {
      title: "Contenus liés",
      filter: (i) => i.source !== SOURCES.LETTERS && i.source !== SOURCES.TOOLS,
    },
  ];

  const relatedItems = categories
    .map(({ title, filter }) => {
      const filtered = items.filter(filter);
      return filtered.length ? { title, items: filtered } : undefined;
    })
    .filter((x): x is { title: string; items: RelatedItem[] } => Boolean(x));

  return {
    title,
    meta_title,
    date,
    content,
    meta_description,
    relatedItems,
    image: image ? { ...image, url: toUrl(image.filename) } : undefined,
    references: references ?? [],
    publishedTime: getNewsPublishedTime(date, publishedAt),
    modifiedTime: getNewsModifiedTime(date, updatedAt, publishedAt),
  };
};
