export const conventionCollectiveMapping = {
  properties: {
    idcc: { type: "keyword" },
    title: { type: "keyword" },
    shortTitle: { type: "keyword" },
    url: { type: "keyword" },
    slug: { type: "keyword" },
    nbTextes: { type: "integer" },
    nbArticles: {
      properties: {
        vigueurEtendu: { type: "integer" },
        vigueurNonEtendu: { type: "integer" },
      },
    },
    publishedAt: { type: "date" },
    articlesByTheme: {
      properties: {
        bloc: { type: "keyword" },
        articles: {
          properties: {
            id: { type: "keyword" },
            cid: { type: "keyword" },
            content: { type: "text" },
          },
        },
      },
    },
    answer: {
      properties: {
        question: { type: "text" },
        answer: { type: "text" },
        theme: { type: "text" },
        slug: { type: "keyword" },
        references: {
          properties: {
            value: { type: "text" },
            category: { type: "keyword" },
            url: { type: "keyword" },
          },
        },
      },
    },
  },
};
