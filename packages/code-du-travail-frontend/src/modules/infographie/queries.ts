import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import {
  DocumentElasticResult,
  fetchDocument,
  RelatedItem,
  Source,
} from "../documents";
import { Infographic } from "./type";
import { InfographicElasticDocument } from "@socialgouv/cdtn-types";
import { LinkedContent } from "@socialgouv/cdtn-types/build/elastic/related-items";
import { getRouteBySource } from "@socialgouv/cdtn-utils/src/sources";

export const fetchInfographics = async <
  K extends keyof InfographicElasticDocument,
>(
  fields: K[],
  filters?: {
    cdtnIds?: string[];
  }
): Promise<Pick<InfographicElasticDocument, K>[]> => {
  const baseFilters: Array<any> = [
    { term: { source: SOURCES.INFOGRAPHICS } },
    { term: { isPublished: true } },
  ];

  if (filters?.cdtnIds) {
    baseFilters.push({ terms: { cdtnId: filters.cdtnIds } });
  }

  const response = await elasticsearchClient.search<
    Pick<InfographicElasticDocument, K>
  >({
    query: {
      bool: {
        filter: baseFilters,
      },
    },
    size: 1000,
    _source: fields,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits
    .map(({ _source }) => _source)
    .filter((model) => model !== undefined);
};

export const fetchInfographic = async <
  K extends keyof InfographicElasticDocument,
>(
  slug: string,
  fields: K[]
): Promise<
  DocumentElasticResult<Pick<InfographicElasticDocument, K>> | undefined
> => {
  return await fetchDocument<
    InfographicElasticDocument,
    keyof DocumentElasticResult<InfographicElasticDocument>
  >(fields, {
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.INFOGRAPHICS } },
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
  description,
  meta_description,
  svgFilename,
  pdfFilename,
  pdfFilesizeOctet,
  transcription,
  breadcrumbs,
  references,
  linkedContent,
}: Pick<
  InfographicElasticDocument,
  | "breadcrumbs"
  | "title"
  | "meta_title"
  | "date"
  | "svgFilename"
  | "pdfFilename"
  | "pdfFilesizeOctet"
  | "description"
  | "meta_description"
  | "transcription"
  | "references"
  | "linkedContent"
>): Infographic => {
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
    description,
    meta_description,
    svgFilename: svgFilename,
    pdf: {
      filename: pdfFilename,
      sizeOctet: pdfFilesizeOctet.toString(),
    },
    transcription,
    breadcrumbs,
    references,
    relatedItems,
  };
};
