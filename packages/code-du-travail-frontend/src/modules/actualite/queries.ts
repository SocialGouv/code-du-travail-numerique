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
import { getNewsModifiedTime } from "./dates";
import { News, NewsDocument } from "./type";

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
    sort: [{ date: { order: "desc" } }],
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

export const format = ({
  title,
  meta_title,
  date,
  updatedAt,
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
  | "content"
  | "meta_description"
  | "linkedContent"
  | "image"
  | "links"
  | "references"
>): News => {
  const buildItems = (arr: LinkedContent[]): RelatedItem[] =>
    arr.map((item) => ({
      title: item.title,
      source: item.source as Source,
      url: `/${getRouteBySource(item.source)}/${item.slug}`,
    }));

  const categories: Array<{
    title: string;
    filter: (i: LinkedContent) => boolean;
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

  const relatedItems = links?.length
    ? [
        {
          title: "Pour aller plus loin",
          items: links.map(
            (l): RelatedItem =>
              l.type === "external"
                ? { title: l.title, url: l.url, source: SOURCES.EXTERNALS }
                : {
                    title: l.title,
                    source: l.source as Source,
                    url: `/${getRouteBySource(l.source as SourceKeys)}/${l.slug}`,
                  }
          ),
        },
      ]
    : categories
        .map(({ title, filter }) => {
          const filtered = linkedContent.filter(filter);
          return filtered.length
            ? { title, items: buildItems(filtered) }
            : undefined;
        })
        .filter((x): x is { title: string; items: RelatedItem[] } =>
          Boolean(x)
        );

  return {
    title,
    meta_title,
    date,
    content,
    meta_description,
    relatedItems,
    image: image ? { ...image, url: toUrl(image.filename) } : undefined,
    references: references ?? [],
    modifiedTime: getNewsModifiedTime(date, updatedAt),
  };
};
