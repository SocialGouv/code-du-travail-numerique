import { SourceKeys } from "@socialgouv/cdtn-utils";

export type SearchAlgo = (typeof SEARCH_ALGO)[keyof typeof SEARCH_ALGO];

export type SearchResult = {
  _score?: number;
  description: string;
  cdtnId: string;
  slug: string;
  source: SourceKeys;
  title: string;
  algo: SearchAlgo;
  breadcrumbs?: {
    label: string;
    position: number;
    slug: string;
  }[];
  url?: string;
};

export type SearchResponse = {
  articles: SearchResult[];
  themes: SearchResult[];
  documents: SearchResult[];
  class: string;
};

export enum PresearchClass {
  CC = "cc",
  CC_FOUND = "cc_found",
  KEYWORD = "keyword",
  KEYWORD_STD = "keyword_standard",
  ARTICLE = "article",
  THEME = "theme",
  NATURAL = "natural",
  UNKNOWN = "unknown",
}

export const SEARCH_ALGO = {
  PREQUA: "pre-qualified",
  FULL_TEXT: "fulltext",
  PRESEARCH: "presearch",
} as const;

export type PreSearchResult = SearchResult & {
  algo: typeof SEARCH_ALGO.PRESEARCH;
  class: PresearchClass;
};

export type ThemeSearchResult = PreSearchResult & { breadcrumbs: unknown[] };
