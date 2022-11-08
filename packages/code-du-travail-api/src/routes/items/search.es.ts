export const getDocumentBody = ({
  url,
  source,
  ids,
}: {
  url?: string;
  source?: string;
  ids?: string;
}): any => {
  const filter: any[] = [{ term: { isPublished: true } }];
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
  };
};
