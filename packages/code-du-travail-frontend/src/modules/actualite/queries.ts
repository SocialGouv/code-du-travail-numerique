import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import {
  DocumentElasticResult,
  fetchDocument,
  RelatedItem,
  Source,
} from "../documents";
import { NewsElasticDocument } from "@socialgouv/cdtn-types";
import { LinkedContent } from "@socialgouv/cdtn-types/build/elastic/related-items";
import { News } from "./type";

export const fetchNewsList = async <K extends keyof NewsElasticDocument>(
  fields: K[],
  filters?: {
    cdtnIds?: string[];
    page?: number;
    pageSize?: number;
  }
): Promise<{
  items: Pick<NewsElasticDocument, K>[];
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

  const response = await elasticsearchClient.search<
    Pick<NewsElasticDocument, K>
  >({
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

export const fetchNews = async <K extends keyof NewsElasticDocument>(
  slug: string,
  fields: K[]
): Promise<DocumentElasticResult<Pick<NewsElasticDocument, K>> | undefined> => {
  return await fetchDocument<
    NewsElasticDocument,
    keyof DocumentElasticResult<NewsElasticDocument>
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
  content,
  meta_description,
  linkedContent,
}: Pick<
  NewsElasticDocument,
  | "title"
  | "meta_title"
  | "date"
  | "content"
  | "meta_description"
  | "linkedContent"
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

  const relatedItems = categories
    .map(({ title, filter }) => {
      const filtered = linkedContent.filter(filter);
      return filtered.length
        ? { title, items: buildItems(filtered) }
        : undefined;
    })
    .filter((x): x is { title: string; items: RelatedItem[] } => Boolean(x));

  return {
    title,
    meta_title,
    date,
    content,
    meta_description,
    relatedItems,
  };
};
