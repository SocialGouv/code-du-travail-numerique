export type Breadcrumb = {
  label: string;
  slug: string;
  position?: number;
};

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

export type ElasticSearchItem<T = void> = {
  description: string;
  source: string;
  title: string;
  slug: string;
  breadcrumbs: Breadcrumb[];
} & T;
