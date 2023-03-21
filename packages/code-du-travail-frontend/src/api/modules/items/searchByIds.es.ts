export const getDocumentByIdsBody = (values: string[]) => {
  return {
    query: {
      bool: {
        should: [
          {
            ids: {
              type: "_doc",
              values,
            },
          },
        ],
      },
    },
    size: 10,
  };
};
