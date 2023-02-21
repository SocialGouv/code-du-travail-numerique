export type SearchResponse<T> = {
  hits: {
    total: {
      value: number;
    };
    hits: {
      _source: T;
    }[];
  };
};

export type Agreement = {
  id: string;
  num: number;
  shortTitle: string;
  slug?: string;
  title: string;
  url?: string;
  highlight?: {
    title: string;
    content: string;
    searchInfo?: string;
  };
};

export type ElasticSearchItem = {
  description: string;
  source: string;
  title: string;
  slug: string;
  breadcrumbs: Breadcrumb[];
};

type Breadcrumb = {
  label: string;
  position: number;
  slug: string;
};
