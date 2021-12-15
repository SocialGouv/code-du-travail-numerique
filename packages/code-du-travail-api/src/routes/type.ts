// Complete definition of the Search response
export interface SearchResponse<T> {
  hits: {
    total: {
      value: number;
    };
    hits: {
      _source: T;
    }[];
  };
}
