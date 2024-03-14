export enum OrderDirection {
  asc = "asc",
  desc = "desc",
}

export type ItemSortType = {
  fieldName: string;
  orderDirection: OrderDirection;
};
