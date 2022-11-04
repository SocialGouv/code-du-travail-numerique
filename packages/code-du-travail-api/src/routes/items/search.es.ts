export const getDocumentBody = ({
  url,
  source,
  isAll,
}: {
  url?: string;
  source?: string;
  isAll: boolean;
}) => {
  const filter: any[] = [{ term: { isPublished: true } }];
  const size = isAll ? 200 : 1;
  if (url) {
    filter.push({ term: { url } });
  }
  if (source) {
    filter.push({ term: { source } });
  }
  return {
    query: {
      bool: {
        filter,
      },
    },
    size,
  };
};
