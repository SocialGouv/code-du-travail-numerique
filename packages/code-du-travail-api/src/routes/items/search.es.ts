enum OrderDirection {
  asc = "asc",
  desc = "desc",
}

type ItemFilterType = {
  url?: string;
  source?: string;
  ids?: string;
};

type ItemSortType = {
  fieldName: string;
  orderDirection: OrderDirection;
};

export const getDocumentBody = (
  { url, source, ids }: ItemFilterType,
  sortParam?: ItemSortType
): any => {
  const filter: any[] = [{ term: { isPublished: true } }];
  const sort: any[] = [];
  if (sortParam) {
    sort.push({ [sortParam.fieldName]: sortParam.orderDirection });
  }
  if (url) {
    filter.push({ term: { url } });
  }
  if (source) {
    filter.push({ term: { source } });
  }
  if (ids) {
    filter.push({ ids: { values: ids } });
  }
  return {
    query: {
      bool: {
        filter,
      },
    },
    size: 200,
    sort,
  };
};
