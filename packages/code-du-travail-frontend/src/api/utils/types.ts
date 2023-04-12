export enum OrderDirection {
  asc = "asc",
  desc = "desc",
}

export type ItemFilterType = {
  url?: string;
  source?: string;
  ids?: string;
};

export type ItemSortType = {
  fieldName: string;
  orderDirection: OrderDirection;
};
