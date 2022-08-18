export const getDocumentByUrlBody = ({ url }: { url: string }) => {
  return {
    _source: ["date", "raw", "intro", "sections", "source", "url"],
    query: {
      bool: {
        filter: [{ term: { url } }, { term: { isPublished: true } }],
      },
    },
    size: 1,
  };
};
